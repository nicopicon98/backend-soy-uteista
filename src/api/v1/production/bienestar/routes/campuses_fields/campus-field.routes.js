const express = require("express");
const campusesFieldsRouter = express.Router();

//middlewares
// const {
//   loginValidationRules,
// } = require("../../middlewares/validation-rules/auth");
// const validationMiddleware = require("../../middlewares/validator");
//routes model
// const APPOINTMENT_ROUTES_MODEL = require("../../models/routes/appointments");

//controllers
// const AppointmentController = require("../../controllers/appointments");

campusesFieldsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_UPCOMING_BY_PROFESSIONAL,
  AppointmentController.login
);

module.exports = campusesFieldsRouter;
