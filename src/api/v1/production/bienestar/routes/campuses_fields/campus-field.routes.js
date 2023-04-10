const express = require("express");
const campusesFieldsRouter = express.Router();

//middlewares
// const {
//   loginValidationRules,
// } = require("../../middlewares/validation-rules/auth");
// const validationMiddleware = require("../../middlewares/validator");
//routes model
const CAMPUS_FIELD_ROUTES_MODEL = require("../../models/routes/campuses-fields");

//controllers
// const CampusFieldController = require("../../controllers/campuses-fields");

campusesFieldsRouter.post(
  CAMPUS_FIELD_ROUTES_MODEL.GET_ALL_BY_CAMPUS,
  (req, res) => res.send("get all by campus is working")
);

campusesFieldsRouter.post(
  CAMPUS_FIELD_ROUTES_MODEL.INSERT,
  (req, res) => res.send("insert it's working")
);

campusesFieldsRouter.post(
  CAMPUS_FIELD_ROUTES_MODEL.DELETE,
  (req, res) => res.send("delete it's working")
);

module.exports = campusesFieldsRouter;
