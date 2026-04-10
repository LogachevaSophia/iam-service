export declare class CacheManager {
    private redis;
    private defaultTTL;
    constructor();
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    delPattern(pattern: string): Promise<void>;
    getUserPermissions(userId: string): Promise<any | null>;
    setUserPermissions(userId: string, permissions: any): Promise<void>;
    invalidateUser(userId: string): Promise<void>;
    getResourceInfo(resourceType: string, resourceId: string): Promise<any | null>;
    setResourceInfo(resourceType: string, resourceId: string, info: any): Promise<void>;
    invalidateResource(resourceType: string, resourceId: string): Promise<void>;
    healthCheck(): Promise<boolean>;
}
export declare const cacheManager: CacheManager;
//# sourceMappingURL=cache-manager.d.ts.map