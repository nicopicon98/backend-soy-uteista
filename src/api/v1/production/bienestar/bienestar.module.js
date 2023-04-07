const bienestarVersion = () => {
  return '/api/v1/production/bienestar';
};

const express = require('express');
const bienestar = express();

const timeSlotRoutes = require('./routes/time_slots');

bienestar.use(timeSlotRoutes);

module.exports = {
  bienestar,
  bienestarVersion
}