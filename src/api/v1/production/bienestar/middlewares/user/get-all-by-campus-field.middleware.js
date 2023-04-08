const { body, validationResult } = require("express-validator");
const { send } = require("../../config/crypto.config");

const getAllUsersByCampusFieldValidationRules = () => {
  return [
    body("campus_field_id")
      .notEmpty()
      .withMessage("El campo campus_field_id es obligatorio")
      .isInt()
      .withMessage("El campo campus_field_id debe ser un número entero"),
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
