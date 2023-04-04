const { mysql } = require("../../../../common/conexiones/conexionMysql");
const pdf = require("html-pdf");
const {
  comparePassword,
  hashPassword,
} = require("../../../../common/security/bcrypt_encryption");
const { send, decrypt, sendService } = require("./config/crypto.config");
const { htmlTemplate } = require("./template/pdfreport");
const { prepareEmail, mailer } = require("./services/mailer/mailer.client");

const GENERAL_ERROR = "Contacta con el administrador";
const ERROR_CREATING_CAMPUS_AREA = "No se pudo crear el campus/area, ya existe";
const BAD_SERVICE = "Información errónea";
const USER_EXIST = "Ese usuario ya está registrado";
const USER_UPDATE_ERROR = "No se pudo actualizar el usuario";
const ERROR_CREATING_SERVICE = "No se pudo crear el servicio";
const ERROR_DELETING_SERVICE =
  "No se pudo eliminar el servicio porque esta asignado a una sede";
const ERROR_DELETING_CAMPUS_AREA =
  "No se pudo eliminar el campus/area porque tiene un profesional asignado";

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
    u.id_usuario AS usuarios_id_usuario,
    u.nombre AS usuarios_nombre,
    u.correo AS usuarios_correo,
    u.clave AS usuarios_clave,
    u.ubicacion AS usuarios_ubicacion,
    u.id_campus_area AS usuarios_id_campus_area,
    u.id_rol AS usuarios_id_rol,
    u.fecha_registro AS usuarios_fecha_registro,
    r.id_rol AS roles_id_rol,
    r.nombre AS roles_nombre,
    c.id_campus AS campus_id_campus,
    c.nombre AS campus_nombre,
    a.id_area AS areas_id_area,
    a.nombre AS areas_nombre
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
      : { error: [BAD_SERVICE], status: 403 },
    res
  );
};
const register = async (req, res) => {
  console.log("executed");
  let { nombre, correo, clave, ubicacion, id_campus_area } = req.body;
  let claveWithoutEncrypt = clave;
  clave = await hashPassword(clave);
  try {
    const createUser = await mysql.executeQuery(
      "INSERT INTO usuarios (nombre, correo, clave, ubicacion, id_campus_area, id_rol) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, correo, clave, ubicacion, id_campus_area, 2]
    );
    if (createUser) {
      send({ data: createUser, status: 200 }, res);
      const emailOptions = prepareEmail(
        correo,
        "Bienvenido a Bienestar - Sus credenciales de acceso",
        `
Estimado ${nombre},

Esperamos que se encuentre bien. Nos complace informarle que su cuenta en Bienestar Institucional ha sido creada exitosamente. Estamos emocionados de tenerlo con nosotros y de poder brindarle una experiencia excepcional en nuestro sistema.

A continuación, encontrará sus credenciales de acceso:

Correo: ${correo}
Contraseña: ${claveWithoutEncrypt}

Gracias por elegir Bienestar Institucional. Estamos seguros de que disfrutará de nuestra plataforma y de todo lo que tiene para ofrecer.

Cordialmente,

SoyUteísta
        `
      );
      mailer.sendMail(emailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo electrónico enviado: " + info.response);
        }
      });
    } else {
      send({ error: [GENERAL_ERROR], status: 403 }, res);
    }
  } catch (error) {
    send({ error: [USER_EXIST], status: 409 }, res);
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
  const users = `SELECT 
  usuarios.id_usuario AS usuarios_id_usuario,
  usuarios.nombre AS usuarios_nombre,
  usuarios.correo AS usuarios_correo,
  usuarios.ubicacion AS usuarios_ubicacion,
  usuarios.id_campus_area AS usuarios_id_campus_area,
  usuarios.id_rol AS usuarios_id_rol,
  usuarios.fecha_registro AS usuarios_fecha_registro,
  roles.id_rol AS roles_id_rol,
  roles.nombre AS roles_nombre,
  campus.id_campus AS campus_id_campus,
  campus.nombre AS campus_nombre,
  areas.id_area AS areas_id_area,
  areas.nombre AS areas_nombre
FROM usuarios
INNER JOIN campus_areas ON usuarios.id_campus_area = campus_areas.id_campus_area
INNER JOIN campus ON campus_areas.id_campus = campus.id_campus
INNER JOIN areas ON campus_areas.id_area = areas.id_area
INNER JOIN roles ON usuarios.id_rol = roles.id_rol
WHERE usuarios.id_rol = 2
ORDER BY usuarios.fecha_registro ASC
`;
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
  const { id_usuario, ubicacion, nombre } = req.body;
  const assignLocation = await mysql.executeQuery(
    "UPDATE usuarios SET ubicacion = ?, nombre = ? WHERE id_usuario = ?",
    [ubicacion, nombre, id_usuario]
  );
  assignLocation
    ? send({ data: assignLocation, status: 200 }, res)
    : send({ error: [USER_UPDATE_ERROR], status: 406 }, res);
  send({}, res);
};

const deleteNewService = async (req, res) => {
  const { id_area } = req.body;

  const countCampusAreasQuery =
    "SELECT COUNT(*) AS count FROM campus_areas WHERE id_area = ?";
  const countCampusAreasResult = await mysql.executeQuery(
    countCampusAreasQuery,
    [id_area]
  );
  const countCampusAreas = countCampusAreasResult[0].count;

  if (countCampusAreas > 0) {
    const deleteNewService = await mysql.executeQuery(
      "DELETE FROM areas WHERE id_area = ?",
      [id_area]
    );
    send({ data: deleteNewService, status: 200 }, res);
  } else {
    send({ error: [ERROR_DELETING_SERVICE], status: 304 }, res);
  }
};

const createNewService = async (req, res) => {
  const { nombre } = req.body;
  try {
    const createNewService = await mysql.executeQuery(
      "INSERT INTO areas (nombre) VALUES (?)",
      [nombre]
    );
    send({ data: createNewService, status: 200 }, res);
  } catch (error) {
    send({ error: [ERROR_CREATING_SERVICE], status: 304 }, res);
  }
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
  const { id_campus_area } = req.body;

  let usuariosPorIdCampus = await mysql.executeQuery(
    `SELECT usuarios.nombre, usuarios.id_usuario, 
    campus_areas.*, campus.id_campus as campus_id_campus, campus.nombre as nombre_campus, 
    areas.id_area as areas_id_area, areas.nombre as nombre_area
    FROM usuarios 
    INNER JOIN campus_areas ON campus_areas.id_campus_area = usuarios.id_campus_area 
    INNER JOIN areas on areas.id_area = campus_areas.id_area
    INNER JOIN campus on campus.id_campus = campus_areas.id_campus
    WHERE usuarios.id_campus_area = ? AND usuarios.id_rol = 2`,
    [id_campus_area]
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
  );
  send({ data: lastDateByProfessional, status: 200 }, res);
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
  );
  send({ data: closeDateByProfessional, status: 200 }, res);
};
const getAllAppointmentsByProfessional = async (req, res) => {
  const { id_usuario } = req.body;
  const getAllAppointmentsByProfessional = await mysql.executeQuery(
    `
    SELECT c.*, f.nombre AS franja_nombre, h.fecha AS cita_fecha
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
    ) AS proxima_horario ON proxima_horario.id_horario = c.id_horario
    JOIN horario h ON h.id_horario = c.id_horario
    JOIN franjas f ON f.id_franja = h.id_franja
    ORDER BY c.fecha_registro DESC;
    `,
    [id_usuario]
  );
  send({ data: getAllAppointmentsByProfessional, status: 200 }, res);
};
const getScheduleByProfessional = async (req, res) => {
  const { id_usuario } = req.body;
  const getScheduleByProfessional = await mysql.executeQuery(
    `
    SELECT h.id_horario, h.id_usuario, u.*, h.fecha, f.nombre AS franja_nombre
    FROM horario h
    INNER JOIN franjas f ON h.id_franja = f.id_franja
    INNER JOIN usuarios u ON h.id_usuario = u.id_usuario
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
WHERE h.id_usuario = ?
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
const createAppointment = async (req, res) => {
  const { id_horario, tomado_por, telefono, foto, nombre } = req.body;
  try {
    const createAppointment = await mysql.executeQuery(
      `INSERT INTO citas (id_horario, tomado_por, telefono, foto, nombre) VALUES (?, ?, ?, ?, ?)`,
      [id_horario, tomado_por, telefono, foto, nombre]
    );
    send({ data: createAppointment, status: 200 }, res);
  } catch (error) {
    send({ error: [BAD_SERVICE, error], status: 403 }, res);
  }
};
const serviciosBySede = async (req, res) => {
  const serviciosBySede = await mysql.executeQuery(
    `
    SELECT
    campus.id_campus,
    campus.nombre AS nombre_campus,
    areas.id_area,
    areas.nombre AS nombre_area,
    campus_areas.id_campus_area
  FROM
    campus
    INNER JOIN campus_areas ON campus.id_campus = campus_areas.id_campus
    INNER JOIN areas ON campus_areas.id_area = areas.id_area;  
  `
  );
  const campusData = {};

  serviciosBySede.forEach((row) => {
    const { id_campus, nombre_campus, id_area, nombre_area, id_campus_area } =
      row;

    if (!campusData[id_campus]) {
      campusData[id_campus] = {
        id_campus,
        nombre_campus,
        areas: [],
      };
    }

    campusData[id_campus].areas.push({ id_area, nombre_area, id_campus_area });
  });
  send({ data: Object.values(campusData), status: 200 }, res);
};
const servicesByIdCampus = async (req, res) => {
  const { id_campus } = req.body;
  const servicesByIdCampus = await mysql.executeQuery(
    `
    SELECT * FROM areas INNER JOIN campus_areas ON areas.id_area = campus_areas.id_area WHERE campus_areas.id_campus = ?
  `,
    [id_campus]
  );
  send({ data: servicesByIdCampus, status: 200 }, res);
};
const appointmentsByStudent = async (req, res) => {
  const { tomado_por } = req.body;
  const appointmentsByStudent = await mysql.executeQuery(
    `
    SELECT *
    FROM citas
    WHERE tomado_por = ?
    ORDER BY fecha_registro DESC
    LIMIT 10;    
  `,
    [tomado_por]
  );
  send({ data: appointmentsByStudent, status: 200 }, res);
};
const appointmentsByIdCampusArea = async (req, res) => {
  const { tomado_por, id_campus_area } = req.body;
  const appointmentsByIdCampusArea = await mysql.executeQuery(
    `
    SELECT ci.id_cita AS citas_id_cita,
    ci.id_horario AS citas_id_horario,
    ci.tomado_por AS citas_tomado_por,
    ci.asistido AS citas_asistido,
    ci.rechazado AS citas_rechazado,
    ci.rechazado_por AS citas_rechazado_por,
    ci.rechazado_correo AS citas_rechazado_correo,
    ci.rechazado_razon AS citas_rechazado_razon,
    ci.telefono AS citas_telefono,
    ci.foto AS citas_foto,
    ci.fecha_registro AS citas_fecha_registro,
    h.id_horario AS horario_id_horario,
    h.id_usuario AS horario_id_usuario,
    h.id_franja AS horario_id_franja,
    h.fecha AS horario_fecha,
    u.id_usuario AS usuarios_id_usuario,
    u.nombre AS usuarios_nombre,
    u.correo AS usuarios_correo,
    u.ubicacion AS usuarios_ubicacion,
    u.id_rol AS usuarios_id_rol,
    u.id_campus_area AS usuarios_id_campus_area,
    u.fecha_registro AS usuarios_fecha_registro,
    ca.id_campus_area AS campus_areas_id_campus_area,
    ca.id_campus AS campus_areas_id_campus,
    ca.id_area AS campus_areas_id_area,
    c.id_campus AS campus_id_campus,
    c.nombre AS campus_nombre,
    a.id_area AS areas_id_area,
    a.nombre AS areas_nombre
FROM citas ci
INNER JOIN horario h ON h.id_horario = ci.id_horario
INNER JOIN usuarios u ON u.id_usuario = h.id_usuario
INNER JOIN campus_areas ca ON ca.id_campus_area = u.id_campus_area
INNER JOIN campus c ON c.id_campus = ca.id_campus
INNER JOIN areas a ON a.id_area = ca.id_area
WHERE ci.tomado_por = ?
AND ca.id_campus_area = ?
  `,
    [tomado_por, id_campus_area]
  );
  send({ data: appointmentsByIdCampusArea, status: 200 }, res);
};
const deleteProfessional = async (req, res) => {
  const { id_usuario } = req.body;
  const deleteProfessional = await mysql.executeQuery(
    `
    DELETE FROM usuarios WHERE id_usuario = ?;
  `,

    [id_usuario]
  );
  send({ data: deleteProfessional, status: 200 }, res);
};
const dashboardHome = async (req, res) => {
  const { id_usuario } = req.body;
  const total = mysql.executeQuery(
    `
SELECT COUNT(*) as total
FROM citas c
JOIN horario h ON c.id_horario = h.id_horario
WHERE h.id_usuario = ? AND h.fecha >= @start_date AND h.fecha <= NOW();
  `,
    [id_usuario]
  );

  const accepted = mysql.executeQuery(
    `
SELECT COUNT(*) as accepted
FROM citas c
JOIN horario h ON c.id_horario = h.id_horario
WHERE h.id_usuario = ? AND c.rechazado = 0 AND h.fecha >= @start_date AND h.fecha <= NOW();

  `,
    [id_usuario]
  );

  const rejected = mysql.executeQuery(
    `
SELECT COUNT(*) as rejected
FROM citas c
JOIN horario h ON c.id_horario = h.id_horario
WHERE h.id_usuario = ? AND c.rechazado = 1 AND h.fecha >= @start_date AND h.fecha <= NOW();
  `,
    [id_usuario]
  );

  const attended = mysql.executeQuery(
    `
SELECT COUNT(*) as attended
FROM citas c
JOIN horario h ON c.id_horario = h.id_horario
WHERE h.id_usuario = ? AND c.asistido = 1 AND h.fecha >= @start_date AND h.fecha <= NOW();
  `,
    [id_usuario]
  );

  const notAttended = mysql.executeQuery(
    `
    SELECT COUNT(*) as not_attended
FROM citas c
JOIN horario h ON c.id_horario = h.id_horario
WHERE h.id_usuario = ? AND c.asistido = 0 AND h.fecha >= @start_date AND h.fecha <= NOW();
  `,
    [id_usuario]
  );

  const citasPasadas = mysql.executeQuery(
    `
    SELECT h.*, c.*
    FROM horario h
    LEFT JOIN citas c ON h.id_horario = c.id_horario
    WHERE h.id_usuario = ?
    AND h.fecha <= CURDATE()
    ORDER BY h.fecha DESC`,
    [id_usuario]
  );

  const citasProximas = mysql.executeQuery(
    `
    SELECT 
      u.nombre,
      u.correo,
      h.fecha,
      f.nombre AS franja,
      c.rechazado,
      c.asistido
        FROM 
          citas AS c
        JOIN 
          horario AS h ON c.id_horario = h.id_horario
        JOIN 
          usuarios AS u ON h.id_usuario = u.id_usuario
        JOIN 
          franjas AS f ON h.id_franja = f.id_franja
        WHERE
          h.id_usuario = ? AND h.fecha >= CURRENT_DATE
        ORDER BY
          h.fecha ASC;
    `,
    [id_usuario]
  );

  const totalCitas = await mysql.executeQuery(
    `
    SELECT 
  count(*) AS citas
FROM 
  citas AS c
JOIN 
  horario AS h ON c.id_horario = h.id_horario
JOIN 
  usuarios AS u ON h.id_usuario = u.id_usuario
JOIN 
  franjas AS f ON h.id_franja = f.id_franja
WHERE
  h.id_usuario = ? AND
  h.fecha >= DATE_FORMAT(NOW(), '%Y-%m-01') AND
  h.fecha < DATE_FORMAT(DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH), '%Y-%m-01')
ORDER BY
  h.fecha ASC;
  `,
    [id_usuario]
  );

  const citasAceptadas = await mysql.executeQuery(
    `
    SELECT 
    count(*) AS citas
    FROM 
    citas AS c
    JOIN 
    horario AS h ON c.id_horario = h.id_horario
    JOIN 
    usuarios AS u ON h.id_usuario = u.id_usuario
    JOIN 
    franjas AS f ON h.id_franja = f.id_franja
    WHERE
    h.id_usuario = ? AND
    h.fecha >= DATE_FORMAT(NOW(), '%Y-%m-01') AND
    h.fecha < DATE_FORMAT(DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH), '%Y-%m-01') AND
    c.rechazado = 0
    ORDER BY
    h.fecha ASC;
  `,
    [id_usuario]
  );

  const citasRechazadas = await mysql.executeQuery(
    `SELECT 
    count(*) AS citas
  FROM 
    citas AS c
  JOIN 
    horario AS h ON c.id_horario = h.id_horario
  JOIN 
    usuarios AS u ON h.id_usuario = u.id_usuario
  JOIN 
    franjas AS f ON h.id_franja = f.id_franja
  WHERE
    h.id_usuario = ? AND
    h.fecha >= DATE_FORMAT(NOW(), '%Y-%m-01') AND
    h.fecha < DATE_FORMAT(DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH), '%Y-%m-01') AND
    c.rechazado = 1
  ORDER BY
    h.fecha ASC;

  `,
    [id_usuario]
  );

  const appointments = await Promise.all([
    total,
    accepted,
    rejected,
    attended,
    notAttended,
    citasPasadas,
    citasProximas,
    totalCitas,
    citasAceptadas,
    citasRechazadas,
  ]);

  const [
    totalAppointments,
    acceptedAppointments,
    rejectedAppointments,
    attendedAppointments,
    notAttendedAppointments,
    citasPasadasAppointments,
    citasProximasAppointments,
    totalCitasAppointments,
    citasAceptadasAppointments,
    citasRechazadasAppointments,
  ] = appointments;

  send(
    {
      data: [
        { id_type_last: "total", value: totalAppointments[0].total },
        { id_type_last: "accepted", value: acceptedAppointments[0].accepted },
        { id_type_last: "rejected", value: rejectedAppointments[0].rejected },
        { id_type_last: "attended", value: attendedAppointments[0].attended },
        {
          id_type_last: "not_attended",
          value: notAttendedAppointments[0].not_attended,
        },
        { passed_appointments: citasPasadasAppointments },
        { upcoming_appointments: citasProximasAppointments },
        { id_type_upcoming: "total", value: totalCitasAppointments[0].citas },
        {
          id_type_upcoming: "aceptadas",
          value: citasAceptadasAppointments[0].citas,
        },
        {
          id_type_upcoming: "rechazadas",
          value: citasRechazadasAppointments[0].citas,
        },
      ],
      status: 200,
    },
    res
  );
};
const createCampusArea = async (req, res) => {
  const { id_area, id_campus } = req.body;

  try {
    const createCampusArea = await mysql.executeQuery(
      `
      INSERT INTO campus_areas (id_area, id_campus) VALUES (?, ?);
    `,
      [id_area, id_campus]
    );

    send({ data: createCampusArea, status: 200 }, res);
  } catch (error) {
    send({ error: [ERROR_CREATING_CAMPUS_AREA], status: 403 }, res);
  }
};
const servicesNotInCampus = async (req, res) => {
  const { id_campus } = req.body;

  const query = `
    SELECT a.*
    FROM areas a
    WHERE a.id_area NOT IN (
      SELECT ca.id_area
      FROM campus_areas ca
      WHERE ca.id_campus = ?
    )
  `;

  const result = await mysql.executeQuery(query, [id_campus]);
  send({ data: result, status: 200 }, res);
};
const deleteCampusArea = async (req, res) => {
  const { id_campus_area } = req.body;

  const countUsuariosQuery =
    "SELECT COUNT(*) AS count FROM usuarios WHERE id_campus_area = ?";
  const countUsuariosResult = await mysql.executeQuery(countUsuariosQuery, [
    id_campus_area,
  ]);
  const countUsuarios = countUsuariosResult[0].count;

  if (countUsuarios > 0) {
    send({ error: [ERROR_DELETING_CAMPUS_AREA], status: 304 }, res);
  } else {
    const deleteNewService = await mysql.executeQuery(
      "DELETE FROM campus_areas WHERE id_campus_area = ?",
      [id_campus_area]
    );
    send({ data: deleteNewService, status: 200 }, res);
  }
};

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
  dashboardHome,
  assignLocation,
  serviciosBySede,
  createCampusArea,
  deleteCampusArea,
  deleteNewService,
  createNewService,
  createAppointment,
  deleteProfessional,
  servicesByIdCampus,
  closeDateByStudent,
  servicesNotInCampus,
  appointmentsByStudent,
  getProfessionalBySede,
  lastDateByProfessional,
  closeDateByProfessional,
  getFranjasByProfessional,
  getScheduleByProfessional,
  appointmentsByIdCampusArea,
  nextPastDatesByProfessional,
  createScheduleByProfessional,
  getAllAppointmentsByProfessional,
  generatePDF,
};
