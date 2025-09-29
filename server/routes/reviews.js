const express = require('express');
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getReviews);

// Protected routes
router.post('/', authMiddleware, createReview);
router.put('/:id', authMiddleware, updateReview);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;