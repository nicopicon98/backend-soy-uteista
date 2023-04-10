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

bienestar.use(userTimeSlotsDateRouter);
bienestar.use(timeSlotRouter);
bienestar.use(campusRouter);
bienestar.use(fieldRouter);
bienestar.use(cryptRouter);
bienestar.use(userRouter);
bienestar.use(campusRouter);

const bienestarVersion = () => "/api/v1/production/bienestar";
module.exports = {
  bienestar,
  bienestarVersion,
};
