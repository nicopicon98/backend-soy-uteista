const { validateGetSedes, getSedesValidationRules } = require("../../middlewares/get-sedes.middleware");
const timeSlotController = require("../../controllers/time_slots/time-slot.controller");
const express = require("express");
const router = express.Router();

router.post(
  "/get-all-time-slots",
  getSedesValidationRules(),
  validateGetSedes,
  timeSlotController.getAllTimeSlots
);

module.exports = router;
