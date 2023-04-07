const express = require('express');
const app = express();

const timeSlotRoutes = require('./routes/time_slot.routes');

app.use(timeSlotRoutes);

module.exports = {
  bienestar: app,
  bienestarVersion: () => '/api/v1/production/bienestar',
};