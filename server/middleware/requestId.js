const { v4: uuidv4 } = require('uuid');

// Middleware to add unique request ID to each request
const requestIdMiddleware = (req, res, next) => {
  // Use existing request ID from header or generate new one
  req.id = req.get('X-Request-ID') || uuidv4();

  // Add request ID to response headers
  res.set('X-Request-ID', req.id);

  next();
};

module.exports = { requestIdMiddleware };
