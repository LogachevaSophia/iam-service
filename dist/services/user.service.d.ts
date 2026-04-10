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
export declare class UserService {
    createUser(input: CreateUserInput): Promise<any>;
    getUser(id: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    updateUser(id: string, input: UpdateUserInput): Promise<any>;
    deleteUser(id: string): Promise<void>;
    listUsers(page?: number, pageSize?: number, filters?: any): Promise<any>;
    login(email: string, password: string, userAgent?: string, ipAddress?: string): Promise<any>;
    logout(token: string): Promise<void>;
    refreshToken(refreshToken: string): Promise<any>;
    validateToken(token: string): Promise<any>;
    private generateAccessToken;
    private generateRefreshToken;
    private sanitizeUser;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map