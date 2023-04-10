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
  AppointmentController.getUpcomingByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_LAST_BY_PROFESSIONAL,
  AppointmentController.getLastByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_ALL_UPCOMING_BY_PROFESSIONAL,
  AppointmentController.getAllUpcomingByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_ALL_LAST_BY_PROFESSIONAL,
  AppointmentController.getAllLastByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_ALL_LAST_MONTH_TO_NOW_BY_PROFESSIONAL,
  AppointmentController.getAllLastMonthToNowByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.INSERT,
  AppointmentController.insert
);

module.exports = appointmentsRouter;

