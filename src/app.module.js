// Register module aliases
require('module-alias/register');

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

// Import middleware
// const { decryptMiddleware } = require('@api_v1_production_bienestar/middlewares/decrypt.middleware');
const { decryptMiddleware } = require('./api/v1/production/bienestar/middlewares/decrypt.middleware');

// Import routes
// const { bienestarVersion, bienestar } = require('./api/v1/production/bienestar');
const { soyUteistaVersion, soyuteista } = require('@api_v1_production_soyuteista');

// Configure app middleware
app.use(cors())
   .use(express.json())
   .use(soyUteistaVersion(), soyuteista)
   .use(decryptMiddleware)
   .use(morgan('dev'))
  //  .use(bienestarVersion(), bienestar)
   .use(express.static(path.join(__dirname, 'public')));

// Start the server listening on port 9091
app.listen(9091, () => {
   console.log('Servidor iniciado en el puerto 9091');
});
