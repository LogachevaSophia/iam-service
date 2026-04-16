export declare class PermissionService {
    checkPermission(userId: string, action: string, resource: string, resourceId?: string, metadata?: Record<string, any>): Promise<{
        allowed: boolean;
        reason?: string;
        constraints?: string[];
    }>;
    batchCheck(userId: string, checks: Array<{
        action: string;
        resource: string;
        resourceId?: string;
        metadata?: Record<string, any>;
    }>): Promise<Array<{
        allowed: boolean;
        reason?: string;
    }>>;
    private getUserPermissionsWithRoles;
    private getResourceInfo;
    private logAudit;
    createPermission(data: {
        action: string;
        resource: string;
        conditions?: any;
        description?: string;
    }): Promise<{
        id: string;
        action: string;
        resource: string;
        conditions: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
        createdAt: Date;
    }>;
    listPermissions(page?: number, pageSize?: number, action?: string, resource?: string): Promise<{
        permissions: {
            id: string;
            action: string;
            resource: string;
            conditions: import("@prisma/client/runtime/library").JsonValue | null;
            description: string | null;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        pageSize: number;
    }>;
}
//# sourceMappingURL=permission.service.d.ts.map