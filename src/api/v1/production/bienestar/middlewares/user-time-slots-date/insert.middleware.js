const { body, validationResult } = require("express-validator");
const { send } = require("../../config/crypto.config");

const insertUserTimeSlotsDateValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo professional_id es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_area debe ser un número entero"),
    body("user_time_slots_date.startDate")
      .notEmpty()
      .withMessage("El campo startDate es obligatorio")
      .isISO8601()
      .withMessage("El campo startDate debe ser una fecha válida en formato ISO 8601"),
    body("user_time_slots_date.endDate")
      .notEmpty()
      .withMessage("El campo endDate es obligatorio")
      .isISO8601()
      .withMessage("El campo endDate debe ser una fecha válida en formato ISO 8601"),
    body("user_time_slots_date.time_slots")
      .isArray({ min: 1 })
      .withMessage("El campo time_slots debe ser un array no vacío"),
    body("user_time_slots_date.time_slots.*")
      .isInt()
      .withMessage("Cada elemento del array time_slots debe ser un número entero"),
  ];
};

const validateInsertUserTimeSlotsDate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = {
  insertUserTimeSlotsDateValidationRules,
  validateInsertUserTimeSlotsDate,
};
