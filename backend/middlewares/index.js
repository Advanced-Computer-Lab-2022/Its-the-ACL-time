const errorHandlerMiddleware = require('./errorHandler');
const notFoundMiddleware = require('./notFound');
const authMiddleware = require('./auth');

module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
  authMiddleware,
};
