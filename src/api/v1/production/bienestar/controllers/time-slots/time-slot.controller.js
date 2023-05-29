const { send } = require("../../config");
const TimeSlotService = require("../../services/time-slots");
const { CampusFormatter } = require("../../utilities");

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

  /**
   * Gets time slots by campus.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getUpcomingTimeSlotsByCampus(req, res) {
    try {
      const { id_campus } = req.body;
  
      const id_campus_formatted = CampusFormatter.isNumber(id_campus)
        ? id_campus
        : CampusFormatter.campusMapping[id_campus] || "1";
  
      const timeSlotsByCampus = await TimeSlotService.getUpcomingTimeSlotsByCampus(id_campus_formatted);
  
      res.status(200).json({ data: timeSlotsByCampus });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = TimeSlotController;
