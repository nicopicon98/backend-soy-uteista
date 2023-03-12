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
  const { id_area } = req.body;
  const deleteNewService = await mysql.executeQuery(
    "DELETE FROM areas WHERE id_area = ?",
    [id_area]
  );
  deleteNewService
    ? send({ deleteNewService }, res)
    : send({ error: GENERAL_ERROR }, res);
};
const createNewService = async (req, res) => {
  const { nombre } = req.body;
  const createNewService = await mysql.executeQuery(
    "INSERT INTO areas (nombre) VALUES (?)",
    [nombre]
  );
  createNewService
    ? send({ createNewService }, res)
    : send({ error: GENERAL_ERROR }, res);
};
const closeDateByStudent = async (req, res) => {
  const { tomado_por } = req.body;
  const closeDateByStudent = await mysql.executeQuery(
    "SELECT * FROM citas WHERE tomado_por = ? AND fecha_registro > NOW() ORDER BY fecha_registro ASC LIMIT 1",
    [tomado_por]
  )[0];
  send({ closeDateByStudent }, res);
};
const lastDateByProfessional = async (req, res) => {
  const { id_usuario } = req.body;
  const lastDateByProfessional = await mysql.executeQuery(
    `SELECT c.*
    FROM citas c
    JOIN (
      SELECT h.id_horario, MAX(h.fecha) AS max_fecha
      FROM horario h
      WHERE h.id_usuario = ?
      GROUP BY h.id_horario
      ORDER BY max_fecha DESC
      LIMIT 1
    ) AS ultima_horario ON ultima_horario.id_horario = c.id_horario
    ORDER BY c.fecha_registro DESC
    LIMIT 1`,
    [id_usuario]
  )[0];
  send({ lastDateByProfessional }, res);
};
const closeDateByProfessional = async (req, res) => {
  const { id_usuario } = req.body;
  const closeDateByProfessional = await mysql.executeQuery(
    `
  SELECT c.*
FROM citas c
JOIN (
  SELECT h.id_horario, MIN(h.fecha) AS min_fecha
  FROM horario h
  WHERE h.id_usuario = ?
  AND h.fecha >= CURDATE()
  AND NOT EXISTS (
    SELECT 1
    FROM citas c2
    WHERE c2.id_horario = h.id_horario
    AND c2.asistido = 1
  )
  GROUP BY h.id_horario
  ORDER BY min_fecha ASC
  LIMIT 1
) AS proxima_horario ON proxima_horario.id_horario = c.id_horario
ORDER BY c.fecha_registro DESC
LIMIT 1
`,
    [id_usuario]
  )[0];
  send({ closeDateByProfessional }, res);
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
