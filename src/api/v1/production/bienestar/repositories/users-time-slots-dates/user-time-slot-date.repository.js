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
      const [row] = await mysql.executeQuery(
        "SELECT * FROM users_time_slots_dates WHERE id_user_time_slot_date = ?",
        [id_user_time_slot_date]
      );
      if (!row) {
        throw new Error("No se encontró un horario con ese ID.");
      }
      // Delete the register if it exists
      const resp = await mysql.executeQuery(
        "DELETE FROM users_time_slots_dates WHERE id_user_time_slot_date = ?",
        [id_user_time_slot_date]
      );
      return resp;
    } catch (error) {
      console.log(error, "error");
      if (error.code === "ER_ROW_IS_REFERENCED_2" || error.errno === 1451) {
        throw new Error(
          "No se puede eliminar este horario debido a que existen citas vinculadas a este. Puedes rechazarla en el apartado de citas"
        );
      } else {
        throw new Error(
          "Ocurrió un error al eliminar esta cita: " + error.message
        );
      }
    }
  }

  static async getUpcomingByCampus(id_campus) {
    console.log(id_campus, "atacando en el respositorio");
    try {
      const query = `
      SELECT DISTINCT
      utd.id_user_time_slot_date,
      utd.date,
      utd.id_time_slot,
      u.id_user,
      cf.id_campus
  FROM
      users_time_slots_dates utd
  JOIN
      users u ON utd.id_user = u.id_user
  JOIN
      campuses_fields cf ON u.id_campus_field = cf.id_campus_field
  JOIN
      campuses c ON cf.id_campus = c.id_campus
  WHERE
      cf.id_campus_field = ?
      AND utd.date >= CURDATE()
  ORDER BY
      utd.date ASC, utd.id_time_slot ASC;  
        `;
      const result = await mysql.executeQuery(query, [id_campus]);
      return result;
    } catch (error) {
      console.log(error, "error");
      throw new Error("Error consultando las fechas: " + error.message);
    }
  }
}

module.exports = UserTimeSlotsDateRepository;
