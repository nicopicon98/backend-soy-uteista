const { body } = require("express-validator");

const getAllByCampusValidationRules = () => {
  return [
    body("id_campus")
      .notEmpty()
      .withMessage("El campo id_campus es obligatorio")
      .isInt()
      .withMessage("El campo id_campus debe ser un número entero válido"),
  ];
};

const insertValidationRules = () => {
  return [
    body("id_campus")
      .notEmpty()
      .withMessage("El campo id_campus es obligatorio")
      .isInt()
      .withMessage("El campo id_campus debe ser un número entero válido"),
    body("id_field")
      .notEmpty()
      .withMessage("El campo id_field es obligatorio")
      .isInt()
      .withMessage("El campo id_field debe ser un número entero válido"),
  ];
};

const deleteValidationRules = () => {
  return [
    body("id_campus_field")
      .notEmpty()
      .withMessage("El campo id_campus_field es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_field debe ser un número entero válido"),
  ];
};

module.exports = {
  getAllByCampusValidationRules,
  insertValidationRules,
  deleteValidationRules,
};
