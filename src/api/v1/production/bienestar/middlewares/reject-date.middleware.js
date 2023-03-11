const { body, validationResult } = require("express-validator");

const rejectDateValidationRules = () => {
  return [
    body("razon_rechazo")
      .notEmpty()
      .withMessage("La razón de rechazo es obligatoria")
      .isLength({ min: 10 })
      .withMessage("La razón de rechazo debe tener al menos 10 caracteres"),
    body("rechazado_por")
      .notEmpty()
      .withMessage("El campo rechazado_por es obligatorio")
      .isString()
      .withMessage("El campo rechazado_por debe ser una cadena de caracteres"),
    body("id_cita")
      .notEmpty()
      .withMessage("El campo id_cita es obligatorio")
      .isInt()
      .withMessage("El campo id_cita debe ser un número entero"),
    body("rechazado_correo")
      .notEmpty()
      .withMessage("El campo rechazado_correo es obligatorio")
      .isString()
      .withMessage(
        "El campo rechazado_correo debe ser una cadena de caracteres"
      ),
  ];
};

const validateRejectDate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  rejectDateValidationRules,
  validateRejectDate,
};
