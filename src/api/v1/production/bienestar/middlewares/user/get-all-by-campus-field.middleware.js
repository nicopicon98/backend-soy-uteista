const { body, validationResult } = require("express-validator");
const { send } = require("../../config/crypto.config");

const getAllUsersByCampusFieldValidationRules = () => {
  return [
    body("campus_field")
      .notEmpty()
      .withMessage("El campo campus_field es obligatorio")
      .isInt()
      .withMessage("El campo campus_field debe ser un número entero"),
  ];
};

const validateGetAllUsersByCampusField = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = {
  getAllUsersByCampusFieldValidationRules,
  validateGetAllUsersByCampusField,
};
