import Redis from 'ioredis';
import { config } from '../config';
import logger from '../utils/logger';

export class CacheManager {
  private redis: Redis;
  private defaultTTL: number;

  constructor() {
    this.defaultTTL = config.redis.ttl;
    
    this.redis = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        logger.warn(`Redis connection retry ${times}, delay ${delay}ms`);
        return delay;
      },
      maxRetriesPerRequest: 3,
    });

    this.redis.on('connect', () => {
      logger.info('Redis connected successfully');
    });

    this.redis.on('error', (error) => {
      logger.error('Redis connection error:', error);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      logger.error(`Redis get error for key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await this.redis.setex(key, ttl, serialized);
      } else {
        await this.redis.setex(key, this.defaultTTL, serialized);
      }
    } catch (error) {
      logger.error(`Redis set error for key ${key}:`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      logger.error(`Redis del error for key ${key}:`, error);
    }
  }

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.error(`Redis delPattern error for pattern ${pattern}:`, error);
    }
  }

  async getUserPermissions(userId: string): Promise<any | null> {
    return this.get(`user:${userId}:permissions`);
  }

  async setUserPermissions(userId: string, permissions: any): Promise<void> {
    await this.set(`user:${userId}:permissions`, permissions, config.cache.userPermissionsTTL);
  }

  async invalidateUser(userId: string): Promise<void> {
    await this.del(`user:${userId}:permissions`);
    await this.del(`user:${userId}:roles`);
  }

  async getResourceInfo(resourceType: string, resourceId: string): Promise<any | null> {
    return this.get(`resource:${resourceType}:${resourceId}`);
  }

  async setResourceInfo(resourceType: string, resourceId: string, info: any): Promise<void> {
    await this.set(`resource:${resourceType}:${resourceId}`, info, config.cache.resourceInfoTTL);
  }

  async invalidateResource(resourceType: string, resourceId: string): Promise<void> {
    await this.del(`resource:${resourceType}:${resourceId}`);
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.redis.ping();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const cacheManager = new CacheManager();