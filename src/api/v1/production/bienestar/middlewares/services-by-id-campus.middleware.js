const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const servicesByIdCampusValidationRules = () => {
  return [
    body("id_campus")
      .notEmpty()
      .withMessage("El campo id_campus es obligatorio")
      .isInt()
      .withMessage("El campo id_campus debe ser un número entero"),
  ];
};

const validateservicesByIdCampus = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status:  406 }, res);
};

module.exports = {
    servicesByIdCampusValidationRules,
    validateservicesByIdCampus,
};
