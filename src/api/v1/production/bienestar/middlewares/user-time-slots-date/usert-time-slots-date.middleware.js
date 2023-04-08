const { body, validationResult } = require("express-validator");
const { send } = require("../../config/crypto.config");

const getAllUserTimeSlotsDateByProfessionalValidationRules = () => {
  return [
    body("professional_id")
      .notEmpty()
      .withMessage("El campo professional_id es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_area debe ser un número entero"),
  ];
};

const validategetAllUserTimeSlotsDateByProfessional = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = {
  getAllUserTimeSlotsDateByProfessionalValidationRules,
  validategetAllUserTimeSlotsDateByProfessional,
};
