const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

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
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = {
  createScheduleByProfessionalValidationRules,
  validateCreateScheduleByProfessional,
};
