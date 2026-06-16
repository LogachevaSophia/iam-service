import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();

/** Prisma Json → строка для proto `Permission.conditions` (иначе в gRPC получается "[object Object]"). */
function permissionRowToGrpc(perm: {
  id: string;
  action: string;
  resource: string;
  conditions: unknown;
  description: string | null;
  createdAt: Date;
}) {
  return {
    id: perm.id,
    action: perm.action,
    resource: perm.resource,
    conditions:
      perm.conditions != null ? JSON.stringify(perm.conditions) : '',
    description: perm.description ?? '',
    created_at: perm.createdAt ? perm.createdAt.toISOString() : '',
  };
}

function rolePermissionsToGrpc(role: { permissions?: unknown }) {
  const raw = role.permissions;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((rp: any) => (rp && typeof rp === 'object' && rp.permission ? rp.permission : null))
    .filter(Boolean)
    .map((perm: any) => permissionRowToGrpc(perm));
}

/** Ответ роли в виде, ожидаемом `RoleResponse` в proto (snake_case + строковые conditions). */
function roleToGrpcResponse(role: {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  createdAt: Date;
  permissions?: unknown;
}) {
  return {
    id: role.id,
    name: role.name,
    description: role.description ?? '',
    is_system: role.isSystem === true,
    created_at: role.createdAt ? role.createdAt.toISOString() : '',
    permissions: rolePermissionsToGrpc(role),
  };
}

export class RoleService {
  async createRole(data: { name: string; description?: string; permissionIds?: string[] }) {
    const role = await prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        permissions: data.permissionIds ? {
          create: data.permissionIds.map(pid => ({ permissionId: pid }))
        } : undefined
      },
      include: { permissions: { include: { permission: true } } }
    });
    return roleToGrpcResponse(role);
  }

  async getRole(id: string) {
    const role = await prisma.role.findUnique({
      where: { id },
      include: { permissions: { include: { permission: true } } }
    });
    if (!role) {
      logger.warn('getRole_not_found', { roleId: id });
      throw new Error('Role not found');
    }
    const permCount = rolePermissionsToGrpc(role).length;
    logger.info('getRole_ok', { roleId: id, name: role.name, permissionCount: permCount });
    return roleToGrpcResponse(role);
  }

  async updateRole(id: string, data: { name?: string; description?: string; permissionIds?: string[] }) {
    const role = await prisma.role.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        permissions: data.permissionIds ? {
          deleteMany: {},
          create: data.permissionIds.map(pid => ({ permissionId: pid }))
        } : undefined
      },
      include: { permissions: { include: { permission: true } } }
    });
    return roleToGrpcResponse(role);
  }

  async deleteRole(id: string) {
    await prisma.role.delete({ where: { id } });
    return { success: true };
  }

  async listRoles(page: number = 1, pageSize: number = 20, includeSystem: boolean = false) {
    const where = includeSystem ? {} : { isSystem: false };
    const [roles, total] = await Promise.all([
      prisma.role.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { permissions: { include: { permission: true } } }
      }),
      prisma.role.count({ where })
    ]);
    return {
      roles: roles.map((r) => roleToGrpcResponse(r)),
      total,
      page,
      pageSize,
    };
  }

  async assignRole(data: { userId: string; roleId: string; scope?: any; expiresInDays?: number; grantedBy: string }) {
    const expiresAt = data.expiresInDays ? new Date(Date.now() + data.expiresInDays * 86400000) : undefined;
    const userRole = await prisma.userRole.upsert({
      where: { userId_roleId: { userId: data.userId, roleId: data.roleId } },
      update: { scope: data.scope, expiresAt, grantedBy: data.grantedBy },
      create: { userId: data.userId, roleId: data.roleId, scope: data.scope, expiresAt, grantedBy: data.grantedBy }
    });
    return { success: true, userRole };
  }

  async revokeRole(userId: string, roleId: string) {
    await prisma.userRole.delete({ where: { userId_roleId: { userId, roleId } } });
    return { success: true };
  }

  async getUserRoles(userId: string) {
    logger.info('getUserRoles_start', { userId });
    const userRoles = await prisma.userRole.findMany({
      where: { userId, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
      include: { role: { include: { permissions: { include: { permission: true } } } } }
    });
    logger.info('getUserRoles_db', {
      userId,
      assignmentCount: userRoles.length,
      roleIds: userRoles.map((ur) => ur.roleId),
      roleNames: userRoles.map((ur) => ur.role?.name).filter(Boolean),
    });
    const mapped = userRoles.map((ur) => {
      const scopeMap =
        ur.scope != null && typeof ur.scope === 'object' && !Array.isArray(ur.scope)
          ? Object.fromEntries(
              Object.entries(ur.scope as Record<string, unknown>).map(([k, v]) => [
                k,
                v == null ? '' : String(v),
              ]),
            )
          : {};
      const permissions = rolePermissionsToGrpc(ur.role);
      return {
        role_id: ur.roleId,
        role_name: ur.role.name,
        scope: scopeMap,
        granted_at: ur.grantedAt ? ur.grantedAt.toISOString() : '',
        expires_at: ur.expiresAt ? ur.expiresAt.toISOString() : undefined,
        permissions,
      };
    });
    logger.info('getUserRoles_mapped', {
      userId,
      rolesReturned: mapped.length,
      permissionsPerRole: mapped.map((r) => ({
        roleId: r.role_id,
        count: r.permissions.length,
      })),
    });
    return mapped;
  }
}

export const roleService = new RoleService();