const {
  getAllUserTimeSlotsDateByProfessionalValidationRules,
  validategetAllUserTimeSlotsDateByProfessional,
} = require("../../middlewares/user-time-slots-date");
const USER_TIME_SLOTS_DATE_ROUTES = require("@api_bienestar/models/routes/user-time-slots-date");
const UserTimeSlotsDateController = require("@api_bienestar/controllers/user-time-slots-date");
const express = require("express");
const userTimeSlotsDateRouter = express.Router();

userTimeSlotsDateRouter.post(
  USER_TIME_SLOTS_DATE_ROUTES.GET_ALL_BY_PROFESSIONAL,
  getAllUserTimeSlotsDateByProfessionalValidationRules(),
  validategetAllUserTimeSlotsDateByProfessional,
  UserTimeSlotsDateController.getAllByProfessional
);

module.exports = userTimeSlotsDateRouter;
