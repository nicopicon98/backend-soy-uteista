const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const loginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Información errónea")
      .isEmail()
      .withMessage("Información errónea"),
    body("password")
      .notEmpty()
      .withMessage("Información errónea")
      .isLength({ min: 8 })
      .withMessage("Información errónea"),
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
