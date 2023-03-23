const express = require("express");
const bienestar = express.Router();
const {
  sedes,
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
  deco,
  generatePDF,
  getProfessionalBySede,
  getFranjasByProfessional,
  getFranjas,
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
const { attendDateValidationRules, validateAttendDate } = require("./middlewares/attend-date.middleware");
const { getProfessionalBySedeValidationRules, validateGetProfessionalBySede } = require("./middlewares/get-professional-by-sede.middleware");
const { getSedesValidationRules, validateGetSedes } = require("./middlewares/get-sedes.middleware");

bienestar.use((req, res, next) => {
  next();
});

//Primera parte de la API

bienestar.post("/deco", deco)
bienestar.post("/enco", deco)
bienestar.post('/sedes', getSedesValidationRules(), validateGetSedes, sedes)
bienestar.post("/login", loginValidationRules(), validateLogin, login);
bienestar.post("/register", registerValidationRules(), validateRegister, register);
bienestar.post("/reject-date", rejectDateValidationRules(), validateRejectDate, rejectDate);
bienestar.post("/attend-date", attendDateValidationRules(), validateAttendDate, rejectDate);
bienestar.post("/get-services", getSedesValidationRules(), validateGetSedes, getServices);
bienestar.post("/get-franjas", getSedesValidationRules(), validateGetSedes, getFranjas);
bienestar.post("/get-franjas-by-professional", getSedesValidationRules(), validateGetSedes, getFranjasByProfessional);
bienestar.post("/delete-new-service", deleteNewServiceValidationRules(), validateDeleteNewService, deleteNewService);
bienestar.post("/create-new-service", createNewServiceValidationRules(), validateCreateNewService, createNewService);
bienestar.post("/close-date-by-student", closeDateByStudentValidationRules(), validateCloseDateByStudent, closeDateByStudent);
bienestar.post("/get-professional-by-sede", getProfessionalBySedeValidationRules(), validateGetProfessionalBySede, getProfessionalBySede);
bienestar.post("/last-date-by-professional", lastDateByProfessionalValidationRules(), validateLastDateByProfessional, lastDateByProfessional);
bienestar.post("/close-date-by-professional", closeDateByProfessionalValidationRules(), validateCloseDateByProfessional, closeDateByProfessional);
bienestar.post("/assign-location-by-professional", assignLocationByProfessionalValidationRules(), validateAssignLocationByProfessional, assignLocation);
bienestar.post("/get-schedule-by-professional", getScheduleByProfessionalValidationRules(), validateGetScheduleByProfessional, getScheduleByProfessional);
bienestar.post("/next-past-dates-by-professional", nextPastDatesByProfessionalValidationRules(), validateNextPastDatesByProfessional, nextPastDatesByProfessional);
bienestar.post("/create-schedule-by-professional", createScheduleByProfessionalValidationRules(), validateCreateScheduleByProfessional, createScheduleByProfessional);

//Reportes por profesionales

bienestar.post("/report-pdf", generatePDF)
bienestar.post("/report-by-service", deco)
bienestar.post("/report-by-professional", deco)

module.exports = {
  bienestar,
};
