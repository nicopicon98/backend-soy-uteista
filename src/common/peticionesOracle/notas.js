const { run } = require("../conexiones/conexionOracle");
const { obtainDomainName } = require("../obtainDomain");

const notas = async (email) => {
  const conn = await run();
  const result = await conn.execute(
    `select * from table(academico.RETURN_OBJECTS_APP_NOTAS('${email}'))`
  );
  await conn.close();

  const filas = result.rows;

  if (filas.length > 0) {
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

    const materias3 = groupBy(filas, "N_MATE_NOMBRE");

    const array2 = [];

    for (const x in materias3) {
      let key = x;
      let value = materias3[x];

      array2.push({
        materia: key,
        infoMateria: value,
      });
    }

    let cortes = null;
    let array3 = [];

    array2.forEach((e, index) => {
      cortes = groupBy(e.infoMateria, "N_EVAC_DESCRIPCION");
      for (const key in cortes) {
        array3.push({
          corte: key,
          infoCorte: cortes[key],
        });
      }
      array2[index].infoMateria = [...array3];
      array3 = [];
    });

    let notaFinalCorte = 0;

    array2.forEach((e, indexMateria) => {
      //objeto -> {materia, infoMateria}
      e.infoMateria.forEach((f, indexCorte) => {
        //objeto -> {corte, infoCorte}
        f.infoCorte.forEach((g) => {
          notaFinalCorte += g.N_CALF_VALOR * g.N_NOTA_PESO;
        });
        array2[indexMateria].infoMateria[indexCorte].infoCorte.push({
          N_NOTA_DESCRIPCION: "DEFINITIVA CORTE",
          N_CALF_VALOR: parseFloat(
            (Math.round((notaFinalCorte / 10).toFixed(1)) / 10).toFixed(1)
          ),
        });
        notaFinalCorte = 0;
      });
    });

    let notaFinalMateria = 0;
    let esHabilitaciones = false;
    let notaHabilitacion = 0;
    array2.forEach((e) => {
      //e -> {materia, infoMateria}
      e.infoMateria.forEach((f) => {
        //f -> {corte, infoCorte}
        const { corte } = f;
        const notaCorte = f.infoCorte[f.infoCorte.length - 1].N_CALF_VALOR;
        if (corte === "HABILITACIONES") {
          notaHabilitacion = notaCorte;
          esHabilitaciones = true;
          return;
        }
        if (corte === "TERCER CORTE") {
          notaFinalMateria += notaCorte * 0.34 * 100;
        } else {
          notaFinalMateria += notaCorte * 0.33 * 100;
        }
      });

      if (esHabilitaciones) {
        const notaFinalMateriaTemp = (
          Math.round((notaFinalMateria / 10).toFixed(1)) / 10
        ).toFixed(1);
        const notafinal = (+notaFinalMateriaTemp + notaHabilitacion) / 2;
        e.infoMateria.push({
          corte: "NOTA FINAL",
          infoCorte: notafinal.toFixed(2) + " Revisa la plataforma",
        });
      } else {
        e.infoMateria.push({
          corte: "NOTA FINAL",
          infoCorte: parseFloat(
            (Math.round((notaFinalMateria / 10).toFixed(1)) / 10).toFixed(1)
          ),
        });
      }

      notaFinalMateria = 0;
      esHabilitaciones = false;
    });

    return { result: 1, data: array2, error: "" };
  } else {
    return { result: 1, data: {}, error: "" };
  }
};

module.exports = {
  notas,
};
