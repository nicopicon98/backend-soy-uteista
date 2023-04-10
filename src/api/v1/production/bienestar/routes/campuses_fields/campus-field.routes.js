const express = require("express");
const campusesFieldsRouter = express.Router();

//middlewares
const {
  getAllByCampusValidationRules,
  insertValidationRules,
  deleteValidationRules,
} = require("../../middlewares/validation-rules/campuses-fields");
const validationMiddleware = require("../../middlewares/validator");

//routes model
const CAMPUS_FIELD_ROUTES_MODEL = require("../../models/routes/campuses-fields");

//controllers
const CampusFieldController = require("../../controllers/campuses-fields");

campusesFieldsRouter.post(
  CAMPUS_FIELD_ROUTES_MODEL.GET_ALL_BY_CAMPUS,
  getAllByCampusValidationRules(),
  validationMiddleware,
  CampusFieldController.getAllByCampus
);

campusesFieldsRouter.post(
  CAMPUS_FIELD_ROUTES_MODEL.INSERT,
  insertValidationRules(),
  validationMiddleware,
  CampusFieldController.insert
);

campusesFieldsRouter.post(
  CAMPUS_FIELD_ROUTES_MODEL.DELETE,
  deleteValidationRules(),
  validationMiddleware,
  CampusFieldController.delete
);

module.exports = campusesFieldsRouter;
