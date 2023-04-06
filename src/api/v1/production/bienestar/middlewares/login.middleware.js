const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");
const { loginModelErrors } = require("../models/errors/login.model");

const loginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage(loginModelErrors.WRONG_INFO)
      .isEmail()
      .withMessage(loginModelErrors.WRONG_INFO),
    body("password")
      .notEmpty()
      .withMessage(loginModelErrors.WRONG_INFO)
      .isLength({ min: 8 })
      .withMessage(loginModelErrors.WRONG_INFO),
  ];
};

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status:  406 }, res);
};

module.exports = {
  loginValidationRules,
  validateLogin,
};
