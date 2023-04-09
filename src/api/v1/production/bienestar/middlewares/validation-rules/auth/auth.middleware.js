const { body } = require("express-validator");

const loginValidationRules = () => {
  return [
    body("email_user")
      .notEmpty()
      .withMessage("El campo email_user es obligatorio")
      .isEmail()
      .withMessage("El campo email_user debe ser un correo electrónico válido"),
  ];
};

module.exports = {
  loginValidationRules,
};
