const logger = require('../config/logger');
const { Sentry } = require('../config/sentry');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id,
  });

  // Report to Sentry if it's a server error and not operational
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.SENTRY_DSN &&
    (!err.isOperational || err.statusCode >= 500)
  ) {
    Sentry.captureException(err, {
      user: req.user ? { id: req.user.id, email: req.user.email } : undefined,
      tags: {
        path: req.path,
        method: req.method,
      },
      extra: {
        body: req.body,
        query: req.query,
        params: req.params,
      },
    });
  }

  // Development error response
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production error response
    if (err.isOperational) {
      // Operational, trusted error: send message to client
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or unknown error: don't leak error details
      logger.error('UNKNOWN ERROR:', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  }
};

module.exports = { AppError, errorHandler };
