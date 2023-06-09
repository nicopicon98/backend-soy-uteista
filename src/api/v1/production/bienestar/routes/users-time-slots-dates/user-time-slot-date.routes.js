const express = require("express");
const userTimeSlotsDateRouter = express.Router();

//middlewares
const {
  getAllUserTimeSlotsDateByProfessionalValidationRules,
  insertUserTimeSlotsDateValidationRules,
  getAllUpcomingUserTimeSlotsDateByCampusValidationRules
} = require("../../middlewares/validation-rules/users-time-slots-dates");

const validationMiddleware = require("../../middlewares/validator");

//routes module
const USERS_TIME_SLOTS_DATES_ROUTES = require("../../models/routes/users-time-slots-dates");

//controllers
const UserTimeSlotsDateController = require("../../controllers/users-time-slots-date");

userTimeSlotsDateRouter.post(
  USERS_TIME_SLOTS_DATES_ROUTES.GET_ALL_BY_PROFESSIONAL,
  getAllUserTimeSlotsDateByProfessionalValidationRules(),
  validationMiddleware,
  UserTimeSlotsDateController.getAllByProfessional
);

userTimeSlotsDateRouter.post(
  USERS_TIME_SLOTS_DATES_ROUTES.INSERT,
  insertUserTimeSlotsDateValidationRules(),
  validationMiddleware,
  UserTimeSlotsDateController.insert
);

userTimeSlotsDateRouter.post(
  USERS_TIME_SLOTS_DATES_ROUTES.GET_ALL_UPCOMING_BY_CAMPUS,
  getAllUpcomingUserTimeSlotsDateByCampusValidationRules(),
  validationMiddleware,
  UserTimeSlotsDateController.getUpcomingByCampus
);

userTimeSlotsDateRouter.post(
  USERS_TIME_SLOTS_DATES_ROUTES.DELETE,
  UserTimeSlotsDateController.delete
);

module.exports = userTimeSlotsDateRouter;
