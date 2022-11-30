const { UnauthorizedError } = require('../Errors');
const { verifyToken } = require('../utils');

const authMiddleware = (req, res, next) => {
  console.log("header auth");
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthorizedError('Authentication failed');
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const payload = verifyToken(token);
      req.user = { userId: payload.userId, type: payload.type };
      next();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedError('Authentication failed');
    }
  }
  // next();
};

const authOwner = (req, res, next) => {
  //TODO check signed in user authorization
  console.log('check user is owner');
  next();
};

const authAdmin = (req, res, next) => {
  //TODO check singed in user is admin
  console.log('check user is admin');
  next();
};

module.exports = {
  authMiddleware,
  authOwner,
  authAdmin,
};
