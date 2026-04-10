import { Permission } from "@prisma/client";
export interface PermissionRequest {
    userId: string;
    action: string;
    resource: string;
    resourceId?: string;
    metadata?: Record<string, any>;
}
export interface ResourceInfo {
    ownerId?: string;
    status?: string;
    specialty?: string;
    [key: string]: any;
}
export declare class PolicyEngine {
    evaluate(permissions: (Permission & {
        roleScope?: any;
    })[], request: PermissionRequest, resourceInfo?: ResourceInfo): Promise<{
        allowed: boolean;
        reason?: string;
        constraints?: string[];
    }>;
    private evaluateConditions;
    private extractConstraints;
}
export declare const policyEngine: PolicyEngine;
//# sourceMappingURL=policy-engine.d.ts.map