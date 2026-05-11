const express = require('express');
const router  = express.Router();
const eventController = require(`../controllers/eventController`);
router.get(`/`, eventController.getAllEvents);
const { isAdmin } = require(`../middleware/authMiddleware`);

router.get(`/`, eventController.getAllEvents);
router.post(`/add`, isAdmin, eventController.createEvent);

module.exports = router;