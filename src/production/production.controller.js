const express = require("express");
const production = express.Router();
const { carnetEntrada, qualificationEntrada, scheduleEntrada } = require("./production.service");

const KEY = "JSPHPWORKS4everandever!";
production.use((req, res, next) => {
  if (req.query.key != KEY) {
    return res.json({
      result: 69,
      data: {},
      error: "Token invalido",
    });
  } else if (!req.query.correo) {
    return res.json({
      result: 2,
      data: {},
      error: "'|'[-||(_+[] #/-//|3/2[-, desencriptelo mi papa!",
    });
  } else {
    next();
  }
});

production.get("/carnet", carnetEntrada);

production.get("/qualification", qualificationEntrada);

production.get("/schedule", scheduleEntrada);

module.exports = {
  production,
};
