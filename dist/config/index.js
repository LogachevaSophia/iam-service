"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
exports.config = {
    server: {
        port: parseInt(process.env.PORT || '50051'),
        env: process.env.NODE_ENV || 'development',
    },
    database: {
        url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/iam',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        ttl: parseInt(process.env.REDIS_TTL || '300'), // 5 minutes
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        accessTokenExpiry: parseInt(process.env.JWT_ACCESS_EXPIRY || '3600'), // 1 hour
        refreshTokenExpiry: parseInt(process.env.JWT_REFRESH_EXPIRY || '604800'), // 7 days
    },
    bcrypt: {
        saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
    },
    monitoring: {
        enabled: process.env.MONITORING_ENABLED === 'true',
        metricsPort: parseInt(process.env.METRICS_PORT || '9090'),
    },
    cache: {
        enabled: process.env.CACHE_ENABLED !== 'false',
        userPermissionsTTL: parseInt(process.env.USER_PERMISSIONS_TTL || '300'),
        resourceInfoTTL: parseInt(process.env.RESOURCE_INFO_TTL || '60'),
    },
    audit: {
        enabled: process.env.AUDIT_ENABLED !== 'false',
        logSlowQueries: parseInt(process.env.SLOW_QUERY_THRESHOLD_MS || '100'),
    },
    /** Clinrec Backend REST (Swagger: /swagger/index.html → doc.json) */
    clinrec: {
        baseUrl: (process.env.CLINREC_BASE_URL || 'http://51.250.100.64:8081').replace(/\/+$/, ''),
        /** Optional Bearer token for protected routes (e.g. POST /api/v1/process) */
        apiToken: process.env.CLINREC_API_TOKEN,
    },
};
//# sourceMappingURL=index.js.map