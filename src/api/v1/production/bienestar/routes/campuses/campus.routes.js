const express = require("express");
const campusRouter = express.Router();

// middlewares
// const {
//   getAllCampusesValidationRules,
// } = require("../../middlewares/validation-rules/campuses");
const validationMiddleware = require("../../middlewares/validator");

// routes
const CAMPUS_ROUTES_MODEL = require("../../models/routes/campuses");

// controller
// const CampusController = require("../../controllers/campuses");

// campusRouter.post(
//   FIELD_ROUTES_MODEL.GET_ALL,
//   getAllFieldsValidationRules(),
//   validationMiddleware,
//   CampusController.getAll
// );

campusRouter.post(
  CAMPUS_ROUTES_MODEL.CAMPUS_ROUTES_MODEL,
  (req, res) => res.send("it's working from campus")
)

module.exports = campusRouter;