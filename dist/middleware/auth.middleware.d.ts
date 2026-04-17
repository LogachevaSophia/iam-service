import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map