"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policyEngine = exports.PolicyEngine = void 0;
class PolicyEngine {
    async evaluate(permissions, request, resourceInfo) {
        if (!permissions || permissions.length === 0) {
            return {
                allowed: false,
                reason: 'No permissions found for this action and resource',
            };
        }
        for (const permission of permissions) {
            const conditions = permission.conditions;
            if (this.evaluateConditions(conditions, request, resourceInfo, permission.roleScope)) {
                return {
                    allowed: true,
                    constraints: this.extractConstraints(conditions),
                };
            }
        }
        return {
            allowed: false,
            reason: 'Conditions not met for any permission',
        };
    }
    evaluateConditions(conditions, request, resourceInfo, roleScope) {
        if (!conditions || Object.keys(conditions).length === 0) {
            return true;
        }
        if (conditions.ownerOnly) {
            if (!resourceInfo?.ownerId || resourceInfo.ownerId !== request.userId) {
                return false;
            }
        }
        if (conditions.allowedStatuses && Array.isArray(conditions.allowedStatuses)) {
            if (!resourceInfo?.status || !conditions.allowedStatuses.includes(resourceInfo.status)) {
                return false;
            }
        }
        if (conditions.specialtyMatch && resourceInfo?.specialty) {
            const userSpecialty = request.metadata?.specialty || roleScope?.specialties?.[0];
            if (userSpecialty !== resourceInfo.specialty) {
                return false;
            }
        }
        if (conditions.departmentMatch && resourceInfo?.department) {
            const userDepartment = request.metadata?.department || roleScope?.departments?.[0];
            if (userDepartment !== resourceInfo.department) {
                return false;
            }
        }
        return true;
    }
    extractConstraints(conditions) {
        const constraints = [];
        if (conditions?.allowedStatuses) {
            constraints.push(`allowed_statuses: ${conditions.allowedStatuses.join(', ')}`);
        }
        if (conditions?.ownerOnly) {
            constraints.push('owner_only: true');
        }
        if (conditions?.specialtyMatch) {
            constraints.push('specialty_match: required');
        }
        return constraints;
    }
}
exports.PolicyEngine = PolicyEngine;
exports.policyEngine = new PolicyEngine();
//# sourceMappingURL=policy-engine.js.map