const { body, validationResult } = require("express-validator");

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

  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  closeDateByStudentValidationRules,
  validateCloseDateByStudent,
};
