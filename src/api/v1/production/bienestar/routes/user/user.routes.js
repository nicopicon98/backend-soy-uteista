const express = require("express");
const userRouter = express.Router();

//middlewares
// const {} = require("../../middlewares/user-time-slots-date");

//routes module
const USER_ROUTES_MODEL = require("../../models/routes/user");

//controllers
const UserController = require("../../controllers/user");

//example
// userRouter.post(
//   USER_TIME_SLOTS_DATE_ROUTES.GET_ALL_BY_PROFESSIONAL,
//   getAllUserTimeSlotsDateByProfessionalValidationRules(),
//   validategetAllUserTimeSlotsDateByProfessional,
//   UserTimeSlotsDateController.getAllByProfessional
// );

userRouter.post(
  USER_ROUTES_MODEL.GET_ALL_PROFESSIONALS_BY_CAMPUS_FIELD,
  UserController.getAllByCampusField
);

module.exports = userRouter;
