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

const commonIdUserValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un número entero"),
  ];
};

const insertProfessionalValidationRules = () => {
  return [
    body("name_user")
      .notEmpty()
      .withMessage("El campo name_user es obligatorio")
      .isString()
      .withMessage("El campo name_user debe ser una cadena de caracteres"),
    body("email_user")
      .notEmpty()
      .withMessage("El campo email_user es obligatorio")
      .isEmail()
      .withMessage(
        "El campo email_user debe ser una dirección de correo electrónico válida"
      ),
    body("password_user")
      .notEmpty()
      .withMessage("El campo password_user es obligatorio")
      .isLength({ min: 6 })
      .withMessage("El campo password_user debe tener al menos 6 caracteres"),
    body("location_user")
      .notEmpty()
      .withMessage("El campo location_user es obligatorio")
      .isString()
      .withMessage("El campo location_user debe ser una cadena de caracteres"),
    body("id_campus_field")
      .notEmpty()
      .withMessage("El campo id_campus_field es obligatorio")
      .isInt()
      .withMessage("El campo id_campus_field debe ser un número entero"),
  ];
};

module.exports = {
  getAllProfessionalsByCampusFieldValidationRules,
  insertProfessionalValidationRules,
  commonIdUserValidationRules,
};
