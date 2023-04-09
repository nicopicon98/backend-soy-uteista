const express = require("express");
const userRouter = express.Router();

//middlewares
const {
  getAllProfessionalsByCampusFieldValidationRules,
  getAllProfessionalsValidationRules,
  insertProfessionalValidationRules,
  updateUserValidationRules,
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
  insertProfessionalValidationRules(),
  validationMiddleware,
  UserController.insertProfessional
);

userRouter.post(
  USER_ROUTES_MODEL.UPDATE_USER,
  updateUserValidationRules(),
  validationMiddleware,
  UserController.updateUser
);

userRouter.post(
  USER_ROUTES_MODEL.DELETE_USER,
  UserController.deleteUser
);

module.exports = userRouter;
