const { mysql } = require("../../../../common/conexiones/conexionMysql");
const {
  comparePassword,
  hashPassword,
} = require("../../../../common/security/bcrypt_encryption");
const { send, decrypt, sendService } = require("./config/crypto.config");
const { htmlTemplate } = require("./template/pdfreport");

const GENERAL_ERROR = "Contacta con el administrador";
const BAD_SERVICE = "Información errónea";

const deco = (req, res) => {
  const content = req.body;
  sendService(content, res);
};
const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await mysql.executeQuery(
    `SELECT usuarios.id_usuario AS usuarios_id_usuario, usuarios.nombre AS usuarios_nombre,
    usuarios.correo AS usuarios_correo, usuarios.clave AS usuarios_clave,
    usuarios.ubicacion AS usuarios_ubicacion, usuarios.id_campus AS usuarios_id_campus,
    usuarios.id_area AS usuarios_id_area, usuarios.id_rol AS usuarios_id_rol,
    usuarios.fecha_registro AS usuarios_fecha_registro, areas.id_area AS areas_id_area,
    areas.nombre AS areas_nombre, campus.id_campus AS campus_id_campus,
    campus.nombre AS campus_nombre, roles.id_rol AS roles_id_rol, roles.nombre AS roles_nombre
    FROM usuarios
    INNER JOIN areas ON areas.id_area = usuarios.id_area
    INNER JOIN campus ON campus.id_campus = usuarios.id_campus
    INNER JOIN roles ON roles.id_rol = usuarios.id_rol
    WHERE correo = ?`,
    [email]
  );
  if (user.length === 0) {
    send({ error: [BAD_SERVICE], status: 404 }, res);
    return;
  }
  const passwordCompare = await comparePassword(
    password,
    user[0].usuarios_clave
  );
  user = { ...user[0] };
  delete user.usuarios_clave;
  send(
    passwordCompare
      ? { user, status: 200 }
      : { error: GENERAL_ERROR, status: 403 },
    res
  );
};
const register = async (req, res) => {
  let { nombre, correo, clave, ubicacion, id_campus, id_area, id_rol } =
    req.body;
  clave = await hashPassword(clave);
  try {
    const createUser = await mysql.executeQuery(
      "INSERT INTO usuarios (nombre, correo, clave, ubicacion, id_campus, id_area, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, correo, clave, ubicacion, id_campus, id_area, id_rol]
    );
    createUser
      ? send({ user: createUser, status: 201 }, res)
      : send({ error: GENERAL_ERROR, status: 403 }, res);
  } catch (error) {
    send({ error: BAD_SERVICE, status: 409 }, res);
  }
};
const rejectDate = async (req, res) => {
  const { rechazado_por, rechazado_correo, razon_rechazo, id_cita } = req.body;
  const sql =
    "UPDATE citas SET rechazado = 1, rechazado_por = ?, rechazado_correo = ?, rechazado_razon = ? WHERE id_cita = ?";
  const rejectDate = await mysql.executeQuery(sql, [
    rechazado_por,
    rechazado_correo,
    razon_rechazo,
    id_cita,
  ]);
  send({ rejectDate }, res);
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
  const { id_usuario } = req.body;
  const getScheduleByProfessional = await mysql.executeQuery(
    `
  SELECT c.*
FROM citas c
JOIN (
  SELECT h.id_horario
  FROM horario h
  WHERE h.id_usuario = ?
  AND h.fecha >= CURDATE()
  AND NOT EXISTS (
    SELECT 1
    FROM citas c2
    WHERE c2.id_horario = h.id_horario
    AND c2.asistido = 1
  )
  ORDER BY h.fecha ASC
) AS proximos_horarios ON proximos_horarios.id_horario = c.id_horario
ORDER BY c.fecha_registro DESC

  `,
    [id_usuario]
  );
  send({ getScheduleByProfessional }, res);
};
const nextPastDatesByProfessional = async (req, res) => {
  const { id_usuario } = req.body;
  const nextPastDatesByProfessional = await mysql.executeQuery(
    `
  SELECT h.*, c.*
FROM horario h
LEFT JOIN citas c ON h.id_horario = c.id_horario
WHERE h.id_usuario = 1
AND h.fecha <= CURDATE()
ORDER BY h.fecha DESC
  `,
    [id_usuario]
  );
  send({ nextPastDatesByProfessional }, res);
};
const createScheduleByProfessional = async (req, res) => {
  const { id_usuario, schedule } = req.body;
  const { startDate, endDate, franjas } = schedule;
  let sql = "INSERT INTO horario (id_usuario, id_franja, fecha) VALUES ";
  const values = [];

  const fechaInicial = new Date(startDate);
  const fechaFinal = new Date(endDate);

  for (
    let fecha = fechaInicial;
    fecha <= fechaFinal;
    fecha.setDate(fecha.getDate() + 1)
  ) {
    for (const franja of franjas) {
      values.push([id_usuario, franja, fecha]);
      sql += "(?, ?, ?), ";
    }
  }
  sql = sql.slice(0, -2);
  const createScheduleByProfessional = await mysql.executeQuery(sql, values);
  send({ createScheduleByProfessional }, res);
};

//Reportes de citas

const generatePDF = async (req, res) => {
  const { id_usuario } = req.body;
  const generatePDF = await mysql.executeQuery(
    `
    SELECT citas.*, horario.fecha, horario.id_franja, usuarios.nombre AS nombre_profesional 
    FROM citas 
    INNER JOIN horario ON citas.id_horario = horario.id_horario 
    INNER JOIN usuarios ON horario.id_usuario = usuarios.id_usuario 
    WHERE usuarios.id_usuario = ?;
  `,
    [id_usuario]
  );
  pdf.create(htmlTemplate).toFile("./salida.pdf", function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
  send({ generatePDF }, res);
};

module.exports = {
  deco,
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
  generatePDF,
};
