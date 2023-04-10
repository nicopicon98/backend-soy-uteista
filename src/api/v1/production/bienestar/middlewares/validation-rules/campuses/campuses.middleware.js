const { body } = require("express-validator");

const getAllCampusesValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un número entero"),
  ];
};

module.exports = {
  getAllCampusesValidationRules,
};
