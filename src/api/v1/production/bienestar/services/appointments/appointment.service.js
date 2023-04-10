const AppointmentRepository = require('../../repositories/appointments');

class AppointmentService {
  static getUpcomingAppointmentByProfessional(id_user) {
    return AppointmentRepository.getUpcomingAppointmentByProfessional(id_user);
  }

  static getLastAppointmentByProfessional(id_user) {
    return AppointmentRepository.getLastAppointmentByProfessional(id_user);
  }
}

module.exports = AppointmentService;