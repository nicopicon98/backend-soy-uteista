const express = require('express');
const cors = require('cors');
const path = require('path');
const { soyUteistaVersion, soyuteista } = require('./api/v1/production/soyuteista');
const { bienestarVersion, bienestar } = require('./api/v1/production/bienestar');
const app = express();

app.use(cors())
   .use(express.json())
   .use(soyUteistaVersion(), soyuteista)
   .use(bienestarVersion(), bienestar)
   .use(express.static(path.join(__dirname, 'public')))
   .listen(9091)