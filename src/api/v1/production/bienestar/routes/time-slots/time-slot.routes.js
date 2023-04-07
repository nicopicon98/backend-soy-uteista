const {
  validateGetSedes,
  getSedesValidationRules,
} = require("../../middlewares/get-sedes.middleware");
const timeSlotController = require("../../controllers/time-slots/time-slot.controller");
const TIME_SLOT_ROUTES_MODEL = require("../../models/routes/time-slots");
const express = require("express");
const time_slots = express.Router();

time_slots.post(
  TIME_SLOT_ROUTES_MODEL.GET_ALL,
  getSedesValidationRules(),
  validateGetSedes,
  timeSlotController.getAllTimeSlots
);

module.exports = time_slots;
