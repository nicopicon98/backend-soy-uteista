const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const getProfessionalBySedeValidationRules = () => {
  return [
    body("nombre_campus")
      .notEmpty()
      .withMessage("El campo id_usuario es obligatorio")
      .isString()
      .withMessage("El campo nombre_campus debe ser un string"),
  ];
};

const validateGetProfessionalBySede = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ errors: errors.array() }, res);
};

module.exports = {
  getProfessionalBySedeValidationRules,
  validateGetProfessionalBySede,
};
