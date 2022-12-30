const { run } = require("../conexiones/conexionOracle");
const { obtainDomainName } = require("../obtainDomain");


const ERROR_0 =
  "Hemos detectado que no eres estudiante, pero eres uteísta, así que podrás ver las últimas noticias, la agenda de eventos UTS y nuestra revista";
const ERROR_2 = "'|'[-||(_+[] #/-//|3/2[-, desencriptelo mi papa!";
const ERROR_3 =
  "El usuario ingresado presenta una de las siguientes opciones: No cuenta con una matricula vigente o materias inscritas";

const carnet = async (email) => {
  const conn = await run();
  const result = await conn.execute(
    `select * from table(academico.RETURN_OBJECTS_APP_CARNE('${email}'))`
  );
  await conn.close();
  const getDomain = obtainDomainName(email);
  if (getDomain == "uts.edu.co") {
    const resp = result.rows;
    if (resp.length > 0) {
      return({ result: 1, data: resp[0], error: "" });
    } else {
      return({ result: 3, data: {}, error: ERROR_3 });
    }
  } else if (getDomain == "correo.uts.edu.co") {
    return({ result: 0, data: {}, error: ERROR_0 });
  } else {
    return({ result: 2, data: {}, error: ERROR_2 });
  }
};

module.exports = {
  carnet,
};
