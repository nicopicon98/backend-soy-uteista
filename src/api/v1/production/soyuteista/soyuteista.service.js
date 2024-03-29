const { response } = require("express");
const { carnet } = require("../../../../common/peticionesOracle/carnet");
const { horario, getScheduleByDocument } = require("../../../../common/peticionesOracle/horario");
const { notas } = require("../../../../common/peticionesOracle/notas");
const { mysql } = require("../../../../common/conexiones/conexionMysql");
const {
  organizarHorarioBienestar,
} = require("../../../../common/utils/organizarHorarioBienestar");

const con = mysql;

const find = async (req, res = response) => {
  const convocatoria = await con.executeQuery(
    `SELECT * FROM convocatorias`,
    []
  );
  res.json(convocatoria);
};

const create = (req, res = response) => {};

const remove = (req, res = response) => {};

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
  const resp = await con.executeQuery(
    "SELECT * FROM areas INNER JOIN usuarios ON usuarios.id_area = areas.id_area WHERE areas.nombre = ?",
    [field]
  );
  res.json({ data: resp });
};

const scheduleByProfessional = async (req, res = response) => {
  const { id_usuario } = req.query;
  const resp = await con.executeQuery(
    "select usuarios.nombre, usuarios.id_usuario as usuariosIdUsuario,horario.id_horario, DATE_FORMAT(horario.fecha,'%d-%m-%Y') as fecha, horario.id_usuario, horario.id_franja as horarioIdFranja, franjas.id_franja as franjasIdFranja, franjas.nombre as nombreFranja from horario left join citas on citas.id_horario = horario.id_horario inner join usuarios ON usuarios.id_usuario = horario.id_usuario inner join franjas ON franjas.id_franja = horario.id_franja WHERE horario.id_horario not in (select id_horario from citas) AND usuarios.id_usuario = ?",
    [id_usuario]
  );
  const organizar = organizarHorarioBienestar(resp);
  res.json({ data: organizar });
};

const insertAppointment = async (req, res = response) => {
  let resp;
  let data;
  const { id_horario, correo, telefono } = req.body;

  resp = await con.executeQuery(
    "INSERT INTO citas (id_horario, tomado_por, telefono) VALUES (?, ?, ?)",
    [id_horario, correo, telefono]
  );
  if (resp != undefined) {
    data = {
      code: 200,
      msg: "Cita creada con éxito",
    };
  } else {
    data = {
      code: 409,
      msg: "Esta cita ya fue tomada",
    };
  }
  res.json({ data });
};

const deleteAppointments = async (req, res = response) => {
  const resp = await con.executeQuery("TRUNCATE TABLE citas", []);

  res.json({ data: resp });
};

const enabledModulesEntrada = async (req, res = response) => {
  const resp = await con.executeQuery("SELECT * FROM modulos", []);
  res.json({ data: resp });
};

const podcastEntrada = async (req, res = response) => {
  const resp = await con.executeQuery("SELECT * FROM podcast");

  res.json({ data: resp });
};

const exitoEscolarEntrada = async (req, res = response) => {
  const resp = await con.executeQuery("SELECT * FROM exito_escolar");

  res.json({ data: resp });
};
const groupBy = (input, key) => {
  return input.reduce((acc, currentValue) => {
    let groupKey = currentValue[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(currentValue);
    return acc;
  }, {});
};

const findDependencia = async (req, res = response) => {
  //hacer query para buscar todos
  const dependencias = await con.executeQuery(
    `
    SELECT dependencias.nombre as dependenciaNombre, contactosDependencia.*
    FROM dependencias 
    INNER JOIN contactosDependencia ON contactosDependencia.idDependencia = dependencias.idDependencia
    `,
    []
  );

  const materias3 = groupBy(dependencias, "dependenciaNombre");

  const array2 = [];
  //organizar por materia
  for (const x in materias3) {
    let key = x;
    let value = materias3[x];

    array2.push({
      dependencia: key,
      infoDependencia: value,
    });
  }
  res.json(array2);
};

const versionChecker = (current_version, phone_version) => {
  let a = current_version.split(".");
  let b = phone_version.split(".");
  let len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    if ((+a[i] || 0) > (+b[i] || 0)) {
      return 1;
    } else if ((+a[i] || 0) < (+b[i] || 0)) {
      return -1;
    }
  }

  return 0;
};

const basicInfo = async (req, res = response) => {
  const current_version = "21.0.0";
  const phone_version = req.body.phone_version || "0.0.0";

  const maintenance = {
    is_under_maintenance: 0,
    image: null,
    msg: "Actualmente nos encontramos mejorando para brindarte una mejor experiencia. Por favor, inténtalo más tarde.",
  };

  const update_img = "";
  const update_msg =
    "Para seguir gozando de tu app SoyUteista, esta debe ser actualizada, por favor da click en el enlace debajo";

  const checker = versionChecker(current_version, phone_version) > 0 ? 1 : 0;

  const update_checker = {
    is_update_required: checker,
    image: checker ? update_img : "",
    msg: checker ? update_msg : "",
  };

  const campaign = {
    is_campaign_running: 0,
    image: null,
    msg: "",
  };

  res.json({ maintenance, update_checker, campaign });
};

const createDependencia = (req, res = response) => {};

const removeDependencia = (req, res = response) => {};

const scheduleByDocument = async (req, res = response) => {
  const document = req.query.document;
  const resp = await getScheduleByDocument(document);
  res.json({ data: resp });
};

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
  exitoEscolarEntrada,
  find,
  create,
  remove,
  findDependencia,
  createDependencia,
  removeDependencia,
  basicInfo,
  scheduleByDocument,
};
