const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Get all bookings for the logged in user
router.get('/my-bookings', isAuthenticated, bookingController.getMyBookings);

// Book a ticket
router.post('/:id', isAuthenticated, bookingController.bookTicket);

// Cancel a booking
router.post('/:id/cancel', isAuthenticated, bookingController.cancelBooking);

module.exports = router;