const express = require("express");
const bienestar = express();

//Routes
const timeSlotRouter = require("./routes/time-slots");
const userTimeSlotsDateRouter = require('./routes/user-time-slots-date')

bienestar.use(timeSlotRouter);
bienestar.use(userTimeSlotsDateRouter);

const bienestarVersion = () => "/api/v1/production/bienestar";
module.exports = {
  bienestar,
  bienestarVersion,
};
