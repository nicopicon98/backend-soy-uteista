const express = require("express");
const userTimeSlotsDateRouter = express.Router();

//middlewares
const {
  getAllUserTimeSlotsDateByProfessionalValidationRules,
  insertUserTimeSlotsDateValidationRules,
} = require("../../middlewares/validation-rules/user-time-slots-date");

const validationMiddleware  = require('../../middlewares/validator');

//routes module
const USER_TIME_SLOTS_DATE_ROUTES = require("@api_bienestar/models/routes/user-time-slots-date");

//controllers
const UserTimeSlotsDateController = require("@api_bienestar/controllers/user-time-slots-date");

userTimeSlotsDateRouter.post(
  USER_TIME_SLOTS_DATE_ROUTES.GET_ALL_BY_PROFESSIONAL,
  getAllUserTimeSlotsDateByProfessionalValidationRules(),
  validationMiddleware,
  UserTimeSlotsDateController.getAllByProfessional
);

userTimeSlotsDateRouter.post(
  USER_TIME_SLOTS_DATE_ROUTES.INSERT,
  insertUserTimeSlotsDateValidationRules(),
  validationMiddleware,
  UserTimeSlotsDateController.insert
);

module.exports = userTimeSlotsDateRouter;
