const { body } = require("express-validator");

const getAllProfessionalsByCampusFieldValidationRules = () => {
  return [
    body("campus_field_id")
      .notEmpty()
      .withMessage("El campo campus_field_id es obligatorio")
      .isInt()
      .withMessage("El campo campus_field_id debe ser un número entero"),
  ];
};

const getAllProfessionalsValidationRules = () => {
  return [
    body("user_id")
      .notEmpty()
      .withMessage("El campo user_id es obligatorio")
      .isInt()
      .withMessage("El campo user_id debe ser un número entero"),
  ];
};

module.exports = {
  getAllProfessionalsByCampusFieldValidationRules,
  getAllProfessionalsValidationRules,
};
