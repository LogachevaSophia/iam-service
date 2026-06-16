const jwt = require('jsonwebtoken');
const authMiddleware = require('../src/middleware/auth.js');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function mockReqRes(path, authHeader) {
  const req = {
    originalUrl: path,
    url: path,
    headers: authHeader ? { authorization: authHeader } : {},
  };
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };
  return { req, res, next, wasNextCalled: () => nextCalled };
}

describe('authMiddleware', () => {
  it('allows /api/login without token', () => {
    const { req, res, next, wasNextCalled } = mockReqRes('/api/login');
    authMiddleware(req, res, next);
    expect(wasNextCalled()).toBe(true);
  });

  it('rejects request without Authorization header', () => {
    const { req, res, next, wasNextCalled } = mockReqRes('/api/users');
    authMiddleware(req, res, next);
    expect(wasNextCalled()).toBe(false);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/No token/i);
  });

  it('accepts valid Bearer token', () => {
    const token = jwt.sign({ userId: 'u1', email: 'a@test.com' }, JWT_SECRET);
    const { req, res, next, wasNextCalled } = mockReqRes(
      '/api/users',
      `Bearer ${token}`,
    );
    authMiddleware(req, res, next);
    expect(wasNextCalled()).toBe(true);
    expect(req.userId).toBe('u1');
    expect(req.userEmail).toBe('a@test.com');
  });

  it('rejects invalid token', () => {
    const { req, res, next, wasNextCalled } = mockReqRes(
      '/api/users',
      'Bearer invalid-token',
    );
    authMiddleware(req, res, next);
    expect(wasNextCalled()).toBe(false);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Invalid token/i);
  });
});
