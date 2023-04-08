const express = require("express");
const userRouter = express.Router();

//middlewares
const {
  getAllUsersByCampusFieldValidationRules,
  validateGetAllUsersByCampusField,
} = require("../../middlewares/user");

//routes module
const USER_ROUTES_MODEL = require("../../models/routes/user");

//controllers
const UserController = require("../../controllers/user");

userRouter.post(
  USER_ROUTES_MODEL.GET_ALL_PROFESSIONALS_BY_CAMPUS_FIELD,
  getAllUsersByCampusFieldValidationRules(),
  validateGetAllUsersByCampusField,
  UserController.getAllByCampusField
);

module.exports = userRouter;
