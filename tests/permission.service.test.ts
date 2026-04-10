jest.mock('@prisma/client', () => {
  const findMany = jest.fn();
  return {
    PrismaClient: jest.fn(() => ({
      userRole: { findMany },
    })),
  };
});

jest.mock('../src/core/cache-manager', () => ({
  cacheManager: {
    getUserPermissions: jest.fn(),
    setUserPermissions: jest.fn(),
    getResourceInfo: jest.fn(),
    setResourceInfo: jest.fn(),
  },
}));

jest.mock('../src/utils/audit-logger', () => ({
  auditLogger: {
    log: jest.fn().mockResolvedValue(undefined),
  },
}));

import { PrismaClient } from '@prisma/client';
import { PermissionService } from '../src/services/permission.service';
import { cacheManager } from '../src/core/cache-manager';

describe('PermissionService (IAM)', () => {
  const findMany = (PrismaClient as jest.Mock).mock.results[0].value.userRole
    .findMany as jest.Mock;

  const service = new PermissionService();

  beforeEach(() => {
    jest.clearAllMocks();
    (cacheManager.getUserPermissions as jest.Mock).mockResolvedValue(null);
    findMany.mockResolvedValue([]);
  });

  it('denies when user has no role permissions', async () => {
    const r = await service.checkPermission('user-1', 'read', 'guideline');
    expect(r.allowed).toBe(false);
    expect(r.reason).toMatch(/No permission|No permissions/);
  });

  it('allows when permission matches and policy conditions pass', async () => {
    findMany.mockResolvedValue([
      {
        role: {
          permissions: [
            {
              permission: {
                id: 'perm-1',
                action: 'read',
                resource: 'guideline',
                conditions: {},
                description: null,
                createdAt: new Date(),
              },
            },
          ],
        },
      },
    ]);

    const r = await service.checkPermission('user-1', 'read', 'guideline');
    expect(r.allowed).toBe(true);
  });
});
