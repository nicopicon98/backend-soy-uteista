const { body } = require("express-validator");

const exampleValidationRules = () => {
  return [
    body("email_user")
      .notEmpty()
      .withMessage("El campo email_user es obligatorio")
      .isEmail()
      .withMessage("El campo email_user debe ser un correo electrónico válido"),
    body("password_user")
      .notEmpty()
      .withMessage("El campo password_user es obligatorio")
  ];
};

module.exports = {
  loginValidationRules,
};
