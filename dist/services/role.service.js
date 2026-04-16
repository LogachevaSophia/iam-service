"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleService = exports.RoleService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
        return role;
    }
    async getRole(id) {
        const role = await prisma.role.findUnique({
            where: { id },
            include: { permissions: { include: { permission: true } } }
        });
        if (!role)
            throw new Error('Role not found');
        return role;
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
        return role;
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
        return { roles, total, page, pageSize };
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
exports.RoleService = RoleService;
exports.roleService = new RoleService();
//# sourceMappingURL=role.service.js.map