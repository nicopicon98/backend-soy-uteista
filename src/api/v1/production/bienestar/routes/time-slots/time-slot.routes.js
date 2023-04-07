const {
  validateGetSedes,
  getSedesValidationRules,
} = require("@api_bienestar/middlewares/get-sedes.middleware");
const TIME_SLOT_ROUTES_MODEL = require("@api_bienestar/models/routes/time-slots");
const TimeSlotController = require("@api_bienestar/controllers/time-slots");
const express = require("express");
const time_slots = express.Router();

time_slots.post(
  TIME_SLOT_ROUTES_MODEL.GET_ALL,
  getSedesValidationRules(),
  validateGetSedes,
  TimeSlotController.getAllTimeSlots
);

module.exports = time_slots;
