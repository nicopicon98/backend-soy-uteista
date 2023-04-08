const { send } = require("@api_bienestar/config/crypto.config");
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
      const { professional_id } = req.params;
      const userTimeSlotsDates =
        await UserTimeSlotsDateService.getAllByProfessional(+professional_id);
      send({ data: userTimeSlotsDates, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = UserTimeSlotsDateController;
