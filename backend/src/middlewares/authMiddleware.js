const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Invalid token:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    console.log('Decoded userId:', req.userId);
    next();
  });
};

module.exports = authMiddleware;
