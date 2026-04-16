"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const cache_manager_1 = require("../core/cache-manager");
const logger_1 = __importDefault(require("../utils/logger"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserService {
    async createUser(input) {
        const { email, password, firstName, lastName, specialty, department, metadata } = input;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const passwordHash = await bcryptjs_1.default.hash(password, config_1.config.bcrypt.saltRounds);
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
        logger_1.default.info(`User created: ${user.email} (${user.id})`);
        return this.sanitizeUser(user);
    }
    async getUser(id) {
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
    async getUserByEmail(email) {
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
    async updateUser(id, input) {
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
        await cache_manager_1.cacheManager.invalidateUser(id);
        logger_1.default.info(`User updated: ${user.email} (${user.id})`);
        return this.sanitizeUser(user);
    }
    async deleteUser(id) {
        await prisma.user.delete({
            where: { id },
        });
        await cache_manager_1.cacheManager.invalidateUser(id);
        logger_1.default.info(`User deleted: ${id}`);
    }
    async listUsers(page = 1, pageSize = 20, filters) {
        const skip = (page - 1) * pageSize;
        const where = {};
        if (filters?.specialty)
            where.specialty = filters.specialty;
        if (filters?.isActive !== undefined)
            where.isActive = filters.isActive;
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
    async login(email, password, userAgent, ipAddress) {
        const user = await this.getUserByEmail(email);
        if (!user.isActive) {
            throw new Error('User account is disabled');
        }
        const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
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
                expiresAt: new Date(Date.now() + config_1.config.jwt.accessTokenExpiry * 1000),
            },
        });
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        logger_1.default.info(`User logged in: ${user.email} (${user.id})`);
        return {
            accessToken,
            refreshToken,
            expiresIn: config_1.config.jwt.accessTokenExpiry,
            user: this.sanitizeUser(user),
        };
    }
    async logout(token) {
        await prisma.userSession.deleteMany({ where: { token } });
        logger_1.default.info(`User logged out`);
    }
    async refreshToken(refreshToken) {
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
                expiresAt: new Date(Date.now() + config_1.config.jwt.accessTokenExpiry * 1000),
            },
        });
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: config_1.config.jwt.accessTokenExpiry,
            user: this.sanitizeUser(session.user),
        };
    }
    async validateToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
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
        }
        catch (error) {
            return { valid: false };
        }
    }
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
            specialty: user.specialty,
        }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.accessTokenExpiry });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({
            userId: user.id,
            type: 'refresh',
        }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.refreshTokenExpiry });
    }
    sanitizeUser(user) {
        const { passwordHash, ...sanitized } = user;
        return {
            ...sanitized,
            is_active: user.isActive, // добавляем snake_case поле для API
        };
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map