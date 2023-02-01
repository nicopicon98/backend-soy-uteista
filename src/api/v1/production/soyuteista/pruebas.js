const { mysqlConnection } = require("../../../../common/conexiones/conexionMysql");

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
const array2 = [];




const con = new mysqlConnection()
con.executeQuery("select usuarios.nombre, usuarios.id_usuario as usuariosIdUsuario,horario.id_horario, horario.fecha, horario.id_usuario, horario.id_franja as horarioIdFranja, franjas.id_franja as franjasIdFranja, franjas.nombre as nombreFranja from horario left join citas on citas.id_horario = horario.id_horario inner join usuarios ON usuarios.id_usuario = horario.id_usuario inner join franjas ON franjas.id_franja = horario.id_franja WHERE horario.id_horario not in (select id_horario from citas)", []).then(e => {

    const materias3 = groupBy(e, "fecha");

    for (const x in materias3) {
        let key = x;
        let value = materias3[x];

        array2.push({
            materia: key,
            infoMateria: value,
          });
    }
    console.log(materias3)
    console.log(array2)
})
