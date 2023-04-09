const express = require("express");
const userRouter = express.Router();

//middlewares
const {
  getAllProfessionalsByCampusFieldValidationRules,
  insertProfessionalValidationRules,
  commonIdUserValidationRules,
} = require("../../middlewares/validation-rules/users");

const validationMiddleware = require("../../middlewares/validator");

//routes
const USER_ROUTES_MODEL = require("../../models/routes/users");

//controllers
const UserController = require("../../controllers/users");

userRouter.post(
  USER_ROUTES_MODEL.GET_ALL_PROFESSIONALS_BY_CAMPUS_FIELD,
  getAllProfessionalsByCampusFieldValidationRules(),
  validationMiddleware,
  UserController.getAllProfessionalsByCampusField
);

userRouter.post(
  USER_ROUTES_MODEL.GET_ALL_PROFESSIONALS,
  commonIdUserValidationRules(),
  validationMiddleware,
  UserController.getAllProfessionals
);

userRouter.post(
  USER_ROUTES_MODEL.INSERT_PROFESSIONAL,
  insertProfessionalValidationRules(),
  validationMiddleware,
  UserController.insertProfessional
);

userRouter.post(
  USER_ROUTES_MODEL.UPDATE_USER,
  commonIdUserValidationRules(),
  validationMiddleware,
  UserController.updateUser
);

userRouter.post(
  USER_ROUTES_MODEL.DELETE_USER,
  commonIdUserValidationRules(),
  validationMiddleware,
  UserController.deleteUser
);

module.exports = userRouter;
