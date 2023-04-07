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
  attendDate,
  getUsers,
  createAppointment,
  servicesByIdCampus,
  serviciosBySede,
  appointmentsByStudent,
  appointmentsByIdCampusArea,
  deleteProfessional,
  dashboardHome,
  getAllAppointmentsByProfessional,
  createCampusArea,
  getAreasNotInCampus,
  deleteCampusArea,
} = require("./bienestar.service");
const {
  getFranjasByProfessional,
  getFranjas,
} = require("./controllers/time-slot.controller");
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
const {
  appointmentsByIdCampusAreaValidationRules,
  validateAppointmentsByIdCampusArea,
} = require("./middlewares/appointments-by-id-campus-area.middleware");
const {
  appointmentsByStudentValidationRules,
  validateAppointmentsByStudent,
} = require("./middlewares/appointments.middleware");
const {
  attendDateValidationRules,
  validateAttendDate,
} = require("./middlewares/attend-date.middleware");
const {
  createAppointmentValidationRules,
  validatecreateAppointment,
} = require("./middlewares/create-appointment.middleware");
const {
  createCampusAreasValidationRules,
  validateCreateCampusAreas,
} = require("./middlewares/create-campus-areas.middleware");
const {
  deleteProfessionalValidationRules,
  validateDeleteProfessional,
} = require("./middlewares/delete-professional.middleware");
const {
  getProfessionalBySedeValidationRules,
  validateGetProfessionalBySede,
} = require("./middlewares/get-professional-by-sede.middleware");
const {
  getSedesValidationRules,
  validateGetSedes,
} = require("./middlewares/get-sedes.middleware");
const {
  getServicesNotInCampusValidationRules,
  validateGetServicesNotInCampus,
} = require("./middlewares/get-services-not-in-campus.middleware");
const {
  sedesServiciosBySedeValidationRules,
  validateSedesServiciosBySede,
} = require("./middlewares/sedes-servicios-by-sede.middleware");
const {
  servicesByIdCampusValidationRules,
  validateservicesByIdCampus,
} = require("./middlewares/services-by-id-campus.middleware");

bienestar.use((req, res, next) => {
  next();
});

//General Endpoints
bienestar.post("/deco", deco);
bienestar.post("/enco", deco);
bienestar.post(
  "/dashboard-home",
  deleteProfessionalValidationRules(),
  validateDeleteProfessional,
  dashboardHome
);

//Auth
bienestar.post("/login", loginValidationRules(), validateLogin, login);

//TimeSlots
bienestar.post(
  "/get-all-franjas",
  getSedesValidationRules(),
  validateGetSedes,
  getFranjas
);
bienestar.post(
  "/get-all-franjas-by-professional",
  getSedesValidationRules(),
  validateGetSedes,
  getFranjasByProfessional
);

//Schedule
bienestar.post(
  "/get-all-schedules-by-professional",
  getScheduleByProfessionalValidationRules(),
  validateGetScheduleByProfessional,
  getScheduleByProfessional
);
bienestar.post(
  "/insert-schedules",
  createScheduleByProfessionalValidationRules(),
  validateCreateScheduleByProfessional,
  createScheduleByProfessional
);

//Users
bienestar.post(
  "/get-all-professional",
  getSedesValidationRules(),
  validateGetSedes,
  getUsers
);
bienestar.post(
  "/get-all-professional-by-campus-area",
  getProfessionalBySedeValidationRules(),
  validateGetProfessionalBySede,
  getProfessionalBySede
);
bienestar.post(
  "/insert-professional",
  registerValidationRules(),
  validateRegister,
  register
);
bienestar.post(
  "/update-professional-location",
  assignLocationByProfessionalValidationRules(),
  validateAssignLocationByProfessional,
  assignLocation
);
bienestar.post(
  "/delete-professional",
  deleteProfessionalValidationRules(),
  validateDeleteProfessional,
  deleteProfessional
);

//Fields
bienestar.post(
  "/get-all-fields",
  getSedesValidationRules(),
  validateGetSedes,
  getServices
);
bienestar.post(
  "/get-all-fields-by-campus",
  servicesByIdCampusValidationRules(),
  validateservicesByIdCampus,
  servicesByIdCampus
);
bienestar.post(
  "/get-all-fields-not-in-campus",
  getServicesNotInCampusValidationRules(),
  validateGetServicesNotInCampus,
  getAreasNotInCampus
);
bienestar.post(
  "/insert-field",
  createNewServiceValidationRules(),
  validateCreateNewService,
  createNewService
);
bienestar.post(
  "/delete-field",
  deleteNewServiceValidationRules(),
  validateDeleteNewService,
  deleteNewService
);

//Campuses
bienestar.post(
  "/get-all-campuses",
  getSedesValidationRules(),
  validateGetSedes,
  sedes
);

//Appointments
bienestar.post(
  "/get-last-appointment-by-professional",
  lastDateByProfessionalValidationRules(),
  validateLastDateByProfessional,
  lastDateByProfessional
);
bienestar.post(
  "/get-upcoming-appointment-by-professional",
  closeDateByProfessionalValidationRules(),
  validateCloseDateByProfessional,
  closeDateByProfessional
);
bienestar.post(
  "/get-all-upcoming-appointments-by-professional",
  closeDateByProfessionalValidationRules(),
  validateCloseDateByProfessional,
  getAllAppointmentsByProfessional
);
bienestar.post(
  "/get-upcoming-appointment-by-student",
  closeDateByStudentValidationRules(),
  validateCloseDateByStudent,
  closeDateByStudent
);
bienestar.post(
  "/get-all-last-month-to-now-appointment-by-professional",
  nextPastDatesByProfessionalValidationRules(),
  validateNextPastDatesByProfessional,
  nextPastDatesByProfessional
);
bienestar.post(
  "/update-appointment-rejected",
  rejectDateValidationRules(),
  validateRejectDate,
  rejectDate
);
bienestar.post(
  "/update-appointment-attended",
  attendDateValidationRules(),
  validateAttendDate,
  attendDate
);
bienestar.post(
  "/insert-appointment",
  createAppointmentValidationRules(),
  validatecreateAppointment,
  createAppointment
);
bienestar.post(
  "/get-all-appointments-by-student",
  appointmentsByStudentValidationRules(),
  validateAppointmentsByStudent,
  appointmentsByStudent
);
bienestar.post(
  "/get-all-appointments-by-campuses-field",
  appointmentsByIdCampusAreaValidationRules(),
  validateAppointmentsByIdCampusArea,
  appointmentsByIdCampusArea
);

//Campus Field
bienestar.post(
  "/get-all-campuses-field-by-campus",
  sedesServiciosBySedeValidationRules(),
  validateSedesServiciosBySede,
  serviciosBySede
);
bienestar.post(
  "/insert-campus-field",
  createCampusAreasValidationRules(),
  validateCreateCampusAreas,
  createCampusArea
);
bienestar.post(
  "/delete-campus-field",
  getProfessionalBySedeValidationRules(),
  validateGetProfessionalBySede,
  deleteCampusArea
);

//Reports
bienestar.post("/report-pdf", generatePDF);
bienestar.post("/report-by-service", deco);
bienestar.post("/report-by-professional", deco);

module.exports = {
  bienestar,
};
