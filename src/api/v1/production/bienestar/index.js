const express = require("express");
const bienestar = express();

//Routes
const timeSlotRoutes = require("./routes/time-slots");
const userTimeSlotsDateRoutes = require('./routes/user-time-slots-date')

bienestar.use(timeSlotRoutes);
bienestar.use(userTimeSlotsDateRoutes);

const bienestarVersion = () => "/api/v1/production/bienestar";
module.exports = {
  bienestar,
  bienestarVersion,
};
