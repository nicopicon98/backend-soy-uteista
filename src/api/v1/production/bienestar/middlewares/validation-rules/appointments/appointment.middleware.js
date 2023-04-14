const { body } = require("express-validator");

const getUpcomingByProfessionalValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un entero"),
  ];
};

const getAllUpcomingByProfessionalValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un entero"),
  ];
};

const getLastByProfessionalValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un entero"),
  ];
};

const getAllLastMonthToNowByProfessionalValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un entero"),
  ];
};

const getAllLastByProfessionalValidationRules = () => {
  return [
    body("id_user")
      .notEmpty()
      .withMessage("El campo id_user es obligatorio")
      .isInt()
      .withMessage("El campo id_user debe ser un entero"),
  ];
};

const insertValidationRules = () => {
  return [
    body("booked_by")
      .notEmpty()
      .withMessage("El campo booked_by es obligatorio"),
    body("phone_student")
      .notEmpty()
      .withMessage("El campo phone_student es obligatorio")
      .isString()
      .withMessage("El campo phone_student debe ser una cadena de caracteres"),
    body("photo_student")
      .notEmpty()
      .withMessage("El campo photo_student es obligatorio")
      .isString()
      .withMessage("El campo photo_student debe ser una cadena de caracteres"),
    body("name_student")
      .notEmpty()
      .withMessage("El campo name_student es obligatorio")
      .isString()
      .withMessage("El campo name_student debe ser una cadena de caracteres"),
    body("id_user_time_slot_date")
      .notEmpty()
      .withMessage("El campo id_user_time_slot_date es obligatorio")
      .isInt()
      .withMessage("El campo id_user_time_slot_date debe ser un entero"),
  ];
};

const updateAttendedValidationRules = () => {
  return [
    body("id_appointment")
      .notEmpty()
      .withMessage("El campo id_appointment es obligatorio")
      .isInt()
      .withMessage("El campo id_appointment debe ser un entero"),
    body("attended")
      .notEmpty()
      .withMessage("El campo attended es obligatorio")
      .isBoolean()
      .withMessage("El campo attended debe ser un valor booleano"),
  ];
};

const updateRejectedValidationRules = () => {
  return [
    body("id_appointment")
      .notEmpty()
      .withMessage("El campo id_appointment es obligatorio")
      .isInt()
      .withMessage("El campo id_appointment debe ser un entero"),
    body("rejected_by")
      .notEmpty()
      .withMessage("El campo rejected_by es obligatorio")
      .isInt()
      .withMessage("El campo rejected_by debe ser un entero"),
    body("rejected_reason")
      .notEmpty()
      .withMessage("El campo rejected_reason es obligatorio")
      .isLength({ max: 250 })
      .withMessage(
        "El campo rejected_reason debe tener una longitud máxima de 250 caracteres"
      ),
  ];
};

module.exports = {
  getUpcomingByProfessionalValidationRules,
  getAllUpcomingByProfessionalValidationRules,
  getLastByProfessionalValidationRules,
  getAllLastMonthToNowByProfessionalValidationRules,
  getAllLastByProfessionalValidationRules,
  insertValidationRules,
  updateAttendedValidationRules,
  updateRejectedValidationRules,
};
