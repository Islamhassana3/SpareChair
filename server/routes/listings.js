const express = require('express');
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  getMyListings
} = require('../controllers/listingController');
const { authMiddleware, hostMiddleware } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getListings);
router.get('/:id', getListing);

// Protected routes (Host only)
router.post('/', authMiddleware, hostMiddleware, createListing);
router.put('/:id', authMiddleware, hostMiddleware, updateListing);
router.delete('/:id', authMiddleware, hostMiddleware, deleteListing);
router.get('/host/my-listings', authMiddleware, hostMiddleware, getMyListings);

module.exports = router;