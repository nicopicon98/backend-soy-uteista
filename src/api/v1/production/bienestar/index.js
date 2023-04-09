const express = require("express");
const bienestar = express();

//Routers
const userTimeSlotsDateRouter = require("./routes/users-time-slots-dates");
const timeSlotRouter = require("./routes/time-slots");
const cryptRouter = require("./routes/cryptography");
const fieldRouter = require("./routes/fields");
const userRouter = require("./routes/users");

bienestar.use(userTimeSlotsDateRouter);
bienestar.use(timeSlotRouter);
bienestar.use(fieldRouter);
bienestar.use(cryptRouter);
bienestar.use(userRouter);

const bienestarVersion = () => "/api/v1/production/bienestar";
module.exports = {
  bienestar,
  bienestarVersion,
};
