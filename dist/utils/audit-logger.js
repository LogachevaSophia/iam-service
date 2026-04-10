"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("./logger"));
const prisma = new client_1.PrismaClient();
class AuditLogger {
    async log(entry) {
        try {
            await prisma.auditLog.create({
                data: {
                    userId: entry.userId,
                    action: entry.action,
                    resource: entry.resource,
                    resourceId: entry.resourceId,
                    context: entry.context || {},
                    allowed: entry.allowed,
                    reason: entry.reason,
                    duration: entry.duration,
                },
            });
        }
        catch (error) {
            logger_1.default.error('Failed to write audit log:', error);
        }
    }
    async close() {
        await prisma.$disconnect();
    }
}
exports.auditLogger = new AuditLogger();
//# sourceMappingURL=audit-logger.js.map