const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const getProfessionalBySedeValidationRules = () => {
  return [
    body("id_campus_area")
      .notEmpty()
      .withMessage("El campo id_campus_area es obligatorio")
      .isString()
      .withMessage("El campo id_campus_area debe ser un string"),
  ];
};

const validateGetProfessionalBySede = (req, res, next) => {
  console.log(typeof req.body.id_campus_area);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = {
  getProfessionalBySedeValidationRules,
  validateGetProfessionalBySede,
};
