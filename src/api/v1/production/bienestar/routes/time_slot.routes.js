const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/time_slots/time-slot.controller');

router.post('/get-all-time-slots', timeSlotController.getAllTimeSlots);

module.exports = router;