const { body, validationResult } = require("express-validator");

const lastDateByProfessionalValidationRules = () => {
  return [
    body("id_usuario")
      .notEmpty()
      .withMessage("El campo id_usuario es obligatorio")
      .isInt()
      .withMessage("El campo id_usuario debe ser un número entero"),
  ];
};

const validateLastDateByProfessional = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  lastDateByProfessionalValidationRules,
  validateLastDateByProfessional,
};
