const { bienestarVersion } = require('./bienestar.module');

const express = require('express');
const bienestar = express();

const timeSlotRoutes = require('./routes/time_slot.routes');

bienestar.use(timeSlotRoutes);

module.exports = {
  bienestar,
  bienestarVersion,
};