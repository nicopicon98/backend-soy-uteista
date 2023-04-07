const { mysql } = require("@src/common/conexiones/conexionMysql");

class TimeSlotRepository {
  async getAllTimeSlots() {
    return await mysql.executeQuery("SELECT * FROM time_slots");
  }

  async getTimeSlotsByProfessional(professional_id, start, end) {
    return await mysql.executeQuery(
      `SELECT * from time_slots ts WHERE NOT EXISTS ( SELECT 1 FROM schedules s WHERE s.time_slot_id = ts.time_slot_id AND s.date BETWEEN ? AND ? AND s.professional_id = ? );`,
      [start, end, professional_id]
    );
  }
}

module.exports = new TimeSlotRepository();