const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function authMiddleware(req, res, next) {
  const publicRoutes = [
    { path: '/api/login', method: 'POST' },
    { path: '/api/users', method: 'POST' },
    { path: '/health', method: 'GET' }
  ];
  
  const isPublic = publicRoutes.some(
    route => req.path === route.path && req.method === route.method
  );
  
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