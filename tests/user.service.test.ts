jest.mock('@prisma/client', () => {
  const findUnique = jest.fn();
  const create = jest.fn();
  return {
    PrismaClient: jest.fn(() => ({
      user: { findUnique, create },
    })),
  };
});

jest.mock('../src/core/cache-manager', () => ({
  cacheManager: {
    invalidateUser: jest.fn(),
  },
}));

jest.mock('../src/utils/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed'),
  compare: jest.fn(),
}));

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserService } from '../src/services/user.service';

describe('UserService (IAM)', () => {
  const prisma = (PrismaClient as jest.Mock).mock.results[0].value;
  const findUnique = prisma.user.findUnique as jest.Mock;
  const create = prisma.user.create as jest.Mock;

  const service = new UserService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createUser hashes password and persists', async () => {
    findUnique.mockResolvedValue(null);
    create.mockResolvedValue({
      id: 'u1',
      email: 'a@b.c',
      passwordHash: 'hashed',
      firstName: null,
      lastName: null,
      specialty: null,
      department: null,
      metadata: {},
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: null,
    });

    const u = await service.createUser({
      email: 'a@b.c',
      password: 'secret',
    });

    expect(bcrypt.hash).toHaveBeenCalled();
    expect(create).toHaveBeenCalled();
    expect(u.email).toBe('a@b.c');
    expect(u.passwordHash).toBeUndefined();
  });

  it('createUser throws when email exists', async () => {
    findUnique.mockResolvedValue({ id: 'x' });
    await expect(
      service.createUser({ email: 'a@b.c', password: 'p' })
    ).rejects.toThrow('User already exists');
  });
});
