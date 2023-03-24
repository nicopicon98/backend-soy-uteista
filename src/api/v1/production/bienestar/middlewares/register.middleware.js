const { body, validationResult } = require("express-validator");
const { send } = require("../config/crypto.config");

const registerValidationRules = () => {
  return [
    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 8 })
      .withMessage("El nombre debe tener al menos 8 caracteres"),
    body("correo")
      .notEmpty()
      .withMessage("El correo es obligatorio")
      .isEmail()
      .withMessage("El correo debe ser un correo electrónico válido"),
    body("clave")
      .notEmpty()
      .withMessage("La clave es obligatoria")
      .isLength({ min: 8 })
      .withMessage("La clave debe tener al menos 8 caracteres"),
    body("ubicacion")
      .notEmpty()
      .withMessage("La ubicación es obligatoria")
      .isLength({ min: 5 })
      .withMessage("La ubicación debe tener al menos 5 caracteres"),
    body("id_campus_area")
      .notEmpty()
      .withMessage("El id_campus_area es obligatorio")
      .isInt()
      .withMessage("El id_campus_area debe ser un número entero"),
  ];
};

const validateRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status:  406 }, res);
};

module.exports = {
  registerValidationRules,
  validateRegister,
};
