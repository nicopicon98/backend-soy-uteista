const { mysql } = require("@src/common/conexiones/conexionMysql");

class AppointmentRepository {
  static async getUpcomingByProfessional(id_user) {
    const query = `
      SELECT
      a.photo_student,
      a.name_student,
      a.registration_date,
      a.phone_student,
      ut.date,
      ts.name_time_slot
    FROM
      appointments a
    JOIN
      users_time_slots_dates ut
      ON a.id_user_time_slot_date = ut.id_user_time_slot_date
    JOIN
      time_slots ts
      ON ut.id_time_slot = ts.id_time_slot
    WHERE
      ut.date >= CURDATE() AND ut.id_user = ?
    ORDER BY
      ut.date ASC,
      SUBSTRING_INDEX(ts.name_time_slot, ' - ', 1) ASC
    LIMIT 1
      `;
    const result = await mysql.executeQuery(query, [id_user]);
    if (!result.length) {
      return "No tienes citas pendientes";
    }
    return result[0];
  }

  static async getAllUpcomingByProfessional(id_user) {
    const query = `
      SELECT
        a.photo_student,
        a.name_student,
        a.registration_date,
        a.phone_student,
        a.attended,
        ut.date,
        ts.name_time_slot
      FROM
        appointments a
      JOIN
        users_time_slots_dates ut
        ON a.id_user_time_slot_date = ut.id_user_time_slot_date
      JOIN
        time_slots ts
        ON ut.id_time_slot = ts.id_time_slot
      WHERE
        ut.date >= CURDATE() AND ut.id_user = 76
      ORDER BY
        ut.date ASC,
        SUBSTRING_INDEX(ts.name_time_slot, ' - ', 1) ASC`;
    const result = await mysql.executeQuery(query, [id_user]);
    if (!result.length) {
      return "No tienes citas pendientes";
    }
    return result;
  }

  static async getLastByProfessional(id_user) {
    const query = `
    SELECT
  a.photo_student,
  a.name_student,
  a.registration_date,
  a.phone_student,
  a.attended,
  ut.date,
  ts.name_time_slot
FROM
  appointments a
JOIN
  users_time_slots_dates ut
  ON a.id_user_time_slot_date = ut.id_user_time_slot_date
JOIN
  time_slots ts
  ON ut.id_time_slot = ts.id_time_slot
WHERE
  ut.date < CURDATE() AND ut.id_user = ? AND a.rejected_by IS NULL
ORDER BY
  ut.date DESC,
  SUBSTRING_INDEX(ts.name_time_slot, ' - ', 1) DESC
LIMIT 1
    `;
    const result = await mysql.executeQuery(query, [id_user]);
    console.log(result)
    if (!result.length) {
      return "No tienes ninguna cita previa";
    }
    return result[0];
  }

  static async insert(appointmentData) {
    const {
      booked_by,
      phone_student,
      photo_student,
      name_student,
      id_user_time_slot_date,
    } = appointmentData;
  
    const query = `
      INSERT INTO appointments (booked_by, phone_student, photo_student, name_student, id_user_time_slot_date)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    const result = await mysql.executeQuery(query, [
      booked_by,
      phone_student,
      photo_student,
      name_student,
      id_user_time_slot_date,
    ]);
  
    return result.insertId;
  }
}

module.exports = AppointmentRepository;
