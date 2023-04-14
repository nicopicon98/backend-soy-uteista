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

  static daysBetween(startDateString, endDateString) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Calculate the difference in milliseconds
    const diffMilliseconds = Math.abs(endDate - startDate);

    // Convert milliseconds to days and return the result
    return Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));
  }

  static async insert(id_user, user_time_slots_date) {
    const { startDate, endDate, time_slots } = user_time_slots_date;

    const sql = `
      INSERT INTO users_time_slots_dates (id_user, date, id_time_slot)
      VALUES (?, ?, ?)
    `;
    const distance = UserTimeSlotsDateRepository.daysBetween(
      startDate,
      endDate
    );
    const startDateFormatted = new Date(startDate);
    try {
      for (let i = 0; i <= distance; i++) {
        for (let j = 0; j < time_slots.length; j++) {
          await mysql.executeQuery(sql, [
            id_user,
            startDateFormatted.toISOString().substring(0, 10),
            time_slots[j],
          ]);
        }
        startDateFormatted.setDate(startDateFormatted.getDate() + 1);
      }
      return "Insertado con exito";
    } catch (error) {
      throw new Error(
        "Ocurrio un problema al insertar" +
          JSON.stringify(error.message, null, 2)
      );
    }
  }

  static async delete(id_user_time_slot_date) {
    try {
      // Check if the register exists
      const row = await mysql.executeQuery(
        "SELECT * FROM users_time_slots_dates WHERE id_user_time_slot_date = ?",
        [id_user_time_slot_date]
      );

      if (!row.length) {
        throw new Error("No se encontró una cita con ese ID.");
      }

      if (row.rejected === 0) {
        throw new Error(
          "No se puede eliminar una cita que no ha sido rechazada."
        );
      }

      // Delete the register if it exists and has rejected = 1
      return mysql.executeQuery(
        "DELETE FROM users_time_slots_dates WHERE id_user_time_slot_date = ?",
        [id_user_time_slot_date]
      );
    } catch (error) {
      throw new Error(
        "Ocurrió un error al eliminar esta cita: " + error.message
      );
    }
  }
}

module.exports = UserTimeSlotsDateRepository;
