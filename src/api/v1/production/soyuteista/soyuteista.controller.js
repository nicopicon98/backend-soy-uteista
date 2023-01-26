const express = require("express");
const soyuteista = express.Router();
const { carnetEntrada, qualificationEntrada, scheduleEntrada } = require("./soyuteista.service");

const KEY = "JSPHPWORKS4everandever!";
soyuteista.use((req, res, next) => {
  if (req.query.key != KEY) {
    return res.json({
      result: 69,
      data: {},
      error: "Token invalido",
    });
  } else if (!req.query.email) {
    return res.json({
      result: 2,
      data: {},
      error: "'|'[-||(_+[] #/-//|3/2[-, desencriptelo mi papa!",
    });
  } else {
    next();
  }
});

soyuteista.get("/carnet", carnetEntrada);

soyuteista.get("/qualification", qualificationEntrada);

soyuteista.get("/schedule", scheduleEntrada);

module.exports = {
  soyuteista,
};
