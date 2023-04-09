const express = require("express");
const authRouter = express.Router();

//middlewares
const {
  loginValidationRules,
} = require("../../middlewares/validation-rules/auth");
const validationMiddleware = require("../../middlewares/validator");
//routes model
const AUTH_ROUTES_MODEL = require("../../models/routes/auth");

//controllers
const AuthController = require("../../controllers/auth");

authRouter.post(
  AUTH_ROUTES_MODEL.LOGIN,
  loginValidationRules(),
  validationMiddleware,
  AuthController.login
);

module.exports = authRouter;
