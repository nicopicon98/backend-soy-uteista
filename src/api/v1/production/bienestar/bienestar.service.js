const { mysql } = require("../../../../common/conexiones/conexionMysql");
const pdf = require("html-pdf");
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
const sedes = async (req, res) => {
  const campus = await mysql.executeQuery(`SELECT * FROM campus`);
  send({ data: campus, status: 200 }, res);
};
const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await mysql.executeQuery(
    `SELECT 
    u.id_usuario,
    u.nombre,
    u.correo,
    u.ubicacion,
    u.fecha_registro,
    r.nombre AS rol,
    c.nombre AS campus,
    a.nombre AS area
FROM usuarios u
LEFT JOIN campus_areas ca ON u.id_campus_area = ca.id_campus_area
LEFT JOIN campus c ON ca.id_campus = c.id_campus
LEFT JOIN areas a ON ca.id_area = a.id_area
LEFT JOIN roles r ON u.id_rol = r.id_rol
WHERE u.correo = ?
`,
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
      ? { data: user, status: 200 }
      : { error: [GENERAL_ERROR], status: 403 },
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
      ? send({ data: createUser, status: 200 }, res)
      : send({ error: [GENERAL_ERROR], status: 403 }, res);
  } catch (error) {
    send({ error: [BAD_SERVICE], status: 409 }, res);
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
  send({ data: rejectDate, status: 200 }, res);
};
const getUsers = async (req, res) => {
  const users = "SELECT * FROM usuarios ORDER BY fecha_registro ASC;";
  const usersResult = await mysql.executeQuery(users);
  send({ data: usersResult, status: 200 }, res);
};
const attendDate = async (req, res) => {
  const { id_cita } = req.body;
  const sql = "UPDATE citas SET asistido = 1 WHERE id_cita = ?";
  const attendDate = await mysql.executeQuery(sql, [id_cita]);
  send({ data: attendDate, status: 200 }, res);
};
const getFranjas = async (req, res) => {
  const franjas = await mysql.executeQuery("SELECT * FROM franjas");
  send({ data: franjas, status: 200 }, res);
};
const getServices = async (req, res) => {
  const services = await mysql.executeQuery("SELECT * FROM areas");
  send({ data: services, status: 200 }, res);
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
    ? send({ data: deleteNewService, status: 200 }, res)
    : send({ error: [GENERAL_ERROR], status: 304 }, res);
};
const createNewService = async (req, res) => {
  const { nombre } = req.body;
  const createNewService = await mysql.executeQuery(
    "INSERT INTO areas (nombre) VALUES (?)",
    [nombre]
  );
  createNewService
    ? send({ data: createNewService, status: 200 }, res)
    : send({ error: [GENERAL_ERROR], status: 304 }, res);
};
const closeDateByStudent = async (req, res) => {
  const { tomado_por } = req.body;
  const closeDateByStudent = await mysql.executeQuery(
    "SELECT * FROM citas WHERE tomado_por = ? AND fecha_registro > NOW() ORDER BY fecha_registro ASC LIMIT 1",
    [tomado_por]
  )[0];
  send({ closeDateByStudent }, res);
};
const getProfessionalBySede = async (req, res) => {
  const { nombre_campus } = req.body;
  const nombreDelCampus = await mysql.executeQuery(
    `SELECT id_campus FROM campus WHERE nombre = ?`,
    [nombre_campus]
  );
  let usuariosPorIdCampus = await mysql.executeQuery(
    `SELECT id_usuario, nombre, correo, ubicacion, id_campus, id_area, id_rol, fecha_registro FROM usuarios WHERE id_campus = ? AND id_rol = 2`,
    [nombreDelCampus[0].id_campus]
  );
  send({ data: usuariosPorIdCampus, status: 200 }, res);
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
const getFranjasByProfessional = async (req, res) => {
  const { id_usuario, fechas } = req.body;
  const [inicio, fin] = fechas;
  const franjasPorProfesional = await mysql.executeQuery(
    `SELECT * from franjas f WHERE NOT EXISTS ( SELECT 1 FROM horario h WHERE h.id_franja = f.id_franja AND h.fecha BETWEEN ? AND ? AND h.id_usuario = ? );`,
    [inicio, fin, id_usuario]
  );
  send({ data: franjasPorProfesional, status: 200 }, res);
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
  send({ data: closeDateByProfessional, status: 200 }, res);
};
const getScheduleByProfessional = async (req, res) => {
  const { id_usuario } = req.body;
  const getScheduleByProfessional = await mysql.executeQuery(
    `
    SELECT h.id_horario, h.fecha, f.nombre AS franja_nombre
    FROM horario h
    INNER JOIN franjas f ON h.id_franja = f.id_franja
    WHERE h.id_usuario = ?
    AND h.fecha >= CURDATE()
    ORDER BY h.fecha ASC
  `,
    [id_usuario]
  );
  send({ data: getScheduleByProfessional, status: 200 }, res);
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
      const fechaFranja = new Date(fecha);
      const franjaHora = new Date(franja * 3600000); // se multiplica por 3600000 para obtener la hora en milisegundos
      fechaFranja.setHours(
        franjaHora.getHours(),
        franjaHora.getMinutes(),
        0,
        0
      ); // se setea la hora de la franja a la fecha actual
      values.push([id_usuario, franja, fechaFranja]);
      sql += "(?, ?, ?), ";
    }
  }
  sql = sql.slice(0, -2); // elimina la última coma y espacio
  try {
    const createScheduleByProfessional = await mysql.executeQuery(
      sql,
      [].concat(...values)
    );
    send({ data: createScheduleByProfessional, status: 200 }, res);
  } catch (error) {
    send({ error: [GENERAL_ERROR], status: 304 }, res);
  }
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
  pdf
    .create(htmlTemplate, { orientation: "landscape", format: "A3" })
    .toFile("./salida.pdf", function (err, res) {
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
  sedes,
  login,
  register,
  getUsers,
  attendDate,
  rejectDate,
  getFranjas,
  getServices,
  assignLocation,
  deleteNewService,
  createNewService,
  closeDateByStudent,
  getProfessionalBySede,
  lastDateByProfessional,
  closeDateByProfessional,
  getFranjasByProfessional,
  getScheduleByProfessional,
  nextPastDatesByProfessional,
  createScheduleByProfessional,
  generatePDF,
};
