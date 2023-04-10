const express = require("express");
const campusRouter = express.Router();

// middlewares
const {
  getAllCampusesValidationRules,
} = require("../../middlewares/validation-rules/campuses");
const validationMiddleware = require("../../middlewares/validator");

// routes
const CAMPUS_ROUTES_MODEL = require("../../models/routes/campuses");

// controller
const CampusController = require("../../controllers/campuses");

campusRouter.post(
  CAMPUS_ROUTES_MODEL.GET_ALL,
  getAllCampusesValidationRules(),
  validationMiddleware,
  CampusController.getAll
);

module.exports = campusRouter;
