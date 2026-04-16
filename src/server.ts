import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { config } from './config';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import logger from './utils/logger';
import { roleService } from './services/role.service';

const PROTO_PATH = path.join(__dirname, './proto/iam.proto');

async function main() {
  console.log('🚀 Starting IAM Service...');
  logger.info('Starting IAM Service...');

  try {
    // Load proto file with options
    const packageDefinition = await protoLoader.load(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    // Load package definition and get the service
    const iamProto = grpc.loadPackageDefinition(packageDefinition) as any;
    const IAMService = iamProto.iam.IAMService;

    if (!IAMService) {
      throw new Error('IAMService not found in proto definition');
    }

    console.log('✅ Proto file loaded successfully');

    const permissionService = new PermissionService();
    const userServiceObj = new UserService();

    const server = new grpc.Server();

    // Add service implementation
    server.addService(IAMService.service, {
      // Permission checks
      CheckPermission: async (call: any, callback: any) => {
        try {
          const { user_id, action, resource, resource_id, metadata } = call.request;
          const result = await permissionService.checkPermission(
            user_id,
            action,
            resource,
            resource_id,
            metadata
          );
          callback(null, result);
        } catch (error: any) {
          logger.error('CheckPermission error:', error);
          callback(error, null);
        }
      },

      BatchCheck: async (call: any, callback: any) => {
        try {
          const { user_id, permissions } = call.request;
          const results = await permissionService.batchCheck(
            user_id,
            permissions.map((p: any) => ({
              action: p.action,
              resource: p.resource,
              resourceId: p.resource_id,
              metadata: p.metadata,
            }))
          );
          callback(null, { results });
        } catch (error: any) {
          logger.error('BatchCheck error:', error);
          callback(error, null);
        }
      },

      // User management
      CreateUser: async (call: any, callback: any) => {
        try {
          const user = await userServiceObj.createUser(call.request);
          callback(null, user);
        } catch (error: any) {
          callback({ code: grpc.status.ALREADY_EXISTS, message: error.message }, null);
        }
      },

      GetUser: async (call: any, callback: any) => {
        try {
          const user = await userServiceObj.getUser(call.request.id);
          callback(null, user);
        } catch (error: any) {
          callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
        }
      },

      UpdateUser: async (call: any, callback: any) => {
        try {
          const updateData = {
            id: call.request.id,
            email: call.request.email,
            firstName: call.request.first_name,
            lastName: call.request.last_name,
            specialty: call.request.specialty,
            department: call.request.department,
            isActive: call.request.is_active,
            metadata: call.request.metadata,
          };
          const user = await userServiceObj.updateUser(call.request.id, updateData);
          callback(null, user);
        } catch (error: any) {
          callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
        }
      },

      DeleteUser: async (call: any, callback: any) => {
        try {
          await userServiceObj.deleteUser(call.request.id);
          callback(null, { success: true });
        } catch (error: any) {
          callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
        }
      },

      ListUsers: async (call: any, callback: any) => {
        try {
          const result = await userServiceObj.listUsers(
            call.request.page || 1,
            call.request.page_size || 20,
            {
              specialty: call.request.specialty,
              isActive: call.request.is_active,
            }
          );
          callback(null, result);
        } catch (error) {
          callback(error, null);
        }
      },

      // Authentication
      Login: async (call: any, callback: any) => {
        try {
          const result = await userServiceObj.login(
            call.request.email,
            call.request.password,
            call.request.user_agent,
            call.request.ip_address
          );
          callback(null, {
            access_token: result.accessToken,
            refresh_token: result.refreshToken,
            expires_in: result.expiresIn,
            user: result.user
          });
        } catch (error: any) {
          callback({ code: grpc.status.UNAUTHENTICATED, message: error.message }, null);
        }
      },

      Logout: async (call: any, callback: any) => {
        try {
          await userServiceObj.logout(call.request.token);
          callback(null, { success: true });
        } catch (error) {
          callback(null, { success: true });
        }
      },

      RefreshToken: async (call: any, callback: any) => {
        try {
          const result = await userServiceObj.refreshToken(call.request.refresh_token);
          callback(null, result);
        } catch (error: any) {
          callback({ code: grpc.status.UNAUTHENTICATED, message: error.message }, null);
        }
      },

      ValidateToken: async (call: any, callback: any) => {
        try {
          const result = await userServiceObj.validateToken(call.request.token);
          callback(null, result);
        } catch (error) {
          callback(null, { valid: false });
        }
      },

      // Role management
      CreateRole: async (call: any, callback: any) => {
        try {
          const result = await roleService.createRole({
            name: call.request.name,
            description: call.request.description,
            permissionIds: call.request.permission_ids
          });
          callback(null, result);
        } catch (error: any) {
          callback({ code: grpc.status.ALREADY_EXISTS, message: error.message }, null);
        }
      },

      GetRole: async (call: any, callback: any) => {
        try {
          const result = await roleService.getRole(call.request.id);
          callback(null, result);
        } catch (error: any) {
          callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
        }
      },

      UpdateRole: async (call: any, callback: any) => {
        try {
          const result = await roleService.updateRole(call.request.id, {
            name: call.request.name,
            description: call.request.description,
            permissionIds: call.request.permission_ids
          });
          callback(null, result);
        } catch (error: any) {
          callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
        }
      },

      DeleteRole: async (call: any, callback: any) => {
        try {
          const result = await roleService.deleteRole(call.request.id);
          callback(null, result);
        } catch (error: any) {
          callback({ code: grpc.status.FAILED_PRECONDITION, message: error.message }, null);
        }
      },

      ListRoles: async (call: any, callback: any) => {
        try {
          const result = await roleService.listRoles(
            call.request.page || 1,
            call.request.page_size || 20,
            call.request.include_system || false
          );
          callback(null, result);
        } catch (error: any) {
          callback(error, null);
        }
      },

      AssignRole: async (call: any, callback: any) => {
        try {
          const result = await roleService.assignRole({
            userId: call.request.user_id,
            roleId: call.request.role_id,
            scope: call.request.scope,
            expiresInDays: call.request.expires_in_days,
            grantedBy: call.request.granted_by
          });
          callback(null, result);
        } catch (error: any) {
          callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
        }
      },

      RevokeRole: async (call: any, callback: any) => {
        try {
          const result = await roleService.revokeRole(call.request.user_id, call.request.role_id);
          callback(null, result);
        } catch (error: any) {
          callback(error, null);
        }
      },

      GetUserRoles: async (call: any, callback: any) => {
        try {
          const result = await roleService.getUserRoles(call.request.user_id);
          callback(null, { roles: result });
        } catch (error: any) {
          callback(error, null);
        }
      },

      // Permission management
      CreatePermission: async (call: any, callback: any) => {
        try {
          const result = await permissionService.createPermission({
            action: call.request.action,
            resource: call.request.resource,
            conditions: call.request.conditions ? JSON.parse(call.request.conditions) : undefined,
            description: call.request.description
          });
          callback(null, result);
        } catch (error: any) {
          callback({ code: grpc.status.ALREADY_EXISTS, message: error.message }, null);
        }
      },

      ListPermissions: async (call: any, callback: any) => {
        try {
          const result = await permissionService.listPermissions(
            call.request.page || 1,
            call.request.page_size || 20,
            call.request.action,
            call.request.resource
          );
          callback(null, result);
        } catch (error: any) {
          callback(error, null);
        }
      },
    });

    const address = `0.0.0.0:${config.server.port}`;

    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err) => {
      if (err) {
        console.error('❌ Failed to bind server:', err);
        logger.error('Failed to bind server:', err);
        return;
      }
      console.log(`✅ IAM Service running on ${address}`);
      console.log(`📊 Metrics available at http://localhost:${config.monitoring.metricsPort}/metrics`);
      logger.info(`IAM Service running on ${address}`);
      server.start();
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down...');
  logger.info('SIGTERM received, shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down...');
  logger.info('SIGINT received, shutting down...');
  process.exit(0);
});

main().catch(console.error);