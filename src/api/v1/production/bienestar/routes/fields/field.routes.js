const express = require("express");
const fieldRouter = express.Router();

//middlewares
// const {
//   validateGetSedes,
//   getSedesValidationRules,
// } = require("@api_bienestar/middlewares/get-sedes.middleware");
const validationMiddleware = require("../../middlewares/validator");

const FIELD_ROUTES_MODEL = require("../../models/routes/fields");

const FieldController = require("../../controllers/fields");


fieldRouter.post(
  FIELD_ROUTES_MODEL.GET_ALL,
  FieldController.getAll
);

fieldRouter.post(
  FIELD_ROUTES_MODEL.GET_ALL_NOT_IN_CAMPUS,
  FieldController.getAllNotInCampus
);

fieldRouter.post(
  FIELD_ROUTES_MODEL.INSERT,
  FieldController.insert
);

fieldRouter.post(
  FIELD_ROUTES_MODEL.DELETE,
  FieldController.delete
);

module.exports = fieldRouter;
