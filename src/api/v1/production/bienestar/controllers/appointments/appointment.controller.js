const { send } = require("@api_bienestar/config");
const AppointmentService = require('../../services/appointments');

class AppointmentController {
  static async getUpcomingAppointmentByProfessional(req, res) {
    try {
      const { id_user } = req.body;
      const appointment =
        await AppointmentService.getUpcomingAppointmentByProfessional(id_user);
      send({ data: appointment, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}
7;
module.exports = AppointmentController;
