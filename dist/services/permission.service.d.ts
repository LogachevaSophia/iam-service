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
}
//# sourceMappingURL=permission.service.d.ts.map