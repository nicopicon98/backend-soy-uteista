// Register module aliases
require('module-alias/register');

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

// Import middlewares
const { decryptMiddleware } = require('@api_bienestar/middlewares/decrypt.middleware');

// Import routes
const { bienestarVersion, bienestar } = require('@api_bienestar');
const { soyUteistaVersion, soyuteista } = require('@api_soyuteista');

// Configure CORS options
const corsOptions = {
   origin: function (origin, callback) {
     if (origin === undefined || origin.startsWith('https://') || origin === 'http://172.16.6.186' || origin === 'http://bienestar.uts.edu.co') {
       callback(null, true)
     } else {
       callback(new Error('Origen no permitido por CORS'))
     }
   },
   credentials: true
 };

// Configure app middleware
app.use(cors(corsOptions))
   .use(express.json())
   .use(soyUteistaVersion(), soyuteista)
   .use(decryptMiddleware)
   .use(morgan('dev'))
   .use(bienestarVersion(), bienestar)
   .use(express.static(path.join(__dirname, 'public')));

// Start the server listening on port 9091
app.listen(9091, () => {
   console.log('Servidor iniciado en el puerto 9091');
});
