const { response } = require("express");
const { carnet } = require("../../../../common/peticionesOracle/carnet");
const { horario } = require("../../../../common/peticionesOracle/horario");
const { notas } = require("../../../../common/peticionesOracle/notas");
const { mysqlConnection } = require("../../../../common/conexiones/conexionMysql");
const { organizarHorarioBienestar } = require("../../../../common/utils/organizarHorarioBienestar");

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
  res.json({ data: resp });
};


const scheduleByProfessional = async (req, res = response) => {
  const { id_usuario } = req.query;
  const con = new mysqlConnection()
  const resp = await con.executeQuery("select usuarios.nombre, usuarios.id_usuario as usuariosIdUsuario,horario.id_horario, DATE_FORMAT(horario.fecha,\'%d-%m-%Y\') as fecha, horario.id_usuario, horario.id_franja as horarioIdFranja, franjas.id_franja as franjasIdFranja, franjas.nombre as nombreFranja from horario left join citas on citas.id_horario = horario.id_horario inner join usuarios ON usuarios.id_usuario = horario.id_usuario inner join franjas ON franjas.id_franja = horario.id_franja WHERE horario.id_horario not in (select id_horario from citas) AND usuarios.id_usuario = ?", [id_usuario])
  const organizar = organizarHorarioBienestar(resp);
  res.json({ data: organizar });
};


const insertAppointment = async (req, res = response) => {
  let resp;
  let data;
  const { id_horario, correo, telefono } = req.body;
  const con = new mysqlConnection()

  resp = await con.executeQuery("INSERT INTO citas (id_horario, tomado_por, telefono) VALUES (?, ?, ?)", [id_horario, correo, telefono])
  if (resp != undefined) {
    data = {
      code: 201,
      msg: "Cita creada con éxito"
    }
  } else {
    data = {
      code: 409,
      msg: "Esta cita ya fue tomada"

    }
  }
  res.json({ data });
};


const deleteAppointments = async (req, res = response) => {
  const con = new mysqlConnection()

  const resp = await con.executeQuery("TRUNCATE TABLE citas", [])

  res.json({ data: resp });
}

const enabledModulesEntrada = async (req, res = response) => {
  const con = new mysqlConnection()

  const resp = await con.executeQuery("SELECT * FROM modulos WHERE habilitado = ?", [1])

  res.json({ data: resp });
}

const podcastEntrada = async (req, res = response) => {
  const con = new mysqlConnection()

  const resp = await con.executeQuery("SELECT * FROM podcast")

  res.json({ data: resp });
}

const exitoEscolarEntrada = async (req, res = response) => {
  const con = new mysqlConnection()

  const resp = await con.executeQuery("SELECT * FROM exito_escolar")

  res.json({ data: resp });
}


module.exports = {
  carnetEntrada,
  qualificationEntrada,
  scheduleEntrada,
  professionalsByFieldEntrada,
  scheduleByProfessional,
  insertAppointment,
  deleteAppointments,
  enabledModulesEntrada,
  podcastEntrada,
  exitoEscolarEntrada
};
