const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const getProfessionalBySedeValidationRules = () => {
  return [
    body("id_campus_area")
      .notEmpty()
      .withMessage("El campo id_usuario es obligatorio")
      .isString()
      .withMessage("El campo nombre_campus debe ser un string"),
  ];
};

const validateGetProfessionalBySede = (req, res, next) => {
  console.log(req.body)
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status:  406 }, res);
};

module.exports = {
  getProfessionalBySedeValidationRules,
  validateGetProfessionalBySede,
};
