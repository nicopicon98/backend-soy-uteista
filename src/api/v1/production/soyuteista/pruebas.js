const { mysqlConnection } = require("../../../../common/conexiones/conexionMysql");


const con = new mysqlConnection()
con.executeQuery("select usuarios.nombre, usuarios.id_usuario as usuariosIdUsuario,horario.id_horario, horario.fecha, horario.id_usuario, horario.id_franja as horarioIdFranja, franjas.id_franja as franjasIdFranja, franjas.nombre as nombreFranja from horario left join citas on citas.id_horario = horario.id_horario inner join usuarios ON usuarios.id_usuario = horario.id_usuario inner join franjas ON franjas.id_franja = horario.id_franja WHERE horario.id_horario not in (select id_horario from citas)", []).then(e => {
    console.log(e)
})
  