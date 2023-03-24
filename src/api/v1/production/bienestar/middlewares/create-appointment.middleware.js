const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const createAppointmentValidationRules = () => {
  return [
    body("id_horario")
      .notEmpty()
      .withMessage("El campo id_horario es obligatorio")
      .isInt()
      .withMessage("El campo id_horario debe ser un número entero"),

    body("tomado_por")
      .notEmpty()
      .withMessage("El campo tomado_por es obligatorio")
      .isEmail()
      .withMessage("El campo tomado_por debe ser un correo electrónico válido"),

    body("telefono")
      .notEmpty()
      .withMessage("El campo telefono es obligatorio")
      .isLength({ min: 10, max: 10 })
      .withMessage("El campo telefono debe tener 10 dígitos")
      .isNumeric()
      .withMessage("El campo telefono debe ser un número"),

    body("foto").notEmpty().withMessage("El campo foto es obligatorio"),
  ];
};

const validatecreateAppointment = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status:  406 }, res);
};

module.exports = {
  createAppointmentValidationRules,
  validatecreateAppointment,
};
