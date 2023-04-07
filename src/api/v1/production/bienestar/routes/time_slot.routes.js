const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/time_slots/time-slot.controller');

router.get('/get-all-time-slots', timeSlotController.getAllTimeSlots);
// router.post('/get-time-slots-by-professional', timeSlotController.getTimeSlotsByProfessional);

module.exports = router;
