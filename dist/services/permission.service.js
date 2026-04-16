"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const client_1 = require("@prisma/client");
const cache_manager_1 = require("../core/cache-manager");
const policy_engine_1 = require("../core/policy-engine");
const audit_logger_1 = require("../utils/audit-logger");
const logger_1 = __importDefault(require("../utils/logger"));
const prisma = new client_1.PrismaClient();
class PermissionService {
    async checkPermission(userId, action, resource, resourceId, metadata) {
        const startTime = Date.now();
        try {
            const userPermissions = await this.getUserPermissionsWithRoles(userId);
            if (!userPermissions || userPermissions.length === 0) {
                await this.logAudit(userId, action, resource, resourceId, metadata, false, 'No permissions found', startTime);
                return {
                    allowed: false,
                    reason: 'No permissions found for this user',
                };
            }
            const applicablePermissions = userPermissions.filter(p => p.action === action && p.resource === resource);
            if (applicablePermissions.length === 0) {
                await this.logAudit(userId, action, resource, resourceId, metadata, false, 'No applicable permissions', startTime);
                return {
                    allowed: false,
                    reason: `No permission for ${action} on ${resource}`,
                };
            }
            let resourceInfo;
            if (resourceId) {
                resourceInfo = await this.getResourceInfo(resource, resourceId);
            }
            const request = {
                userId,
                action,
                resource,
                resourceId,
                metadata,
            };
            const result = await policy_engine_1.policyEngine.evaluate(applicablePermissions, request, resourceInfo);
            await this.logAudit(userId, action, resource, resourceId, metadata, result.allowed, result.reason, startTime);
            return result;
        }
        catch (error) {
            logger_1.default.error('Permission check error:', error);
            await this.logAudit(userId, action, resource, resourceId, metadata, false, 'Internal error', startTime);
            return {
                allowed: false,
                reason: 'Internal error during permission check',
            };
        }
    }
    async batchCheck(userId, checks) {
        const results = [];
        for (const check of checks) {
            const result = await this.checkPermission(userId, check.action, check.resource, check.resourceId, check.metadata);
            results.push(result);
        }
        return results;
    }
    async getUserPermissionsWithRoles(userId) {
        const cached = await cache_manager_1.cacheManager.getUserPermissions(userId);
        if (cached) {
            return cached;
        }
        const userRoles = await prisma.userRole.findMany({
            where: {
                userId,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        });
        const permissions = [];
        for (const userRole of userRoles) {
            for (const rp of userRole.role.permissions) {
                permissions.push({
                    ...rp.permission,
                    roleScope: userRole.scope,
                });
            }
        }
        const uniquePermissions = permissions.filter((p, index, self) => index === self.findIndex(t => t.id === p.id));
        await cache_manager_1.cacheManager.setUserPermissions(userId, uniquePermissions);
        return uniquePermissions;
    }
    async getResourceInfo(resourceType, resourceId) {
        const cached = await cache_manager_1.cacheManager.getResourceInfo(resourceType, resourceId);
        if (cached) {
            return cached;
        }
        const resourceInfo = {
            ownerId: 'mock-owner-id',
            status: 'DRAFT',
            specialty: 'CARDIOLOGY',
        };
        await cache_manager_1.cacheManager.setResourceInfo(resourceType, resourceId, resourceInfo);
        return resourceInfo;
    }
    async logAudit(userId, action, resource, resourceId, metadata, allowed, reason, startTime) {
        const duration = Date.now() - startTime;
        await audit_logger_1.auditLogger.log({
            userId,
            action,
            resource,
            resourceId,
            context: metadata,
            allowed,
            reason,
            duration,
        });
    }
    // Управление разрешениями (CRUD)
    async createPermission(data) {
        const permission = await prisma.permission.create({
            data: {
                id: `${data.action}_${data.resource}`,
                action: data.action,
                resource: data.resource,
                conditions: data.conditions || {},
                description: data.description
            }
        });
        return permission;
    }
    async listPermissions(page = 1, pageSize = 20, action, resource) {
        const where = {};
        if (action)
            where.action = action;
        if (resource)
            where.resource = resource;
        const [permissions, total] = await Promise.all([
            prisma.permission.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: [{ resource: 'asc' }, { action: 'asc' }]
            }),
            prisma.permission.count({ where })
        ]);
        return { permissions, total, page, pageSize };
    }
}
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map