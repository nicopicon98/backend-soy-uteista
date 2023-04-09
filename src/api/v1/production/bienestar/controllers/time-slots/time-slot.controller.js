const { send } = require("@api_bienestar/config");
const TimeSlotService = require("@api_bienestar/services/time-slot");

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
      const { id_user } = req.body;
      const timeSlots = await TimeSlotService.getAllTimeSlots();
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
      const { id_professional } = req.body;
      const timeSlotsByProfessional =
        await TimeSlotService.getTimeSlotsByProfessional(id_professional);

      send({ data: timeSlotsByProfessional, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = TimeSlotController;
