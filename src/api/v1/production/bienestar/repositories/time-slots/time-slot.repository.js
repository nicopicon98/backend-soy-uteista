const { mysql } = require("@src/common/conexiones/conexionMysql");

class TimeSlotRepository {
  async getAllTimeSlots() {
    return await mysql.executeQuery("SELECT * FROM time_slots");
  }

  async getTimeSlotsByProfessional(id_professional) {
    return await mysql.executeQuery(
      `SELECT time_slots.id_time_slot, time_slots.name_time_slot, schedules.id_schedule, schedules.date
        FROM time_slots
          JOIN schedules ON time_slots.id_time_slot = schedules.id_time_slot
          JOIN users ON schedules.id_user = users.id_user
        WHERE users.id_user = ?`,
      [id_professional]
    );
  }

  async getUpcomingTimeSlotsByCampus(id_campus) {
    return await mysql.executeQuery(
      `SELECT users_time_slots_dates.id_user_time_slot_date, users_time_slots_dates.date, users_time_slots_dates.id_time_slot, users.id_user, users.id_campus_field 
        FROM users_time_slots_dates 
        JOIN users ON users_time_slots_dates.id_user = users.id_user 
        WHERE users.id_campus_field = ? AND users_time_slots_dates.date > CURDATE()`,
      [id_campus]
    );
  }
  
}

module.exports = new TimeSlotRepository();
