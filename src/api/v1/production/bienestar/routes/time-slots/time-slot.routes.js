const express = require("express");
const timeSlotRouter = express.Router();

//middlewares
const {
  getAllTimeSlotsValidationRules,
} = require("../../middlewares/validation-rules/time-slot");
const validationMiddleware = require("../../middlewares/validator");

//routes
const TIME_SLOT_ROUTES_MODEL = require("@api_bienestar/models/routes/time-slots");

//controllers
const TimeSlotController = require("@api_bienestar/controllers/time-slots");

timeSlotRouter.post(
  TIME_SLOT_ROUTES_MODEL.GET_ALL,
  getAllTimeSlotsValidationRules(),
  validationMiddleware,
  TimeSlotController.getAllTimeSlots
);

module.exports = timeSlotRouter;
