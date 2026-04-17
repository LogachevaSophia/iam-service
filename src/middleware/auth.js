const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function authMiddleware(req, res, next) {
  const requestPath = (req.originalUrl || req.url || '').split('?')[0];

  // Только вход без токена. Раньше здесь был префикс /api/users — из‑за него
  // POST/GET /api/users и все /api/users/... шли без JWT (создание пользователя было доступно всем).
  const isPublic =
    requestPath === '/api/login' ||
    requestPath.startsWith('/api/login/');

  if (isPublic) {
    return next();
  }
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = authMiddleware;