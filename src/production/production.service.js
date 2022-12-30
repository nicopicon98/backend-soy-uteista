const { response } = require("express");
const { carnet } = require("../common/peticionesOracle/carnet");
const { horario } = require("../common/peticionesOracle/horario");
const { notas } = require("../common/peticionesOracle/notas");

const carnetEntrada = async (req, res = response) => {
  const correo = req.query.email;
  const resp = await carnet(correo);
  res.json(resp);
};

const qualificationEntrada = async (req, res = response) => {
  const correo = req.query.email;
  const resp = await notas(correo);
  res.json(resp);
};

const scheduleEntrada = async (req, res = response) => {
  const correo = req.query.email;
  const resp = await horario(correo);
  res.json(resp);
};

module.exports = {
  carnetEntrada,
  qualificationEntrada,
  scheduleEntrada,
};
