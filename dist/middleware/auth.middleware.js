"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function authMiddleware(req, res, next) {
    // Публичные маршруты (не требуют токена)
    const publicRoutes = [{ path: '/api/login', method: 'POST' }];
    const isPublic = publicRoutes.some(route => req.path === route.path && req.method === route.method);
    if (isPublic) {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}
//# sourceMappingURL=auth.middleware.js.map