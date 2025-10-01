const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

const router = express.Router();

// Public routes
router.post('/register', validate(schemas.register), register);
router.post('/login', validate(schemas.login), login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
