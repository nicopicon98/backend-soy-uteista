const { body } = require("express-validator");

const getAllUserTimeSlotsDateByProfessionalValidationRules = () => {
  return [
    body("id_professional")
      .notEmpty()
      .withMessage("El campo id_professional es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_area debe ser un número entero"),
  ];
};

const insertUserTimeSlotsDateValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_area debe ser un número entero"),
    body("users_time_slots_dates.startDate")
      .notEmpty()
      .withMessage("El campo startDate es obligatorio")
      .isISO8601()
      .withMessage(
        "El campo startDate debe ser una fecha válida en formato ISO 8601"
      ),
    body("users_time_slots_dates.endDate")
      .notEmpty()
      .withMessage("El campo endDate es obligatorio")
      .isISO8601()
      .withMessage(
        "El campo endDate debe ser una fecha válida en formato ISO 8601"
      ),
    body("users_time_slots_dates.time_slots")
      .isArray({ min: 1 })
      .withMessage("El campo time_slots debe ser un array no vacío"),
    body("users_time_slots_dates.time_slots.*")
      .isInt()
      .withMessage(
        "Cada elemento del array time_slots debe ser un número entero"
      ),
  ];
};

module.exports = {
  insertUserTimeSlotsDateValidationRules,
  getAllUserTimeSlotsDateByProfessionalValidationRules,
};
