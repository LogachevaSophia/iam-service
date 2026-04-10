import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { config } from './config';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import logger from './utils/logger';

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
            isActive: call.request.is_active,  // преобразуем snake_case в camelCase
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
          callback(null, result);
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

      // Role management (stubs - not implemented)
      CreateRole: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      GetRole: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      UpdateRole: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      DeleteRole: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      ListRoles: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      AssignRole: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      RevokeRole: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      GetUserRoles: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      CreatePermission: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
      },

      ListPermissions: async (_call: any, callback: any) => {
        callback({ code: grpc.status.UNIMPLEMENTED, message: 'Not implemented yet' }, null);
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