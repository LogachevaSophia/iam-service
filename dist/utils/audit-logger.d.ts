export interface AuditLogEntry {
    userId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    context?: any;
    allowed: boolean;
    reason?: string;
    duration?: number;
}
declare class AuditLogger {
    log(entry: AuditLogEntry): Promise<void>;
    close(): Promise<void>;
}
export declare const auditLogger: AuditLogger;
export {};
//# sourceMappingURL=audit-logger.d.ts.map