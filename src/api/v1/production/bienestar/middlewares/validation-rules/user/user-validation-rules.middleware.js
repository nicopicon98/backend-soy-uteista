const { body } = require("express-validator");

const getAllProfessionalsByCampusFieldValidationRules = () => {
  return [
    body("id_campus_field")
      .notEmpty()
      .withMessage("El campo id_campus_field es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_field debe ser un número entero"),
  ];
};

const getAllProfessionalsValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un número entero"),
  ];
};

module.exports = {
  getAllProfessionalsByCampusFieldValidationRules,
  getAllProfessionalsValidationRules,
};
