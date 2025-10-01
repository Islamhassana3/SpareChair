const logger = require('../config/logger');
const { AppError } = require('./errorHandler');

// In-memory storage for failed login attempts
// In production, use Redis or database
const loginAttempts = new Map();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

const checkAccountLockout = (identifier) => {
  const attempts = loginAttempts.get(identifier);

  if (!attempts) {
    return { locked: false, remainingAttempts: MAX_ATTEMPTS };
  }

  const now = Date.now();
  const timeSinceLockout = now - attempts.lockedUntil;

  // Check if lockout has expired
  if (attempts.locked && timeSinceLockout < LOCKOUT_DURATION) {
    const remainingTime = Math.ceil((LOCKOUT_DURATION - timeSinceLockout) / 60000);
    return {
      locked: true,
      remainingTime,
      message: `Account locked. Try again in ${remainingTime} minutes.`,
    };
  }

  // Reset if lockout has expired
  if (attempts.locked && timeSinceLockout >= LOCKOUT_DURATION) {
    loginAttempts.delete(identifier);
    return { locked: false, remainingAttempts: MAX_ATTEMPTS };
  }

  return {
    locked: false,
    remainingAttempts: MAX_ATTEMPTS - attempts.count,
  };
};

const recordFailedAttempt = (identifier) => {
  const attempts = loginAttempts.get(identifier) || { count: 0, locked: false };

  attempts.count += 1;

  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.locked = true;
    attempts.lockedUntil = Date.now();
    logger.warn('Account locked due to failed login attempts', {
      identifier,
      attempts: attempts.count,
    });
  }

  loginAttempts.set(identifier, attempts);

  return {
    locked: attempts.locked,
    remainingAttempts: MAX_ATTEMPTS - attempts.count,
  };
};

const resetAttempts = (identifier) => {
  loginAttempts.delete(identifier);
};

const accountLockoutMiddleware = (req, res, next) => {
  // Only apply to login routes
  if (!req.path.includes('/login')) {
    return next();
  }

  const identifier = req.body.email || req.ip;
  const lockoutStatus = checkAccountLockout(identifier);

  if (lockoutStatus.locked) {
    return next(new AppError(lockoutStatus.message, 429));
  }

  // Store identifier for use in controller
  req.lockoutIdentifier = identifier;
  next();
};

module.exports = {
  accountLockoutMiddleware,
  checkAccountLockout,
  recordFailedAttempt,
  resetAttempts,
};
