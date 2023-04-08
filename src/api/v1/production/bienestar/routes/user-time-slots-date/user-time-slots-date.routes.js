const USER_TIME_SLOTS_DATE_ROUTES = require("@api_bienestar/models/routes/user-time-slots-date");
const UserTimeSlotsDateController = require("@api_bienestar/controllers/user-time-slots-date");
const { sendService } = require("@api_bienestar/config/crypto.config");
const express = require("express");
const user_time_slots_date = express.Router();


user_time_slots_date.post(
  USER_TIME_SLOTS_DATE_ROUTES.GET_ALL_BY_PROFESSIONAL,
  UserTimeSlotsDateController.getAllByProfessional
);

module.exports = time_slots;
