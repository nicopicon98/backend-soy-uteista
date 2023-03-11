const express = require('express');
const cluster = require('cluster');
const os = require('os');
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

if (cluster.isWorker) {
   // Iniciar el servidor Express
   const server = app.listen(9091, () => {
      console.log(`Worker ${process.pid} iniciado en el puerto ${server.address().port}`);
   });
}

if (cluster.isMaster) {
   // Obtener el número de CPU disponibles en el sistema
   const numCPUs = os.cpus().length;

   // Crear un worker para cada CPU
   for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
   }

   // Escuchar eventos de cambio de estado de los workers
   cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} terminado`);
      cluster.fork();
   });
}