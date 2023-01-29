const { response } = require("express");
const { carnet } = require("../../../../common/peticionesOracle/carnet");
const { horario } = require("../../../../common/peticionesOracle/horario");
const { notas } = require("../../../../common/peticionesOracle/notas");
const { mysqlConnection } = require("../../../../common/conexiones/conexionMysql");



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

const professionalsByFieldEntrada = async (req, res = response) => {
  const field = req.query.field;
  const con = new mysqlConnection()
  const resp = await con.executeQuery("SELECT * FROM areas INNER JOIN usuarios ON usuarios.id_area = areas.id_area WHERE areas.nombre = ?", [field])
  res.json({data: resp});
};

module.exports = {
  carnetEntrada,
  qualificationEntrada,
  scheduleEntrada,
  professionalsByFieldEntrada
};
