"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const permission_service_1 = require("./services/permission.service");
const user_service_1 = require("./services/user.service");
const logger_1 = __importDefault(require("./utils/logger"));
const role_service_1 = require("./services/role.service");
const PROTO_PATH = path_1.default.join(__dirname, './proto/iam.proto');
async function main() {
    console.log('🚀 Starting IAM Service...');
    logger_1.default.info('Starting IAM Service...');
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
        const iamProto = grpc.loadPackageDefinition(packageDefinition);
        const IAMService = iamProto.iam.IAMService;
        if (!IAMService) {
            throw new Error('IAMService not found in proto definition');
        }
        console.log('✅ Proto file loaded successfully');
        const permissionService = new permission_service_1.PermissionService();
        const userServiceObj = new user_service_1.UserService();
        const server = new grpc.Server();
        // Add service implementation
        server.addService(IAMService.service, {
            // Permission checks
            CheckPermission: async (call, callback) => {
                try {
                    const { user_id, action, resource, resource_id, metadata } = call.request;
                    const result = await permissionService.checkPermission(user_id, action, resource, resource_id, metadata);
                    callback(null, result);
                }
                catch (error) {
                    logger_1.default.error('CheckPermission error:', error);
                    callback(error, null);
                }
            },
            BatchCheck: async (call, callback) => {
                try {
                    const { user_id, permissions } = call.request;
                    const results = await permissionService.batchCheck(user_id, permissions.map((p) => ({
                        action: p.action,
                        resource: p.resource,
                        resourceId: p.resource_id,
                        metadata: p.metadata,
                    })));
                    callback(null, { results });
                }
                catch (error) {
                    logger_1.default.error('BatchCheck error:', error);
                    callback(error, null);
                }
            },
            // User management
            CreateUser: async (call, callback) => {
                try {
                    const user = await userServiceObj.createUser(call.request);
                    callback(null, user);
                }
                catch (error) {
                    callback({ code: grpc.status.ALREADY_EXISTS, message: error.message }, null);
                }
            },
            GetUser: async (call, callback) => {
                try {
                    const user = await userServiceObj.getUser(call.request.id);
                    callback(null, user);
                }
                catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
                }
            },
            UpdateUser: async (call, callback) => {
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
                }
                catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
                }
            },
            DeleteUser: async (call, callback) => {
                try {
                    await userServiceObj.deleteUser(call.request.id);
                    callback(null, { success: true });
                }
                catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
                }
            },
            ListUsers: async (call, callback) => {
                try {
                    const result = await userServiceObj.listUsers(call.request.page || 1, call.request.page_size || 20, {
                        specialty: call.request.specialty,
                        isActive: call.request.is_active,
                    });
                    callback(null, result);
                }
                catch (error) {
                    callback(error, null);
                }
            },
            // Authentication
            Login: async (call, callback) => {
                try {
                    const result = await userServiceObj.login(call.request.email, call.request.password, call.request.user_agent, call.request.ip_address);
                    callback(null, {
                        access_token: result.accessToken,
                        refresh_token: result.refreshToken,
                        expires_in: result.expiresIn,
                        user: result.user
                    });
                }
                catch (error) {
                    callback({ code: grpc.status.UNAUTHENTICATED, message: error.message }, null);
                }
            },
            Logout: async (call, callback) => {
                try {
                    await userServiceObj.logout(call.request.token);
                    callback(null, { success: true });
                }
                catch (error) {
                    callback(null, { success: true });
                }
            },
            RefreshToken: async (call, callback) => {
                try {
                    const result = await userServiceObj.refreshToken(call.request.refresh_token);
                    callback(null, result);
                }
                catch (error) {
                    callback({ code: grpc.status.UNAUTHENTICATED, message: error.message }, null);
                }
            },
            ValidateToken: async (call, callback) => {
                try {
                    const result = await userServiceObj.validateToken(call.request.token);
                    callback(null, result);
                }
                catch (error) {
                    callback(null, { valid: false });
                }
            },
            // Role management
            CreateRole: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.createRole({
                        name: call.request.name,
                        description: call.request.description,
                        permissionIds: call.request.permission_ids
                    });
                    callback(null, result);
                }
                catch (error) {
                    callback({ code: grpc.status.ALREADY_EXISTS, message: error.message }, null);
                }
            },
            GetRole: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.getRole(call.request.id);
                    callback(null, result);
                }
                catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
                }
            },
            UpdateRole: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.updateRole(call.request.id, {
                        name: call.request.name,
                        description: call.request.description,
                        permissionIds: call.request.permission_ids
                    });
                    callback(null, result);
                }
                catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
                }
            },
            DeleteRole: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.deleteRole(call.request.id);
                    callback(null, result);
                }
                catch (error) {
                    callback({ code: grpc.status.FAILED_PRECONDITION, message: error.message }, null);
                }
            },
            ListRoles: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.listRoles(call.request.page || 1, call.request.page_size || 20, call.request.include_system || false);
                    callback(null, result);
                }
                catch (error) {
                    callback(error, null);
                }
            },
            AssignRole: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.assignRole({
                        userId: call.request.user_id,
                        roleId: call.request.role_id,
                        scope: call.request.scope,
                        expiresInDays: call.request.expires_in_days,
                        grantedBy: call.request.granted_by
                    });
                    callback(null, result);
                }
                catch (error) {
                    callback({ code: grpc.status.NOT_FOUND, message: error.message }, null);
                }
            },
            RevokeRole: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.revokeRole(call.request.user_id, call.request.role_id);
                    callback(null, result);
                }
                catch (error) {
                    callback(error, null);
                }
            },
            GetUserRoles: async (call, callback) => {
                try {
                    const result = await role_service_1.roleService.getUserRoles(call.request.user_id);
                    callback(null, { roles: result });
                }
                catch (error) {
                    callback(error, null);
                }
            },
            // Permission management
            CreatePermission: async (call, callback) => {
                try {
                    const result = await permissionService.createPermission({
                        action: call.request.action,
                        resource: call.request.resource,
                        conditions: call.request.conditions ? JSON.parse(call.request.conditions) : undefined,
                        description: call.request.description
                    });
                    callback(null, result);
                }
                catch (error) {
                    callback({ code: grpc.status.ALREADY_EXISTS, message: error.message }, null);
                }
            },
            ListPermissions: async (call, callback) => {
                try {
                    const result = await permissionService.listPermissions(call.request.page || 1, call.request.page_size || 20, call.request.action, call.request.resource);
                    callback(null, result);
                }
                catch (error) {
                    callback(error, null);
                }
            },
        });
        const address = `0.0.0.0:${config_1.config.server.port}`;
        server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err) => {
            if (err) {
                console.error('❌ Failed to bind server:', err);
                logger_1.default.error('Failed to bind server:', err);
                return;
            }
            console.log(`✅ IAM Service running on ${address}`);
            console.log(`📊 Metrics available at http://localhost:${config_1.config.monitoring.metricsPort}/metrics`);
            logger_1.default.info(`IAM Service running on ${address}`);
            server.start();
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        logger_1.default.error('Failed to start server:', error);
        process.exit(1);
    }
}
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down...');
    logger_1.default.info('SIGTERM received, shutting down...');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down...');
    logger_1.default.info('SIGINT received, shutting down...');
    process.exit(0);
});
main().catch(console.error);
//# sourceMappingURL=server.js.map