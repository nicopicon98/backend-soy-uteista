const { body, validationResult } = require("express-validator");

const createScheduleByProfessionalValidationRules = () => {
  return [
    body("id_usuario")
      .notEmpty()
      .withMessage("El campo id_usuario es obligatorio")
      .isInt()
      .withMessage("El campo id_usuario debe ser un número entero"),
    body("schedule")
      .notEmpty()
      .withMessage("El objeto schedule es obligatorio")
      .isObject()
      .withMessage("schedule debe ser un objeto"),
  ];
};

const validateCreateScheduleByProfessional = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  createScheduleByProfessionalValidationRules,
  validateCreateScheduleByProfessional,
};
