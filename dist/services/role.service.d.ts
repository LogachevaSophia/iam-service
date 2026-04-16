export declare class RoleService {
    createRole(data: {
        name: string;
        description?: string;
        permissionIds?: string[];
    }): Promise<{
        permissions: ({
            permission: {
                id: string;
                action: string;
                resource: string;
                conditions: import("@prisma/client/runtime/library").JsonValue | null;
                description: string | null;
                createdAt: Date;
            };
        } & {
            id: string;
            roleId: string;
            permissionId: string;
        })[];
    } & {
        name: string;
        id: string;
        description: string | null;
        createdAt: Date;
        isSystem: boolean;
        updatedAt: Date;
    }>;
    getRole(id: string): Promise<{
        permissions: ({
            permission: {
                id: string;
                action: string;
                resource: string;
                conditions: import("@prisma/client/runtime/library").JsonValue | null;
                description: string | null;
                createdAt: Date;
            };
        } & {
            id: string;
            roleId: string;
            permissionId: string;
        })[];
    } & {
        name: string;
        id: string;
        description: string | null;
        createdAt: Date;
        isSystem: boolean;
        updatedAt: Date;
    }>;
    updateRole(id: string, data: {
        name?: string;
        description?: string;
        permissionIds?: string[];
    }): Promise<{
        permissions: ({
            permission: {
                id: string;
                action: string;
                resource: string;
                conditions: import("@prisma/client/runtime/library").JsonValue | null;
                description: string | null;
                createdAt: Date;
            };
        } & {
            id: string;
            roleId: string;
            permissionId: string;
        })[];
    } & {
        name: string;
        id: string;
        description: string | null;
        createdAt: Date;
        isSystem: boolean;
        updatedAt: Date;
    }>;
    deleteRole(id: string): Promise<{
        success: boolean;
    }>;
    listRoles(page?: number, pageSize?: number, includeSystem?: boolean): Promise<{
        roles: ({
            permissions: ({
                permission: {
                    id: string;
                    action: string;
                    resource: string;
                    conditions: import("@prisma/client/runtime/library").JsonValue | null;
                    description: string | null;
                    createdAt: Date;
                };
            } & {
                id: string;
                roleId: string;
                permissionId: string;
            })[];
        } & {
            name: string;
            id: string;
            description: string | null;
            createdAt: Date;
            isSystem: boolean;
            updatedAt: Date;
        })[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    assignRole(data: {
        userId: string;
        roleId: string;
        scope?: any;
        expiresInDays?: number;
        grantedBy: string;
    }): Promise<{
        success: boolean;
        userRole: {
            id: string;
            userId: string;
            roleId: string;
            scope: import("@prisma/client/runtime/library").JsonValue | null;
            grantedBy: string | null;
            grantedAt: Date;
            expiresAt: Date | null;
        };
    }>;
    revokeRole(userId: string, roleId: string): Promise<{
        success: boolean;
    }>;
    getUserRoles(userId: string): Promise<{
        roleId: string;
        roleName: string;
        scope: import("@prisma/client/runtime/library").JsonValue;
        grantedAt: Date;
        expiresAt: Date | null;
        permissions: {
            id: string;
            action: string;
            resource: string;
            conditions: import("@prisma/client/runtime/library").JsonValue | null;
            description: string | null;
            createdAt: Date;
        }[];
    }[]>;
}
export declare const roleService: RoleService;
//# sourceMappingURL=role.service.d.ts.map