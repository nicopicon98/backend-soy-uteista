const express = require('express');
const cors = require('cors');
const path = require('path');
const { soyUteistaVersion } = require('./api/v1/production/soyuteista/soyuteista.module');
const { soyuteista } = require('./api/v1/production/soyuteista/soyuteista.controller');

const app = express();

app.use(cors())
   .use(express.json())
   .use(soyUteistaVersion(), soyuteista)
   .use(express.static(path.join(__dirname, 'public')))
   .listen(9091)