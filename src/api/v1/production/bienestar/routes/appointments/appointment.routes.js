const express = require("express");
const appointmentsRouter = express.Router();

//middlewares
const {
  getUpcomingByProfessionalValidationRules,
  getAllUpcomingByProfessionalValidationRules,
  getLastByProfessionalValidationRules,
  getAllLastMonthToNowByProfessionalValidationRules,
  getAllLastByProfessionalValidationRules,
  insertValidationRules,
  updateAttendedValidationRules,
  updateRejectedValidationRules,
} = require("../../middlewares/validation-rules/appointments");
const validationMiddleware = require("../../middlewares/validator");

//routes model
const APPOINTMENT_ROUTES_MODEL = require("../../models/routes/appointments");

//controllers
const AppointmentController = require("../../controllers/appointments");

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_UPCOMING_BY_PROFESSIONAL,
  getUpcomingByProfessionalValidationRules(),
  validationMiddleware,
  AppointmentController.getUpcomingByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_ALL_UPCOMING_BY_PROFESSIONAL,
  getAllUpcomingByProfessionalValidationRules(),
  validationMiddleware,
  AppointmentController.getAllUpcomingByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_LAST_BY_PROFESSIONAL,
  getLastByProfessionalValidationRules(),
  validationMiddleware,
  AppointmentController.getLastByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_ALL_LAST_MONTH_TO_NOW_BY_PROFESSIONAL,
  getAllLastMonthToNowByProfessionalValidationRules(),
  validationMiddleware,
  AppointmentController.getAllLastMonthToNowByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.GET_ALL_LAST_BY_PROFESSIONAL,
  getAllLastByProfessionalValidationRules(),
  validationMiddleware,
  AppointmentController.getAllLastByProfessional
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.INSERT,
  insertValidationRules(),
  validationMiddleware,
  AppointmentController.insert
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.UPDATE_ATTENTED,
  updateAttendedValidationRules(),
  validationMiddleware,
  AppointmentController.updateAttended
);

appointmentsRouter.post(
  APPOINTMENT_ROUTES_MODEL.UPDATE_REJECTED,
  updateRejectedValidationRules(),
  validationMiddleware,
  AppointmentController.updateRejected
);

module.exports = appointmentsRouter;
