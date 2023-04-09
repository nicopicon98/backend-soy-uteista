const express = require("express");
const timeSlotRouter = express.Router();

//middlewares
const {
  getAllTimeSlotsValidationRules,
} = require("../../middlewares/validation-rules/time-slots");
const validationMiddleware = require("../../middlewares/validator");

//routes
const TIME_SLOT_ROUTES_MODEL = require("../../models/routes/time-slots");

//controllers
const TimeSlotController = require("../../controllers/time-slots");

timeSlotRouter.post(
  TIME_SLOT_ROUTES_MODEL.GET_ALL,
  getAllTimeSlotsValidationRules(),
  validationMiddleware,
  TimeSlotController.getAllTimeSlots
);

module.exports = timeSlotRouter;
