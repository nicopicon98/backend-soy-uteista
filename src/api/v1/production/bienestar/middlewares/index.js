const { loginValidationRules, validateLogin } = require("./login.middleware");
const { registerValidationRules, validateRegister } = require("./register.middleware");
const { rejectDateValidationRules, validateRejectDate } = require("./reject-date.middleware");
const { deleteNewServiceValidationRules, validateDeleteNewService } = require("./delete-new-service.middleware");
const { createNewServiceValidationRules, validateCreateNewService } = require("./create-new-service.middleware");
const { closeDateByStudentValidationRules, validateCloseDateByStudent } = require("./close-date-by-studente.middleware");
const { lastDateByProfessionalValidationRules, validateLastDateByProfessional } = require("./last-date-by-professional.middleware");
const { closeDateByProfessionalValidationRules, validateCloseDateByProfessional } = require("./close-date-by-professional.middleware");
const { getScheduleByProfessionalValidationRules, validateGetScheduleByProfessional } = require("./get-schedule-by-professionar.middleware");
const { assignLocationByProfessionalValidationRules, validateAssignLocationByProfessional } = require("./assign-location-by-professional.middleware");
const { createScheduleByProfessionalValidationRules, validateCreateScheduleByProfessional } = require("./create-schedule-by-professional.middleware");
const { nextPastDatesByProfessionalValidationRules, validateNextPastDatesByProfessional } = require("./next-past-dates-by-professional.middleware");


module.exports = {
    validateLogin,
    validateRegister,
    validateRejectDate,
    loginValidationRules,
    registerValidationRules,
    validateCreateNewService,
    validateDeleteNewService,
    rejectDateValidationRules,
    validateCloseDateByStudent,
    validateLastDateByProfessional,
    createNewServiceValidationRules,
    validateCloseDateByProfessional,
    deleteNewServiceValidationRules,
    closeDateByStudentValidationRules,
    validateGetScheduleByProfessional,
    validateNextPastDatesByProfessional,
    validateAssignLocationByProfessional,
    validateCreateScheduleByProfessional,
    lastDateByProfessionalValidationRules,
    closeDateByProfessionalValidationRules,
    getScheduleByProfessionalValidationRules,
    assignLocationByProfessionalValidationRules,
    createScheduleByProfessionalValidationRules,
    nextPastDatesByProfessionalValidationRules,
}