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
const { loginValidationRules, validateLogin } = require("./middlewares/login.middleware");
const { registerValidationRules, validateRegister } = require("./middlewares/register.middleware");

bienestar.use((req, res, next) => {
  next();
});

bienestar.post("/login", loginValidationRules(), validateLogin, login);
bienestar.post("/register", registerValidationRules(), validateRegister, register);
bienestar.post("/reject-date", rejectDate);
bienestar.post("/get-services", getServices);
bienestar.post("/delete-new-service", deleteNewService);
bienestar.post("/create-new-service", createNewService);
bienestar.post("/close-date-by-student", closeDateByStudent);
bienestar.post("/assign-location-by-professional", assignLocation);
bienestar.post("/last-date-by-professional", lastDateByProfessional);
bienestar.post("/close-date-by-professional", closeDateByProfessional);
bienestar.post("/get-schedule-by-professional", getScheduleByProfessional);
bienestar.post("/next-past-dates-by-professional", nextPastDatesByProfessional);
bienestar.post("/create-schedule-by-professional", createScheduleByProfessional);

module.exports = {
  bienestar,
};
