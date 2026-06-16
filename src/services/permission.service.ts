
import { PrismaClient } from '@prisma/client';
import { cacheManager } from '../core/cache-manager';
import { policyEngine, PermissionRequest, ResourceInfo } from '../core/policy-engine';
import { auditLogger } from '../utils/audit-logger';
import logger from '../utils/logger';

const prisma = new PrismaClient();

export class PermissionService {
  async checkPermission(
    userId: string,
    action: string,
    resource: string,
    resourceId?: string,
    metadata?: Record<string, any>
  ): Promise<{ allowed: boolean; reason?: string; constraints?: string[] }> {
    const startTime = Date.now();
    
    try {
      const userPermissions = await this.getUserPermissionsWithRoles(userId);
      
      if (!userPermissions || userPermissions.length === 0) {
        logger.debug('checkPermission_no_user_permissions', {
          userId,
          action,
          resource,
          hint: 'Нет прав у пользователя (роли не назначены или кэш пуст). LOG_LEVEL=debug',
        });
        await this.logAudit(userId, action, resource, resourceId, metadata, false, 'No permissions found', startTime);
        return {
          allowed: false,
          reason: 'No permissions found for this user',
        };
      }
      
      const applicablePermissions = userPermissions.filter(
        p => p.action === action && p.resource === resource
      );
      
      if (applicablePermissions.length === 0) {
        logger.debug('checkPermission_no_matching_pair', {
          userId,
          action,
          resource,
          distinctPairs: [...new Set(userPermissions.map((p) => `${p.action}:${p.resource}`))].slice(0, 30),
        });
        await this.logAudit(userId, action, resource, resourceId, metadata, false, 'No applicable permissions', startTime);
        return {
          allowed: false,
          reason: `No permission for ${action} on ${resource}`,
        };
      }
      
      let resourceInfo: ResourceInfo | undefined;
      if (resourceId) {
        resourceInfo = await this.getResourceInfo(resource, resourceId);
      }
      
      const request: PermissionRequest = {
        userId,
        action,
        resource,
        resourceId,
        metadata,
      };
      
      const result = await policyEngine.evaluate(applicablePermissions, request, resourceInfo);
      
      await this.logAudit(
        userId,
        action,
        resource,
        resourceId,
        metadata,
        result.allowed,
        result.reason,
        startTime
      );
      
      return result;
    } catch (error) {
      logger.error('Permission check error:', error);
      await this.logAudit(userId, action, resource, resourceId, metadata, false, 'Internal error', startTime);
      
      return {
        allowed: false,
        reason: 'Internal error during permission check',
      };
    }
  }
  
  async batchCheck(
    userId: string,
    checks: Array<{ action: string; resource: string; resourceId?: string; metadata?: Record<string, any> }>
  ): Promise<Array<{ allowed: boolean; reason?: string }>> {
    const results = [];
    
    for (const check of checks) {
      const result = await this.checkPermission(
        userId,
        check.action,
        check.resource,
        check.resourceId,
        check.metadata
      );
      results.push(result);
    }
    
    return results;
  }
  
  private async getUserPermissionsWithRoles(userId: string): Promise<any[]> {
    const cached = await cacheManager.getUserPermissions(userId);
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
    
    const permissions: any[] = [];
    
    for (const userRole of userRoles) {
      for (const rp of userRole.role.permissions) {
        permissions.push({
          ...rp.permission,
          roleScope: userRole.scope,
        });
      }
    }
    
    const uniquePermissions = permissions.filter(
      (p, index, self) =>
        index === self.findIndex(t => t.id === p.id)
    );
    
    await cacheManager.setUserPermissions(userId, uniquePermissions);
    
    return uniquePermissions;
  }
  
  private async getResourceInfo(resourceType: string, resourceId: string): Promise<ResourceInfo | undefined> {
    const cached = await cacheManager.getResourceInfo(resourceType, resourceId);
    if (cached) {
      return cached;
    }
    
    const resourceInfo = {
      ownerId: 'mock-owner-id',
      status: 'DRAFT',
      specialty: 'CARDIOLOGY',
    };
    
    await cacheManager.setResourceInfo(resourceType, resourceId, resourceInfo);
    
    return resourceInfo;
  }
  
  private async logAudit(
    userId: string,
    action: string,
    resource: string,
    resourceId: string | undefined,
    metadata: Record<string, any> | undefined,
    allowed: boolean,
    reason: string | undefined,
    startTime: number
  ): Promise<void> {
    const duration = Date.now() - startTime;
    
    await auditLogger.log({
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
    async createPermission(data: { action: string; resource: string; conditions?: any; description?: string }) {
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
  
    async listPermissions(page: number = 1, pageSize: number = 20, action?: string, resource?: string) {
      const where: any = {};
      if (action) where.action = action;
      if (resource) where.resource = resource;
      
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