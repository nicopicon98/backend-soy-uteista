const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const attendDateValidationRules = () => {
  return [
    body("id_cita")
      .notEmpty()
      .withMessage("El campo id_cita es obligatorio")
      .isInt()
      .withMessage("El campo id_cita debe ser un número entero"),
  ];
};

const validateAttendDate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ errors: errors.array() }, res);
};

module.exports = {
  attendDateValidationRules,
  validateAttendDate,
};
