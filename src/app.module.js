const express = require('express');
const cors = require('cors');
const { production } = require('./production/production.controller');
//const { calendarios } = require('./calendarios/calendarios.controller');
const app = express();

app.use(cors())
   .use(express.json())
   .use('/endpoint/production', production)
   //.use('/citas')
   //.use('/calendarios', calendarios)
   .use(express.static(path.join(__dirname, 'public')))
   .listen(9091)