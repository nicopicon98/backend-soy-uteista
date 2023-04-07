const { mysql } = require("../../../../../../common/conexiones/conexionMysql");
const { send } = require("../../config/crypto.config");

/**
 * Class representing the Time Slot Controller.
 * @class
 */
class TimeSlotController {
  /**
   * Gets all time slots.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getAllTimeSlots(req, res) {
    try {
      const timeSlots = await mysql.executeQuery("SELECT * FROM time_slots");
      send({ data: timeSlots, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * Gets time slots by professional.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getTimeSlotsByProfessional(req, res) {
    try {
      const { professional_id, dates } = req.body;
      const [start, end] = dates;
      const timeSlotsByProfessional = await mysql.executeQuery(
        `SELECT * from time_slots ts WHERE NOT EXISTS ( SELECT 1 FROM schedules s WHERE s.time_slot_id = ts.time_slot_id AND s.date BETWEEN ? AND ? AND s.professional_id = ? );`,
        [start, end, professional_id]
      );
      send({ data: timeSlotsByProfessional, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = TimeSlotController;
