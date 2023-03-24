const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const appointmentsByIdCampusAreaValidationRules = () => {
  return [
    body("tomado_por")
      .notEmpty()
      .withMessage("El campo tomado_por es obligatorio")
      .isEmail()
      .withMessage("El campo tomado_por debe ser un correo electrónico válido"),
      body("id_campus_area")
      .notEmpty()
      .withMessage("El campo id_campus_area es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_area debe ser un número entero"),
  ];
};

const validateAppointmentsByIdCampusArea = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = {
  appointmentsByIdCampusAreaValidationRules,
  validateAppointmentsByIdCampusArea,
};
