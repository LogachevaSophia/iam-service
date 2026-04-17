"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleService = exports.RoleService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/** Prisma возвращает permissions как RolePermission[]; для API нужен массив Permission. */
function flattenRolePermissions(role) {
    const raw = role.permissions;
    if (!Array.isArray(raw))
        return role;
    const permissions = raw
        .map((rp) => (rp && typeof rp === 'object' && rp.permission ? rp.permission : null))
        .filter(Boolean);
    return { ...role, permissions };
}
class RoleService {
    async createRole(data) {
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
    async getRole(id) {
        const role = await prisma.role.findUnique({
            where: { id },
            include: { permissions: { include: { permission: true } } }
        });
        if (!role)
            throw new Error('Role not found');
        return flattenRolePermissions(role);
    }
    async updateRole(id, data) {
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
    async deleteRole(id) {
        await prisma.role.delete({ where: { id } });
        return { success: true };
    }
    async listRoles(page = 1, pageSize = 20, includeSystem = false) {
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
    async assignRole(data) {
        const expiresAt = data.expiresInDays ? new Date(Date.now() + data.expiresInDays * 86400000) : undefined;
        const userRole = await prisma.userRole.upsert({
            where: { userId_roleId: { userId: data.userId, roleId: data.roleId } },
            update: { scope: data.scope, expiresAt, grantedBy: data.grantedBy },
            create: { userId: data.userId, roleId: data.roleId, scope: data.scope, expiresAt, grantedBy: data.grantedBy }
        });
        return { success: true, userRole };
    }
    async revokeRole(userId, roleId) {
        await prisma.userRole.delete({ where: { userId_roleId: { userId, roleId } } });
        return { success: true };
    }
    async getUserRoles(userId) {
        const userRoles = await prisma.userRole.findMany({
            where: { userId, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
            include: { role: { include: { permissions: { include: { permission: true } } } } }
        });
        return userRoles.map((ur) => {
            const scopeMap = ur.scope != null && typeof ur.scope === 'object' && !Array.isArray(ur.scope)
                ? Object.fromEntries(Object.entries(ur.scope).map(([k, v]) => [
                    k,
                    v == null ? '' : String(v),
                ]))
                : {};
            const permissions = ur.role.permissions
                .map((rp) => {
                const perm = rp.permission;
                if (!perm)
                    return null;
                return {
                    id: perm.id,
                    action: perm.action,
                    resource: perm.resource,
                    conditions: perm.conditions != null ? JSON.stringify(perm.conditions) : '',
                    description: perm.description ?? '',
                    created_at: perm.createdAt ? perm.createdAt.toISOString() : '',
                };
            })
                .filter(Boolean);
            return {
                role_id: ur.roleId,
                role_name: ur.role.name,
                scope: scopeMap,
                granted_at: ur.grantedAt ? ur.grantedAt.toISOString() : '',
                expires_at: ur.expiresAt ? ur.expiresAt.toISOString() : undefined,
                permissions,
            };
        });
    }
}
exports.RoleService = RoleService;
exports.roleService = new RoleService();
//# sourceMappingURL=role.service.js.map