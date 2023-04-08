const express = require("express");
const userRouter = express.Router();

//middlewares
const {
  getAllProfessionalsByCampusFieldValidationRules,
  getAllProfessionalsValidationRules,
} = require("../../middlewares/validation-rules/user");

const validationMiddleware = require("../../middlewares/validator");

//routes module
const USER_ROUTES_MODEL = require("../../models/routes/user");

//controllers
const UserController = require("../../controllers/user");

userRouter.post(
  USER_ROUTES_MODEL.GET_ALL_PROFESSIONALS_BY_CAMPUS_FIELD,
  getAllProfessionalsByCampusFieldValidationRules(),
  validationMiddleware,
  UserController.getAllProfessionalsByCampusField
);

userRouter.post(
  USER_ROUTES_MODEL.GET_ALL_PROFESSIONALS,
  getAllProfessionalsValidationRules(),
  validationMiddleware,
  UserController.getAllProfessionals
);

userRouter.post(
  USER_ROUTES_MODEL.INSERT_PROFESSIONAL,
  (req, res) => res.send("this is working")
);


module.exports = userRouter;
