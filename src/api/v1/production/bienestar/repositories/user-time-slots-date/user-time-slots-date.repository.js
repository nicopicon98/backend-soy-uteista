const { mysql } = require("@src/common/conexiones/conexionMysql");

class UserTimeSlotsDateRepository {
  static async getAllByUserId(professional_id) {
    const query = `
      SELECT
        user_time_slots_date.date,
        GROUP_CONCAT(time_slots.id_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_ids,
        GROUP_CONCAT(time_slots.name_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_names,
        GROUP_CONCAT(user_time_slots_date.id_user_time_slot_date ORDER BY time_slots.id_time_slot) AS user_time_slot_ids
      FROM
        user_time_slots_date
        JOIN users ON user_time_slots_date.id_user = users.id_user
        JOIN time_slots ON user_time_slots_date.id_time_slot = time_slots.id_time_slot
      WHERE
        users.id_user = ?
      GROUP BY
        user_time_slots_date.date
      ORDER BY
        user_time_slots_date.date ASC;
    `;
    return mysql.executeQuery(query, [professional_id]);
  }

  static async insert(professional_id, time_slots_date) {
    const sql = `
      INSERT INTO user_time_slots_date (professional_id, time_slots_date)
      VALUES (?, ?)
    `;
    const connection = await mysql.connect();
    const [rows] = await connection.query(sql, [
      professional_id,
      time_slots_date,
    ]);
    connection.end();
    return rows.affectedRows > 0
      ? { message: "User time slots date inserted successfully" }
      : { message: "Failed to insert user time slots date" };
  }
}

module.exports = UserTimeSlotsDateRepository;
