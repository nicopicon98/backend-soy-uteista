const express = require("express");
const bienestar = express();

//Routers
const userTimeSlotsDateRouter = require("./routes/users-time-slots-dates");
const timeSlotRouter = require("./routes/time-slots");
const cryptRouter = require("./routes/cryptography");
const fieldRouter = require("./routes/fields");
const userRouter = require("./routes/users");
const authRouter = require('./routes/auth');
const campusRouter = require('./routes/campuses');
const appointmentRouter = require('./routes/appointments');
const campusFieldRouter = require('./routes/campuses_fields');

bienestar.use(userTimeSlotsDateRouter);
bienestar.use(timeSlotRouter);
bienestar.use(campusRouter);
bienestar.use(cryptRouter);
bienestar.use(fieldRouter);
bienestar.use(userRouter);
bienestar.use(authRouter);
bienestar.use(campusRouter);
bienestar.use(appointmentRouter);
bienestar.use(campusFieldRouter);

const bienestarVersion = () => "/api/v1/production/bienestar";
module.exports = {
  bienestar,
  bienestarVersion,
};
