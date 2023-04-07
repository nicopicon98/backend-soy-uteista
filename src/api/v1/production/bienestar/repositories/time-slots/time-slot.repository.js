const { mysql } = require("@src/common/conexiones/conexionMysql");

class TimeSlotRepository {
  async getAllTimeSlots() {
    return await mysql.executeQuery("SELECT * FROM time_slots");
  }

  async getTimeSlotsByProfessional(professional_id) {
    return await mysql.executeQuery(
      `SELECT time_slots.*
        FROM time_slots
          JOIN schedules ON time_slots.id_time_slot = schedules.id_time_slot
          JOIN users ON schedules.id_user = users.id_user
        WHERE users.id_user = ?`,
      [professional_id]
    );
  }
}

module.exports = new TimeSlotRepository();
