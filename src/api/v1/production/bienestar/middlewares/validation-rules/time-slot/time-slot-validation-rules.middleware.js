const { body } = require("express-validator");

const getAllTimeSlotsValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un número entero"),
  ];
};

const getTimeSlotsByProfessionalValidationRules = () => {
  return [
    body("id_professional")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un número entero"),
  ];
};

module.exports = {
  getAllTimeSlotsValidationRules,
  getTimeSlotsByProfessionalValidationRules
};
