const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const createNewServiceValidationRules = () => {
  return [
    body("nombre")
      .notEmpty()
      .withMessage("El campo nombre es obligatorio")
      .isString()
      .withMessage("El campo nombre debe ser una cadena de caracteres"),
  ];
};

const validateCreateNewService = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ errors: errors.array() }, res);
};

module.exports = {
  createNewServiceValidationRules,
  validateCreateNewService,
};
