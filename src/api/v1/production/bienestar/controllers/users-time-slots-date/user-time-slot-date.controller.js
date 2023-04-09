const { send } = require("@api_bienestar/config");
const UserTimeSlotsDateService = require("../../services/user-time-slots-date");

/**
 * Class representing the User Time Slots Date Controller.
 * @class
 */
class UserTimeSlotsDateController {
  /**
   * Gets all user time slots dates for a given professional.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getAllByProfessional(req, res) {
    try {
      const { id_professional } = req.body;
      const userTimeSlotsDates =
        await UserTimeSlotsDateService.getAllByProfessional(id_professional);
      send({ data: userTimeSlotsDates, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async insert(req, res) {
    try {
      const { id_user, users_time_slots_dates } = req.body;
      const result = await UserTimeSlotsDateService.insert(id_user, users_time_slots_dates);
      send({ data: result, status: 201 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = UserTimeSlotsDateController;