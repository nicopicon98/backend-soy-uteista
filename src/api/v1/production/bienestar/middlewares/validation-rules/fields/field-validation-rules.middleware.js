const { body } = require("express-validator");

const getAllFieldsValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un número entero"),
  ];
};

const getAllNotInCampusValidationRules = () => {
  return [
    body("id_campus")
      .notEmpty()
      .withMessage("El campo id_campus es obligatorio")
      .isInt()
      .withMessage("El campo id_campus debe ser un número entero"),
  ];
};

const insertFieldValidationRules = () => {
  return [
    body("name_field")
      .notEmpty()
      .withMessage("El campo name_field es obligatorio")
      .isLength({ min: 1, max: 255 })
      .withMessage("El campo name_field debe tener entre 1 y 255 caracteres"),
  ];
};

const deleteFieldValidationRules = () => {
  return [
    body("id_field")
      .notEmpty()
      .withMessage("El campo id_field es obligatorio")
      .isInt()
      .withMessage("El campo id_field debe ser un número entero"),
  ];
};

module.exports = {
  getAllFieldsValidationRules,
  insertFieldValidationRules,
  deleteFieldValidationRules,
  getAllNotInCampusValidationRules,
};
