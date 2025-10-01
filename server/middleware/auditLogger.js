const logger = require('../config/logger');

// Security audit logging middleware
const auditLogger = (req, res, next) => {
  // Only log authentication and sensitive operations
  const sensitiveRoutes = ['/api/auth/', '/api/users/'];
  const isSensitive = sensitiveRoutes.some((route) => req.path.startsWith(route));

  if (isSensitive) {
    const auditData = {
      event: 'SECURITY_AUDIT',
      method: req.method,
      path: req.path,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      userId: req.user?.id,
      timestamp: new Date().toISOString(),
    };

    // Log authentication attempts
    if (req.path.includes('/login') || req.path.includes('/register')) {
      auditData.action = req.path.includes('/login') ? 'LOGIN_ATTEMPT' : 'REGISTRATION_ATTEMPT';
      auditData.email = req.body.email;
    }

    logger.info('Security Audit', auditData);
  }

  next();
};

// Helper function to log specific security events
const logSecurityEvent = (event, data) => {
  logger.warn('Security Event', {
    event,
    ...data,
    timestamp: new Date().toISOString(),
  });
};

module.exports = { auditLogger, logSecurityEvent };
