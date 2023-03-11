const express = require('express');
const cors = require('cors');
const path = require('path');
const { decryptMiddleware } = require('./api/v1/production/bienestar/middlewares/decrypt.middleware');
const { soyUteistaVersion, soyuteista } = require('./api/v1/production/soyuteista/');
const { bienestarVersion, bienestar } = require('./api/v1/production/bienestar');

const app = express();

app.use(cors())
   .use(express.json())
   .use(soyUteistaVersion(), soyuteista)
   .use(decryptMiddleware)
   .use(bienestarVersion(), bienestar)
   .use(express.static(path.join(__dirname, 'public')))
   .listen(9091)