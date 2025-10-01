const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { accountLockoutMiddleware } = require('../middleware/accountLockout');

const router = express.Router();

// Public routes
router.post('/register', validate(schemas.register), register);
router.post('/login', accountLockoutMiddleware, validate(schemas.login), login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
