const { mysql } = require("@src/common/conexiones/conexionMysql");

class UserTimeSlotsDateRepository {
  static async getAllByUserId(id_professional) {
    const query = `
      SELECT
        users_time_slots_dates.date,
        GROUP_CONCAT(time_slots.id_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_ids,
        GROUP_CONCAT(time_slots.name_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_names,
        GROUP_CONCAT(users_time_slots_dates.id_user_time_slot_date ORDER BY time_slots.id_time_slot) AS user_time_slot_ids
      FROM
        users_time_slots_dates
        JOIN users ON users_time_slots_dates.id_user = users.id_user
        JOIN time_slots ON users_time_slots_dates.id_time_slot = time_slots.id_time_slot
      WHERE
        users.id_user = ?
      GROUP BY
        users_time_slots_dates.date
      ORDER BY
        users_time_slots_dates.date ASC;
    `;
    return mysql.executeQuery(query, [id_professional]);
  }

  static async insert(id_user, user_time_slots_date) {
    const { startDate, endDate, time_slots } = user_time_slots_date;
    // return { id_user, user_time_slots_date };
    const checkSql = `
      SELECT * FROM users_time_slots_dates WHERE id_user = ? AND date = ? AND id_time_slot = ?
    `;

    const sql = `
      INSERT INTO users_time_slots_dates (id_user, date, id_time_slot)
      VALUES (?, ?, ?)
    `;
    const start = new Date(startDate);
    const end = new Date(endDate);

    try {
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        for (const time_slot of time_slots) {
          const rows = await mysql.executeQuery(checkSql, [
            id_user,
            date.toISOString().substring(0, 10),
            time_slot,
          ]);
          if (rows.length === 0) {
            await mysql.executeQuery(sql, [
              id_user,
              date.toISOString().substring(0, 10),
              time_slot,
            ]);
          }
        }
      }
      return "Insertado con exito"
    } catch (error) {
      throw new Error("Ocurrio un problema al insertar")
    }
  }
}

module.exports = UserTimeSlotsDateRepository;
