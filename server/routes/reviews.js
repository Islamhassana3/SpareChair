const express = require('express');
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

const router = express.Router();

// Public routes
router.get('/', getReviews);

// Protected routes
router.post('/', authMiddleware, validate(schemas.review), createReview);
router.put('/:id', authMiddleware, validate(schemas.review), updateReview);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
