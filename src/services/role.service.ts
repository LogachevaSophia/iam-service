import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** Prisma возвращает permissions как RolePermission[]; для API нужен массив Permission. */
function flattenRolePermissions<T extends { permissions?: unknown }>(role: T): T {
  const raw = role.permissions;
  if (!Array.isArray(raw)) return role;
  const permissions = raw
    .map((rp: any) => (rp && typeof rp === 'object' && rp.permission ? rp.permission : null))
    .filter(Boolean);
  return { ...role, permissions } as T;
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
    return flattenRolePermissions(role);
  }

  async getRole(id: string) {
    const role = await prisma.role.findUnique({
      where: { id },
      include: { permissions: { include: { permission: true } } }
    });
    if (!role) throw new Error('Role not found');
    return flattenRolePermissions(role);
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
    return flattenRolePermissions(role);
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
      roles: roles.map((r) => flattenRolePermissions(r)),
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
    const userRoles = await prisma.userRole.findMany({
      where: { userId, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
      include: { role: { include: { permissions: { include: { permission: true } } } } }
    });
    return userRoles.map(ur => ({
      roleId: ur.roleId,
      roleName: ur.role.name,
      scope: ur.scope,
      grantedAt: ur.grantedAt,
      expiresAt: ur.expiresAt,
      permissions: ur.role.permissions.map(rp => rp.permission)
    }));
  }
}

export const roleService = new RoleService();