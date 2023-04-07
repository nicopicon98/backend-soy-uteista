const express = require("express");
const bienestar = express();

//Routes
const timeSlotRoutes = require("./routes/time-slots");

bienestar.use(timeSlotRoutes);

const bienestarVersion = () => "/api/v1/production/bienestar";
module.exports = {
  bienestar,
  bienestarVersion,
};
