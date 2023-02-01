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
            date: key.format("yyyy/mm/dd"),
            franjas: value,
        });
    }
    let cortes = null;
    let array3 = [];


    array2.forEach((e, index) => {
        cortes = groupBy(e.franjas, "franjasIdFranja");
        
        for (const key in cortes) {
            array3.push({
                id_horario: key,
                nombre: cortes[key][0].nombreFranja,
            });
        }
        array2[index].franjas = [...array3];
        array3 = [];
    })
    
    console.log(JSON.stringify(array2, null, 2))
})
