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

function createRestProxyApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

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
      client.ListUsers({
        page: parseInt(req.query.page) || 1,
        page_size: parseInt(req.query.page_size) || 20,
        specialty: req.query.specialty,
        is_active: req.query.is_active === 'true',
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

  app.post('/api/users', async (req, res) => {
    try {
      const client = await getGrpcClient();
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
    console.log('\n📋 Clinrec Routes (proxied):');
    console.log(`   Все запросы на /api/* (кроме IAM) → ${CLINREC_BASE}`);
    console.log(`\n✅ Health check: ${base}/health\n`);
  });
}