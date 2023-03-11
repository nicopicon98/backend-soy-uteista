const express = require("express");
const bienestar = express.Router();
const {
  login,
  register,
  rejectDate,
  getServices,
  assignLocation,
  deleteNewService,
  createNewService,
  closeDateByStudent,
  lastDateByProfessional,
  closeDateByProfessional,
  getScheduleByProfessional,
  nextPastDatesByProfessional,
  createScheduleByProfessional,
} = require("./bienestar.service");
const { 
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
} = require("./middlewares");

bienestar.use((req, res, next) => {
  next();
});

bienestar.post("/login", loginValidationRules(), validateLogin, login);
bienestar.post("/register", registerValidationRules(), validateRegister, register);
bienestar.post("/reject-date", rejectDateValidationRules(), validateRejectDate, rejectDate);
bienestar.post("/get-services", getServices);
bienestar.post("/delete-new-service", deleteNewServiceValidationRules(), validateDeleteNewService, deleteNewService);
bienestar.post("/create-new-service", createNewServiceValidationRules(), validateCreateNewService, createNewService);
bienestar.post("/close-date-by-student", closeDateByStudentValidationRules(), validateCloseDateByStudent, closeDateByStudent);
bienestar.post("/assign-location-by-professional", assignLocationByProfessionalValidationRules(), validateAssignLocationByProfessional, assignLocation);
bienestar.post("/last-date-by-professional", lastDateByProfessionalValidationRules(), validateLastDateByProfessional, lastDateByProfessional);
bienestar.post("/close-date-by-professional", closeDateByProfessionalValidationRules(), validateCloseDateByProfessional, closeDateByProfessional);
bienestar.post("/get-schedule-by-professional", getScheduleByProfessionalValidationRules(), validateGetScheduleByProfessional, getScheduleByProfessional);
bienestar.post("/next-past-dates-by-professional", nextPastDatesByProfessionalValidationRules(), validateNextPastDatesByProfessional, nextPastDatesByProfessional);
bienestar.post("/create-schedule-by-professional", createScheduleByProfessionalValidationRules(), validateCreateScheduleByProfessional, createScheduleByProfessional);

module.exports = {
  bienestar,
};
