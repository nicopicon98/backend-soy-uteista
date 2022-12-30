const express = require("express");
const calendarios = express.Router();
const {
  find,
  findTotalCitas,
  findUltimaCita,
  findProximaCita,
  findCitasTomadas,
  findCantidadCitasPorEstudiante,
  create,
  remove,
} = require("./calendarios.service");

calendarios.use((req, res, next) => {
  next();
});

calendarios.get("/", find);

calendarios.get("/obtenerTotalCitas", findTotalCitas);

calendarios.get("/ultimaCita", findUltimaCita);

calendarios.get("/proximaCita", findProximaCita);

calendarios.get("/citasTomadas", findCitasTomadas);

calendarios.get("/citasAsistidas", findCitasAsistidas);

calendarios.get("/cantidadCitasPorEstudiante", findCantidadCitasPorEstudiante);

calendarios.post("/", create);

calendarios.delete("/:idCita", remove);

module.exports = {
  calendarios,
};
