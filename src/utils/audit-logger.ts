
import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient();

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

class AuditLogger {
  async log(entry: AuditLogEntry): Promise<void> {
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
    } catch (error) {
      logger.error('Failed to write audit log:', error);
    }
  }

  async close(): Promise<void> {
    await prisma.$disconnect();
  }
}

export const auditLogger = new AuditLogger();