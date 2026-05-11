const express = require('express');
const router  = express.Router();
const bookingController = require(`../controllers/bookingController`);
const { isAuthenticated } = require(`../middleware/authMiddleware`);

router.post(`/:id`, isAuthenticated, bookingController.bookTicket);

module.exports = router;