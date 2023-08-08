const { run } = require("../conexiones/conexionOracle");
const { obtainDomainName } = require("../obtainDomain");

const ERROR_0 =
  "Hemos detectado que no eres estudiante, pero eres uteísta, así que podrás ver las últimas noticias, la agenda de eventos UTS y nuestra revista";
const ERROR_2 = "'|'[-||(_+[] #/-//|3/2[-, desencriptelo mi papa!";

const horario = async (email) => {
  const conn = await run();
  const result = await conn.execute(
    `select * from table(academico.RETURN_OBJECTS_APP_HORARIO('${email}'))`
  );
  let newData;
  if (result.rows.length > 0) {
    const materias_ins = [];
    result.rows.forEach((e) => {
      const materia = {
        CODIGO_MATERIA: e.H_MATE_CODIGOMATERIA,
        NOMBRE_MATERIA: e.H_MATE_NOMBRE,
        GRUPO: e.H_GRUP_NOMBRE,
        DIA: e.H_CLSE_DIA,
        HORA_INICIO: e.H_BLHO_HORAINICIO,
        HORA_FINAL: e.H_BLHO_HORAFINAL,
        SALON: e.H_REFI_NOMENCLATURA,
        DESCRIPCION: e.H_LOCA_DESCRIPCION,
      };
      materias_ins.push(materia);
    });
    newData = {
      ID: result.rows[0].H_ESTP_ID,
      CEDULA: result.rows[0].H_PEGE_DOCUMENTOIDENTIDAD,
      NOMBRE: `${result.rows[0].H_PENG_PRIMERNOMBRE} ${result.rows[0].H_PENG_SEGUNDONOMBRE} ${result.rows[0].H_PENG_PRIMERAPELLIDO} ${result.rows[0].H_PENG_SEGUNDOAPELLIDO}`,
      SEDE: result.rows[0].H_UNID_NOMBRE,
      NOMBRE_PROGRAMA: result.rows[0].H_PROG_NOMBRE,
      CORREO_INSTITUCIONAL: result.rows[0].H_PENG_EMAILINSTITUCIONAL,
      MATERIAS: materias_ins,
    };
  } else {
    newData = {};
  }

  await conn.close();

  const getDomain = obtainDomainName(email);
  if (getDomain == "uts.edu.co") {
    const resp = newData;
    if (resp.ID != null) {
      return { result: 1, data: resp, error: "" };
    } else {
      return { result: 1, data: {}, error: "" };
    }
  } else if (getDomain == "correo.uts.edu.co") {
    return {
      result: 0,
      data: {},
      error: ERROR_0,
    };
  } else {
    return {
      result: 2,
      data: {},
      error: ERROR_2,
    };
  }
};

const getScheduleByDocument = async (document) => {
  const conn = await run();
  try {
    const result = await conn.execute(
      `SELECT * FROM table(academico.RETURN_OBJECTS_APP_HORA_QR(${document}))`
    );
    let newData;
    if (result.rows.length > 0) {
      const materias_ins = [];
      result.rows.forEach((e) => {
        const materia = {
          CODIGO_MATERIA: e.H_MATE_CODIGOMATERIA,
          NOMBRE_MATERIA: e.H_MATE_NOMBRE,
          GRUPO: e.H_GRUP_NOMBRE,
          DIA: e.H_CLSE_DIA,
          HORA_INICIO: e.H_BLHO_HORAINICIO,
          HORA_FINAL: e.H_BLHO_HORAFINAL,
          SALON: e.H_REFI_NOMENCLATURA,
          DESCRIPCION: e.H_LOCA_DESCRIPCION,
        };
        materias_ins.push(materia);
      });
      newData = {
        ID: result.rows[0].H_ESTP_ID,
        CEDULA: result.rows[0].H_PEGE_DOCUMENTOIDENTIDAD,
        NOMBRE: `${result.rows[0].H_PENG_PRIMERNOMBRE} ${result.rows[0].H_PENG_SEGUNDONOMBRE} ${result.rows[0].H_PENG_PRIMERAPELLIDO} ${result.rows[0].H_PENG_SEGUNDOAPELLIDO}`,
        SEDE: result.rows[0].H_UNID_NOMBRE,
        NOMBRE_PROGRAMA: result.rows[0].H_PROG_NOMBRE,
        CORREO_INSTITUCIONAL: result.rows[0].H_PENG_EMAILINSTITUCIONAL,
        MATERIAS: materias_ins,
      };
    } else {
      newData = {};
    }
    if (resp.ID != null) {
      return { result: 1, data: newData, error: "" };
    } else {
      return { result: 1, data: {}, error: "" };
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

module.exports = {
  horario,
  getScheduleByDocument
};
