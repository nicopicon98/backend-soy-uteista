// const {
//   validateGetSedes,
//   getSedesValidationRules,
// } = require("@api_bienestar/middlewares/get-sedes.middleware");
const USER_TIME_SLOTS_DATE_ROUTES = require("../../models/routes/user-time-slots-date");
const UserTimeSlotsDateController = require("../../controllers/user-time-slots-date");
const express = require("express");
const userTimeSlotsDateRouter = express.Router();


userTimeSlotsDateRouter.post(
  USER_TIME_SLOTS_DATE_ROUTES.GET_ALL_BY_PROFESSIONAL,
  UserTimeSlotsDateController.getAllByProfessional
);

module.exports = userTimeSlotsDateRouter;
