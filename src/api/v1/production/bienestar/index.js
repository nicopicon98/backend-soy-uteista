const express = require("express");
const bienestar = express();

//Routes
const timeSlotRouter = require("./routes/time-slots");
const userTimeSlotsDateRouter = require('./routes/user-time-slots-date')
const userRouter = require('./routes/user')
const fieldRouter = require('./routes/fields')

bienestar.use(timeSlotRouter);
bienestar.use(userTimeSlotsDateRouter);
bienestar.use(userRouter);
bienestar.use(fieldRouter);

const bienestarVersion = () => "/api/v1/production/bienestar";
module.exports = {
  bienestar,
  bienestarVersion,
};
