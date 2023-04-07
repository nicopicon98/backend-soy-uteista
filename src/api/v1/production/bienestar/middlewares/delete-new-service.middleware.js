const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const deleteNewServiceValidationRules = () => {
  return [
    body("id_area")
      .notEmpty()
      .withMessage("El campo id_area es obligatorio")
      .isInt()
      .withMessage("El campo id_area debe ser un número entero"),
  ];
};

const validateDeleteNewService = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = {
  deleteNewServiceValidationRules,
  validateDeleteNewService,
};
