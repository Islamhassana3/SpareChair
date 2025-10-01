const express = require('express');
const { updateProfile, getUserStats } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware);

router.put('/profile', updateProfile);
router.get('/stats', getUserStats);

module.exports = router;
