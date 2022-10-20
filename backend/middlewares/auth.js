const { UnauthorizedError } = require('../Errors');
const { verifyToken } = require('../utils');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  if (!authHeader || authHeader.startsWith('Bearer'))
    throw new UnauthorizedError('Authentication failed');

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyToken(token);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError('Authentication failed');
  }
};

module.exports = authMiddleware;
