const { decryptMiddleware } = require('./api/v1/production/bienestar/middlewares/decrypt.middleware');
const { soyUteistaVersion, soyuteista } = require('./api/v1/production/soyuteista/');
// const { bienestarVersion, bienestar } = require('./api/v1/production/bienestar');
// const bienestar = require('./api/v1/production/bienestar');
const { bienestarVersion, bienestar } = require('./api/v1/production/bienestar/bienestar.pepito');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors())
   .use(express.json())
   .use(soyUteistaVersion(), soyuteista)
   .use(decryptMiddleware)
   .use(morgan('dev'))
   .use(bienestarVersion(), bienestar)
   .use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
   const timestamp = new Date().toISOString();
   console.log(`[${timestamp}] ${req.method} ${req.url}`);
   next();
});

app.use((req, res, next) => {
   const timestamp = new Date().toISOString();
   const logMessage = `[${timestamp}] ${req.method} ${req.url}`;
   fs.appendFile('traffic.log', logMessage + '\n', (err) => {
     if (err) {
       console.error(`Error al escribir en el archivo de registro: ${err}`);
     }
   });
   next();
});

// if (cluster.isWorker) {
//    // Iniciar el servidor Express
//    const server = app.listen(9091, () => {
//       console.log(`Worker ${process.pid} iniciado en el puerto ${server.address().port}`);
//    });
// }

// if (cluster.isMaster) {
//    // Obtener el número de CPU disponibles en el sistema
//    const numCPUs = os.cpus().length;

//    // Crear un worker para cada CPU
//    for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//    }

//    // Escuchar eventos de cambio de estado de los workers
//    cluster.on('exit', (worker, code, signal) => {
//       console.log(`Worker ${worker.process.pid} terminado`);
//       cluster.fork();
//    });
// }

app.listen(9091, () => {
   console.log('Servidor iniciado en el puerto 9091');
});