"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheManager = exports.CacheManager = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("../config");
const logger_1 = __importDefault(require("../utils/logger"));
class CacheManager {
    constructor() {
        this.defaultTTL = config_1.config.redis.ttl;
        this.redis = new ioredis_1.default({
            host: config_1.config.redis.host,
            port: config_1.config.redis.port,
            password: config_1.config.redis.password,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                logger_1.default.warn(`Redis connection retry ${times}, delay ${delay}ms`);
                return delay;
            },
            maxRetriesPerRequest: 3,
        });
        this.redis.on('connect', () => {
            logger_1.default.info('Redis connected successfully');
        });
        this.redis.on('error', (error) => {
            logger_1.default.error('Redis connection error:', error);
        });
    }
    async get(key) {
        try {
            const data = await this.redis.get(key);
            if (data) {
                return JSON.parse(data);
            }
            return null;
        }
        catch (error) {
            logger_1.default.error(`Redis get error for key ${key}:`, error);
            return null;
        }
    }
    async set(key, value, ttl) {
        try {
            const serialized = JSON.stringify(value);
            if (ttl) {
                await this.redis.setex(key, ttl, serialized);
            }
            else {
                await this.redis.setex(key, this.defaultTTL, serialized);
            }
        }
        catch (error) {
            logger_1.default.error(`Redis set error for key ${key}:`, error);
        }
    }
    async del(key) {
        try {
            await this.redis.del(key);
        }
        catch (error) {
            logger_1.default.error(`Redis del error for key ${key}:`, error);
        }
    }
    async delPattern(pattern) {
        try {
            const keys = await this.redis.keys(pattern);
            if (keys.length > 0) {
                await this.redis.del(...keys);
            }
        }
        catch (error) {
            logger_1.default.error(`Redis delPattern error for pattern ${pattern}:`, error);
        }
    }
    async getUserPermissions(userId) {
        return this.get(`user:${userId}:permissions`);
    }
    async setUserPermissions(userId, permissions) {
        await this.set(`user:${userId}:permissions`, permissions, config_1.config.cache.userPermissionsTTL);
    }
    async invalidateUser(userId) {
        await this.del(`user:${userId}:permissions`);
        await this.del(`user:${userId}:roles`);
    }
    async getResourceInfo(resourceType, resourceId) {
        return this.get(`resource:${resourceType}:${resourceId}`);
    }
    async setResourceInfo(resourceType, resourceId, info) {
        await this.set(`resource:${resourceType}:${resourceId}`, info, config_1.config.cache.resourceInfoTTL);
    }
    async invalidateResource(resourceType, resourceId) {
        await this.del(`resource:${resourceType}:${resourceId}`);
    }
    async healthCheck() {
        try {
            await this.redis.ping();
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.CacheManager = CacheManager;
exports.cacheManager = new CacheManager();
//# sourceMappingURL=cache-manager.js.map