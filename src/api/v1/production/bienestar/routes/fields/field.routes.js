const express = require("express");
const fieldRouter = express.Router();

// middlewares
const {
  getAllFieldsValidationRules,
  getAllNotInCampusValidationRules,
  insertFieldValidationRules,
  deleteFieldValidationRules,
} = require("../../middlewares/validation-rules/fields");
const validationMiddleware = require("../../middlewares/validator");

// routes
const FIELD_ROUTES_MODEL = require("../../models/routes/fields");

// controller
const FieldController = require("../../controllers/fields");

fieldRouter.post(
  FIELD_ROUTES_MODEL.GET_ALL,
  getAllFieldsValidationRules(),
  validationMiddleware,
  FieldController.getAll
);

fieldRouter.post(
  FIELD_ROUTES_MODEL.GET_ALL_NOT_IN_CAMPUS,
  getAllNotInCampusValidationRules(),
  validationMiddleware,
  FieldController.getAllNotInCampus
);

fieldRouter.post(
  FIELD_ROUTES_MODEL.INSERT,
  insertFieldValidationRules(),
  validationMiddleware,
  FieldController.insert
);

fieldRouter.post(
  FIELD_ROUTES_MODEL.DELETE,
  deleteFieldValidationRules(),
  validationMiddleware,
  FieldController.delete
);

module.exports = fieldRouter;
