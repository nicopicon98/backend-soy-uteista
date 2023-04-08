const {
  validateGetSedes,
  getSedesValidationRules,
} = require("@api_bienestar/middlewares/get-sedes.middleware");
const TIME_SLOT_ROUTES_MODEL = require("@api_bienestar/models/routes/time-slots");
const TimeSlotController = require("@api_bienestar/controllers/time-slots");
const { sendService } = require("@api_bienestar/config/crypto.config");
const express = require("express");
const timeSlotRouter = express.Router();

timeSlotRouter.post(
  TIME_SLOT_ROUTES_MODEL.GET_ALL,
  getSedesValidationRules(),
  validateGetSedes,
  TimeSlotController.getAllTimeSlots
);

timeSlotRouter.post(
  "/deco",
  (req, res) => {
    const content = req.body;
    sendService(content, res);
  }
);

module.exports = timeSlotRouter;
