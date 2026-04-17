require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const cors = require('cors');

function requireClinrecBase() {
  const raw = process.env.CLINREC_BASE_URL;
  if (!raw || !String(raw).trim()) {
    throw new Error(
      'CLINREC_BASE_URL is required (set in .env or environment; in CI inject from secrets).',
    );
  }
  return String(raw).replace(/\/+$/, '');
}

const CLINREC_BASE = requireClinrecBase();
const REST_PROXY_PORT = parseInt(process.env.REST_PROXY_PORT || '3000', 10);
const PROTO_PATH = path.join(__dirname, 'src/proto/iam.proto');
const IAM_GRPC_ADDR = process.env.IAM_GRPC_ADDR || 'localhost:50051';

let grpcClient = null;

async function getGrpcClient() {
  if (grpcClient) return grpcClient;

  const packageDefinition = await protoLoader.load(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const iamProto = grpc.loadPackageDefinition(packageDefinition).iam;
  grpcClient = new iamProto.IAMService(IAM_GRPC_ADDR, grpc.credentials.createInsecure());
  return grpcClient;
}

function checkPermissionAllowed(client, userId, action, resource) {
  return new Promise((resolve, reject) => {
    client.CheckPermission(
      { user_id: userId, action, resource },
      (err, response) => {
        if (err) return reject(err);
        resolve(Boolean(response && response.allowed));
      }
    );
  });
}

/** Создание/список/удаление пользователей и назначение ролей — только manage + user. */
async function assertManageUser(client, req, res) {
  if (!req.userId) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return false;
  }
  try {
    const ok = await checkPermissionAllowed(client, req.userId, 'manage', 'user');
    if (!ok) {
      res.status(403).json({
        error: 'Forbidden: требуется право manage на ресурс user',
      });
      return false;
    }
    return true;
  } catch (e) {
    console.error('CheckPermission (manage user):', e);
    res.status(500).json({ error: e.message || 'Permission check failed' });
    return false;
  }
}

/** Просмотр чужого профиля / ролей / прав — только сам пользователь или manage + user. */
async function assertSelfOrManageUser(client, req, res, targetUserId) {
  if (!req.userId) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return false;
  }
  if (req.userId === targetUserId) return true;
  return assertManageUser(client, req, res);
}

function createRestProxyApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const authMiddleware = require('./src/middleware/auth');
  app.use('/api', authMiddleware);

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'rest-proxy', clinrec: CLINREC_BASE });
  });

  // ========== IAM ROUTES ==========
  app.post('/api/login', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.Login(req.body, (err, response) => {
        if (err) {
          console.error('gRPC Login error:', err);
          return res.status(401).json({ error: err.message });
        }
        console.log('gRPC Login response:', JSON.stringify(response, null, 2));
        return res.json(response);
      });
    } catch (error) {
      console.error('REST Login error:', error);
      return res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/logout', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.Logout(req.body, (err, response) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/refresh', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.RefreshToken(req.body, (err, response) => {
        if (err) {
          return res.status(401).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/check', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.CheckPermission(req.body, (err, response) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/user/:id', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertSelfOrManageUser(client, req, res, req.params.id))) return;
      client.GetUser({ id: req.params.id }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertManageUser(client, req, res))) return;
      // Передаём пустой объект, без параметров
      client.ListUsers({}, (err, response) => {
        if (err) {
          console.error('gRPC ListUsers error:', err);
          return res.status(500).json({ error: err.message });
        }

        // Трансформируем ответ в нужный формат
        const result = {
          users: (response.users || []).map(user => ({
            id: user.id,
            email: user.email,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            is_active: user.is_active === true,
            created_at: user.created_at || '',
            last_login_at: user.last_login_at || ''
          })),
          total: response.total || 0,
          page: response.page || 1,
          page_size: response.page_size || 20
        };

        return res.json(result);
      });
    } catch (error) {
      console.error('REST ListUsers error:', error);
      return res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/users', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertManageUser(client, req, res))) return;
      client.CreateUser(req.body, (err, response) => {
        if (err) {
          return res.status(409).json({ error: err.message });
        }
        return res.status(201).json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/user/:id', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertSelfOrManageUser(client, req, res, req.params.id))) return;
      client.UpdateUser({ id: req.params.id, ...req.body }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/user/:id', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertManageUser(client, req, res))) return;
      client.DeleteUser({ id: req.params.id }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // ========== PERMISSION MANAGEMENT ROUTES ==========
  app.post('/api/permissions', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.CreatePermission(req.body, (err, response) => {
        if (err) {
          return res.status(409).json({ error: err.message });
        }
        return res.status(201).json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/permissions', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.ListPermissions({
        page: parseInt(req.query.page) || 1,
        page_size: parseInt(req.query.page_size) || 20,
        action: req.query.action,
        resource: req.query.resource
      }, (err, response) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // ========== ROLE MANAGEMENT ROUTES ==========
  app.post('/api/roles', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.CreateRole(req.body, (err, response) => {
        if (err) {
          return res.status(409).json({ error: err.message });
        }
        return res.status(201).json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/roles', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.ListRoles({
        page: parseInt(req.query.page) || 1,
        page_size: parseInt(req.query.page_size) || 20,
        include_system: req.query.include_system === 'true'
      }, (err, response) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/roles/:id', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.GetRole({ id: req.params.id }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/roles/:id', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.UpdateRole({ id: req.params.id, ...req.body }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/roles/:id', async (req, res) => {
    try {
      const client = await getGrpcClient();
      client.DeleteRole({ id: req.params.id }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/users/assign-role', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertManageUser(client, req, res))) return;
      client.AssignRole(req.body, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/users/:userId/revoke-role/:roleId', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertManageUser(client, req, res))) return;
      client.RevokeRole({ user_id: req.params.userId, role_id: req.params.roleId }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/users/:userId/roles', async (req, res) => {
    try {
      const client = await getGrpcClient();
      if (!(await assertSelfOrManageUser(client, req, res, req.params.userId))) return;
      client.GetUserRoles({ user_id: req.params.userId }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  /** Список прав пользователя: объединение Permission из всех ролей (для фронта). */
  app.get('/api/users/:userId/permissions', async (req, res) => {
    try {
      const client = await getGrpcClient();
      const userId = req.params.userId;
      if (!(await assertSelfOrManageUser(client, req, res, userId))) return;
      client.GetUserRoles({ user_id: userId }, (err, response) => {
        if (err) {
          return res.status(404).json({ error: err.message });
        }
        const roles = response.roles || [];
        if (roles.length === 0) {
          return res.json({ permissions: [] });
        }
        const merged = [];
        const seen = new Set();
        const addPerms = (perms) => {
          for (const p of perms) {
            const action = p.action != null ? String(p.action) : '';
            const resource = p.resource != null ? String(p.resource) : '';
            const key = `${action}|${resource}`;
            if (!seen.has(key)) {
              seen.add(key);
              merged.push({ action, resource });
            }
          }
        };
        let pending = 0;
        for (const r of roles) {
          const inline = r.permissions || [];
          if (inline.length > 0) {
            addPerms(inline);
          } else {
            pending += 1;
            const roleId = r.role_id;
            client.GetRole({ id: roleId }, (e2, roleResp) => {
              if (e2) {
                console.error('GetRole error for permissions aggregate:', e2);
              } else if (roleResp && roleResp.permissions) {
                addPerms(roleResp.permissions);
              }
              pending -= 1;
              if (pending === 0) {
                return res.json({ permissions: merged });
              }
            });
          }
        }
        if (pending === 0) {
          return res.json({ permissions: merged });
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // ========== PROXY ALL OTHER /api/* TO CLINREC ==========
  app.use('/api/', (req, res, next) => {
    const iamRoutes = ['login', 'logout', 'refresh', 'check', 'users', 'user', 'permissions', 'roles'];
    const pathPart = req.path.split('/')[1];
    if (iamRoutes.includes(pathPart)) {
      return next();
    }

    (async () => {
      try {
        const targetUrl = `${CLINREC_BASE}${req.originalUrl}`;

        const headers = {
          Accept: 'application/json',
        };

        const methodsWithBody = ['POST', 'PUT', 'PATCH'];
        if (methodsWithBody.includes(req.method)) {
          headers['Content-Type'] = 'application/json';
        }

        if (req.headers.authorization) {
          headers['Authorization'] = req.headers.authorization;
        } else if (process.env.CLINREC_API_TOKEN && req.method === 'POST') {
          headers['Authorization'] = `Bearer ${process.env.CLINREC_API_TOKEN}`;
        }

        const init = {
          method: req.method,
          headers,
        };

        if (methodsWithBody.includes(req.method)) {
          init.body = JSON.stringify(req.body !== undefined ? req.body : {});
        }

        const upstream = await fetch(targetUrl, init);
        const text = await upstream.text();
        const contentType = upstream.headers.get('content-type') || '';

        res.status(upstream.status);
        if (contentType.includes('application/json')) {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.send(text || '{}');
        } else {
          res.send(text);
        }
      } catch (err) {
        res.status(502).json({ message: err.message || 'Clinrec upstream error' });
      }
    })();
  });

  return app;
}

module.exports = {
  createRestProxyApp,
  CLINREC_BASE,
  REST_PROXY_PORT,
};

if (require.main === module) {
  const app = createRestProxyApp();
  app.listen(REST_PROXY_PORT, () => {
    const base = `http://localhost:${REST_PROXY_PORT}`;
    console.log(`🚀 REST Proxy running on ${base}`);
    console.log(`🔗 Clinrec API proxied to ${CLINREC_BASE}`);
    console.log('\n📋 IAM Routes:');
    console.log(`   POST   ${base}/api/login`);
    console.log(`   POST   ${base}/api/logout`);
    console.log(`   POST   ${base}/api/refresh`);
    console.log(`   POST   ${base}/api/check`);
    console.log(`   GET    ${base}/api/user/:id`);
    console.log(`   GET    ${base}/api/users`);
    console.log(`   POST   ${base}/api/users`);
    console.log(`   PUT    ${base}/api/user/:id`);
    console.log(`   DELETE ${base}/api/user/:id`);
    console.log(`   POST   ${base}/api/permissions`);
    console.log(`   GET    ${base}/api/permissions`);
    console.log(`   POST   ${base}/api/roles`);
    console.log(`   GET    ${base}/api/roles`);
    console.log(`   GET    ${base}/api/roles/:id`);
    console.log(`   PUT    ${base}/api/roles/:id`);
    console.log(`   DELETE ${base}/api/roles/:id`);
    console.log(`   POST   ${base}/api/users/assign-role`);
    console.log(`   POST   ${base}/api/users/:userId/revoke-role/:roleId`);
    console.log(`   GET    ${base}/api/users/:userId/roles`);
    console.log(`   GET    ${base}/api/users/:userId/permissions`);
    console.log('\n📋 Clinrec Routes (proxied):');
    console.log(`   Все запросы на /api/* (кроме IAM) → ${CLINREC_BASE}`);
    console.log(`\n✅ Health check: ${base}/health\n`);
  });
}