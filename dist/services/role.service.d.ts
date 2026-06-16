export declare class RoleService {
    createRole(data: {
        name: string;
        description?: string;
        permissionIds?: string[];
    }): Promise<{
        id: string;
        name: string;
        description: string;
        is_system: boolean;
        created_at: string;
        permissions: {
            id: string;
            action: string;
            resource: string;
            conditions: string;
            description: string;
            created_at: string;
        }[];
    }>;
    getRole(id: string): Promise<{
        id: string;
        name: string;
        description: string;
        is_system: boolean;
        created_at: string;
        permissions: {
            id: string;
            action: string;
            resource: string;
            conditions: string;
            description: string;
            created_at: string;
        }[];
    }>;
    updateRole(id: string, data: {
        name?: string;
        description?: string;
        permissionIds?: string[];
    }): Promise<{
        id: string;
        name: string;
        description: string;
        is_system: boolean;
        created_at: string;
        permissions: {
            id: string;
            action: string;
            resource: string;
            conditions: string;
            description: string;
            created_at: string;
        }[];
    }>;
    deleteRole(id: string): Promise<{
        success: boolean;
    }>;
    listRoles(page?: number, pageSize?: number, includeSystem?: boolean): Promise<{
        roles: {
            id: string;
            name: string;
            description: string;
            is_system: boolean;
            created_at: string;
            permissions: {
                id: string;
                action: string;
                resource: string;
                conditions: string;
                description: string;
                created_at: string;
            }[];
        }[];
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
        role_id: string;
        role_name: string;
        scope: {
            [k: string]: string;
        };
        granted_at: string;
        expires_at: string | undefined;
        permissions: {
            id: string;
            action: string;
            resource: string;
            conditions: string;
            description: string;
            created_at: string;
        }[];
    }[]>;
}
export declare const roleService: RoleService;
//# sourceMappingURL=role.service.d.ts.map