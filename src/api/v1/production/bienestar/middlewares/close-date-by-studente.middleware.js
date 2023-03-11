const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const closeDateByStudentValidationRules = () => {
  return [
    body("tomado_por")
      .notEmpty()
      .withMessage("El campo tomado_por es obligatorio")
      .isEmail()
      .withMessage("El campo tomado_por debe ser un correo electrónico válido"),
  ];
};

const validateCloseDateByStudent = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ errors: errors.array() }, res);
};

module.exports = {
  closeDateByStudentValidationRules,
  validateCloseDateByStudent,
};
