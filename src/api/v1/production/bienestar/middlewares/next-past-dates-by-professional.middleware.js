const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const nextPastDatesByProfessionalValidationRules = () => {
  return [
    body("id_usuario")
      .notEmpty()
      .withMessage("El campo id_usuario es obligatorio")
      .isInt()
      .withMessage("El campo id_usuario debe ser un número entero"),
  ];
};

const validateNextPastDatesByProfessional = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status:  406 }, res);
};

module.exports = {
  nextPastDatesByProfessionalValidationRules,
  validateNextPastDatesByProfessional,
};
