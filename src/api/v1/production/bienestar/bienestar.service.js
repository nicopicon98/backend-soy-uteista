const { mysql } = require("../../../../common/conexiones/conexionMysql");
const {
  comparePassword,
} = require("../../../../common/security/bcrypt_encryption");
const { send } = require("./config/crypto.config");

const GENERAL_ERROR = "Contacta con el administrador";
const BAD_SERVICE = "Información errónea";

const login = async (req, res) => {
  const { usuario, clave } = req.body;
  let user = await mysql.executeQuery(
    "SELECT * FROM usuarios WHERE usuario = ?",
    [usuario]
  )[0];
  if (!user) {
    send({ error: BAD_SERVICE }, res);
    return;
  }
  const passwordCompare = await comparePassword(clave, user.clave);
  user = { ...user, clave: "" };
  send(passwordCompare ? { user } : { error: GENERAL_ERROR }, res);
};

const register = async (req, res) => {
  const { nombre, correo, clave, ubicacion, id_campus, id_area, id_rol } =
    req.body;
  const createUser = await mysql.executeQuery(
    "INSERT INTO usuarios (nombre, correo, clave, ubicacion, id_campus, id_area, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nombre, correo, clave, ubicacion, id_campus, id_area, id_rol]
  );
  createUser
    ? send({ user: createUser }, res)
    : send({ error: GENERAL_ERROR }, res);
};
const rejectDate = async (req, res) => {
  send({}, res);
};
const getServices = async (req, res) => {
  const services = await mysql.executeQuery("SELECT * FROM areas");
  send({ services }, res);
};
const assignLocation = async (req, res) => {
  const { id_usuario, ubicacion } = req.body;
  const assignLocation = await mysql.executeQuery(
    "UPDATE usuarios SET ubicacion = ? WHERE id_usuario = ?",
    [ubicacion, id_usuario]
  );
  assignLocation
    ? send({ assignLocation }, res)
    : send({ error: GENERAL_ERROR }, res);
  send({}, res);
};
const deleteNewService = async (req, res) => {
  send({}, res);
};
const createNewService = async (req, res) => {
  send({}, res);
};
const closeDateByStudent = async (req, res) => {
  send({}, res);
};
const lastDateByProfessional = async (req, res) => {
  send({}, res);
};
const closeDateByProfessional = async (req, res) => {
  send({}, res);
};
const getScheduleByProfessional = async (req, res) => {
  send({}, res);
};
const nextPastDatesByProfessional = async (req, res) => {
  send({}, res);
};
const createScheduleByProfessional = async (req, res) => {
  send({}, res);
};

module.exports = {
  login,
  register,
  rejectDate,
  getServices,
  assignLocation,
  deleteNewService,
  createNewService,
  closeDateByStudent,
  lastDateByProfessional,
  closeDateByProfessional,
  getScheduleByProfessional,
  nextPastDatesByProfessional,
  createScheduleByProfessional,
};
