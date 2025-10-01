const express = require('express');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
} = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

const router = express.Router();

// All booking routes require authentication
router.use(authMiddleware);

router.post('/', validate(schemas.booking), createBooking);
router.get('/', getBookings);
router.get('/:id', getBooking);
router.put('/:id/status', updateBookingStatus);
router.put('/:id/cancel', cancelBooking);

module.exports = router;
