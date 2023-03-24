const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const assignLocationByProfessionalValidationRules = () => {
  return [
    body("id_usuario")
      .notEmpty()
      .withMessage("El campo id_usuario es obligatorio")
      .isInt()
      .withMessage("El campo id_usuario debe ser un número entero"),
      body("ubicacion")
      .notEmpty()
      .withMessage("El campo ubicacion es obligatorio")
      .isInt()
      .withMessage("El campo ubicacion debe ser un número entero"),
      body("nombre")
      .notEmpty()
      .withMessage("El campo nombre es obligatorio")
      .isString()
      .withMessage("El campo nombre debe ser un string"),
  ];
};

const validateAssignLocationByProfessional = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status:  406 }, res);
};

module.exports = {
  assignLocationByProfessionalValidationRules,
  validateAssignLocationByProfessional,
};
