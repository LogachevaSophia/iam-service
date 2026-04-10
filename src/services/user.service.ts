
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { cacheManager } from '../core/cache-manager';
import logger from '../utils/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateUserInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  specialty?: string;
  department?: string;
  metadata?: Record<string, any>;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  specialty?: string;
  department?: string;
  isActive?: boolean;
  metadata?: Record<string, any>;
}

export class UserService {
  async createUser(input: CreateUserInput): Promise<any> {
    const { email, password, firstName, lastName, specialty, department, metadata } = input;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, config.bcrypt.saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        specialty,
        department,
        metadata: metadata || {},
        isActive: true,
      },
    });

    logger.info(`User created: ${user.email} (${user.id})`);

    return this.sanitizeUser(user);
  }

  async getUser(id: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.sanitizeUser(user);
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<any> {
    const { email, firstName, lastName, specialty, department, isActive, metadata } = input;

    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
        firstName,
        lastName,
        specialty,
        department,
        isActive,
        metadata: metadata ? { ...metadata } : undefined,
      },
    });

    await cacheManager.invalidateUser(id);
    logger.info(`User updated: ${user.email} (${user.id})`);

    return this.sanitizeUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });

    await cacheManager.invalidateUser(id);
    logger.info(`User deleted: ${id}`);
  }

  async listUsers(page: number = 1, pageSize: number = 20, filters?: any): Promise<any> {
    const skip = (page - 1) * pageSize;
    const where: any = {};

    if (filters?.specialty) where.specialty = filters.specialty;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          roles: {
            include: { role: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users: users.map(u => this.sanitizeUser(u)),
      total,
      page,
      pageSize,
    };
  }

  async login(email: string, password: string, userAgent?: string, ipAddress?: string): Promise<any> {
    const user = await this.getUserByEmail(email);

    if (!user.isActive) {
      throw new Error('User account is disabled');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await prisma.userSession.create({
      data: {
        userId: user.id,
        token: accessToken,
        refreshToken,
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + config.jwt.accessTokenExpiry * 1000),
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    logger.info(`User logged in: ${user.email} (${user.id})`);

    return {
      accessToken,
      refreshToken,
      expiresIn: config.jwt.accessTokenExpiry,
      user: this.sanitizeUser(user),
    };
  }

  async logout(token: string): Promise<void> {
    await prisma.userSession.deleteMany({ where: { token } });
    logger.info(`User logged out`);
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const session = await prisma.userSession.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }

    const newAccessToken = this.generateAccessToken(session.user);
    const newRefreshToken = this.generateRefreshToken(session.user);

    await prisma.userSession.update({
      where: { id: session.id },
      data: {
        token: newAccessToken,
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + config.jwt.accessTokenExpiry * 1000),
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: config.jwt.accessTokenExpiry,
      user: this.sanitizeUser(session.user),
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as any;
      const session = await prisma.userSession.findUnique({
        where: { token },
      });

      if (!session || session.expiresAt < new Date()) {
        return { valid: false };
      }

      return {
        valid: true,
        userId: decoded.userId,
        claims: decoded,
      };
    } catch (error) {
      return { valid: false };
    }
  }

  private generateAccessToken(user: any): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        specialty: user.specialty,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.accessTokenExpiry }
    );
  }

  private generateRefreshToken(user: any): string {
    return jwt.sign(
      {
        userId: user.id,
        type: 'refresh',
      },
      config.jwt.secret,
      { expiresIn: config.jwt.refreshTokenExpiry }
    );
  }

  private sanitizeUser(user: any): any {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

export const userService = new UserService();