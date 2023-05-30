const { send } = require("@api_bienestar/config");
const UserTimeSlotsDateService = require("../../services/users-time-slots-dates");
const { CampusFormatter } = require("../../utilities");

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
      const { id_user, user_time_slots_date } = req.body;
      const result = await UserTimeSlotsDateService.insert(
        id_user,
        user_time_slots_date
      );
      send({ data: result, status: 201 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * Gets time slots by campus.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getUpcomingByCampus(req, res) {
    try {
      const { id_campus_field } = req.body;
      console.log(id_campus_field, "atacando en controller")
      const id_campus_field_formatted = CampusFormatter.isNumber(id_campus_field)
        ? id_campus_field
        : CampusFormatter.campusMapping[id_campus_field_formatted] || "1";

      const usersTimeSlotsDatesByCampus =
        await UserTimeSlotsDateService.getUpcomingByCampus(id_campus_field_formatted);
        console.log(usersTimeSlotsDatesByCampus, "este es el valor formateado y asi se fue para rta")

      // If successful, send data with status code 200
      send({ data: usersTimeSlotsDatesByCampus, status: 200 }, res);
    } catch (error) {
      // If error, send error message with status code 500
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async delete(req, res) {
    try {
      const { id_user_time_slot_date } = req.body;
      const result = await UserTimeSlotsDateService.delete(
        id_user_time_slot_date
      );
      send({ data: "Franja horaria eliminada con exito", status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = UserTimeSlotsDateController;
