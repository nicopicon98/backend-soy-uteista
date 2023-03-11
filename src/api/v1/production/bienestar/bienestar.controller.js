const express = require("express");
const bienestar = express.Router();
const {
  login,
  register,
  assignLocation,
  createScheduleByProfessional,
  getScheduleByProfessional,
  createNewService,
  deleteNewService,
  rejectDate,
  closeDateByProfessional,
  closeDateByStudent,
  nextPastDatesByProfessional,
  lastDateByProfessional,
} = require("./bienestar.service");

bienestar.use((req, res, next) => {
  next();
});

bienestar.post("/login", login);
bienestar.post("/register", register);
bienestar.post("/assign-location", assignLocation);
bienestar.post("/create-schedule-by-professional", createScheduleByProfessional);
bienestar.post("/get-schedule-by-professional", getScheduleByProfessional);
bienestar.post("/create-new-service", createNewService);
bienestar.post("/delete-new-service", deleteNewService);
bienestar.post("/reject-date", rejectDate);
bienestar.post("/close-date-by-professional", closeDateByProfessional);
bienestar.post("/close-date-by-student", closeDateByStudent);
bienestar.post("/next-past-dates-by-professional", nextPastDatesByProfessional);
bienestar.post("/last-date-by-professional", lastDateByProfessional);

module.exports = {
  bienestar,
};
