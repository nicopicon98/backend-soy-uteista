// const { bienestar } = require('./bienestar.controller');
// const { bienestarVersion } = require('./bienestar.module');

// module.exports = {
//     bienestarVersion,
//     bienestar
// }

const express = require('express');
const app = express();

const timeSlotRoutes = require('./routes/time_slot.routes');

app.use(timeSlotRoutes);
module.exports = app;