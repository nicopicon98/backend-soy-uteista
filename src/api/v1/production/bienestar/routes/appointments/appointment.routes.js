const express = require("express");
const appointmentsRouter = express.Router();

//middlewares
// const {
//   loginValidationRules,
// } = require("../../middlewares/validation-rules/auth");
// const validationMiddleware = require("../../middlewares/validator");
//routes model
const APPOINTMENT_ROUTES_MODEL = require("../../models/routes/appointments");

//controllers
const AppointmentController = require("../../controllers/appointments");

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_UPCOMING_BY_PROFESSIONAL,
  AppointmentController.getUpcomingAppointmentByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_LAST_BY_PROFESSIONAL,
  AppointmentController.getLastAppointmentByProfessional
);

module.exports = appointmentsRouter;
