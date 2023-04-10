const { send } = require("@api_bienestar/config");
const AppointmentService = require("../../services/appointments");
const { HTTP_HANDLING_MSGS } = require("../../utilities");

class AppointmentController {
  static async getUpcomingByProfessional(req, res) {
    try {
      const { id_user } = req.body;
      const appointment = await AppointmentService.getUpcomingByProfessional(
        id_user
      );
      send({ data: appointment, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async getAllUpcomingByProfessional(req, res) {
    try {
      const { id_user } = req.body;
      const appointments =
        await AppointmentService.getAllUpcomingByProfessional(id_user);
      send({ data: appointments, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async getLastByProfessional(req, res) {
    try {
      const { id_user } = req.body;
      const appointment = await AppointmentService.getLastByProfessional(
        id_user
      );
      send({ data: appointment, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async insert(req, res) {
    try {
      const appointmentData = req.body;
      console.log(appointmentData, "from controller");
      await AppointmentService.insert(appointmentData);
      send(
        {
          data: HTTP_HANDLING_MSGS.successInsert("cita", ". Podrás revisar el estado de tu cita desde el apartado 'mis citas'."),
          status: 200,
        },
        res
      );
      send({ data: result, status: 201 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}
module.exports = AppointmentController;
