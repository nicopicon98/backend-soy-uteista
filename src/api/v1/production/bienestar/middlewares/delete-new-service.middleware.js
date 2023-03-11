const { body, validationResult } = require("express-validator");

const deleteNewServiceValidationRules = () => {
  return [
    body("id_area")
      .notEmpty()
      .withMessage("El campo id_area es obligatorio")
      .isInt()
      .withMessage("El campo id_area debe ser un número entero"),
  ];
};

const validateDeleteNewService = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  deleteNewServiceValidationRules,
  validateDeleteNewService,
};
