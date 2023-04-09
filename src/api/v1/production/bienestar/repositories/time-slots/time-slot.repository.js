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
}

module.exports = new TimeSlotRepository();
