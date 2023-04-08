const express = require("express");
const userTimeSlotsDateRouter = express.Router();

//middlewares
const {
  getAllUserTimeSlotsDateByProfessionalValidationRules,
  validategetAllUserTimeSlotsDateByProfessional,
  insertUserTimeSlotsDateValidationRules,
  validateInsertUserTimeSlotsDate,
} = require("../../middlewares/user-time-slots-date");

//routes module
const USER_TIME_SLOTS_DATE_ROUTES = require("@api_bienestar/models/routes/user-time-slots-date");

//controllers
const UserTimeSlotsDateController = require("@api_bienestar/controllers/user-time-slots-date");


userTimeSlotsDateRouter.post(
  USER_TIME_SLOTS_DATE_ROUTES.GET_ALL_BY_PROFESSIONAL,
  getAllUserTimeSlotsDateByProfessionalValidationRules(),
  validategetAllUserTimeSlotsDateByProfessional,
  UserTimeSlotsDateController.getAllByProfessional
);

userTimeSlotsDateRouter.post(
  USER_TIME_SLOTS_DATE_ROUTES.INSERT,
  insertUserTimeSlotsDateValidationRules(),
  validateInsertUserTimeSlotsDate,
  UserTimeSlotsDateController.insert
);

module.exports = userTimeSlotsDateRouter;
