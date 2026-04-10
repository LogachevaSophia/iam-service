export declare const config: {
    server: {
        port: number;
        env: string;
    };
    database: {
        url: string;
    };
    redis: {
        host: string;
        port: number;
        password: string | undefined;
        ttl: number;
    };
    jwt: {
        secret: string;
        accessTokenExpiry: number;
        refreshTokenExpiry: number;
    };
    bcrypt: {
        saltRounds: number;
    };
    monitoring: {
        enabled: boolean;
        metricsPort: number;
    };
    cache: {
        enabled: boolean;
        userPermissionsTTL: number;
        resourceInfoTTL: number;
    };
    audit: {
        enabled: boolean;
        logSlowQueries: number;
    };
    /** Clinrec Backend REST (Swagger: /swagger/index.html → doc.json) */
    clinrec: {
        baseUrl: string;
        /** Optional Bearer token for protected routes (e.g. POST /api/v1/process) */
        apiToken: string | undefined;
    };
};
//# sourceMappingURL=index.d.ts.map