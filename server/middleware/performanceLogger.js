const logger = require('../config/logger');

// Middleware to log slow requests
const performanceLogger = (slowThreshold = 1000) => {
  return (req, res, next) => {
    const startTime = Date.now();

    // Capture the original end function
    const originalEnd = res.end;

    // Override the end function
    res.end = function (...args) {
      const duration = Date.now() - startTime;

      // Log all requests with performance data
      const logData = {
        requestId: req.id,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      };

      // Log slow requests as warnings
      if (duration > slowThreshold) {
        logger.warn('Slow request detected', {
          ...logData,
          threshold: `${slowThreshold}ms`,
        });
      } else {
        logger.http('Request completed', logData);
      }

      // Call the original end function
      originalEnd.apply(res, args);
    };

    next();
  };
};

// Helper function to log business events
const logBusinessEvent = (event, data) => {
  logger.info('Business Event', {
    event,
    ...data,
    timestamp: new Date().toISOString(),
  });
};

module.exports = { performanceLogger, logBusinessEvent };
