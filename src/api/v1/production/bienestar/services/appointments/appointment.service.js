const AppointmentRepository = require("../../repositories/appointments");

class AppointmentService {
  static getUpcomingByProfessional(id_user) {
    return AppointmentRepository.getUpcomingByProfessional(id_user);
  }

  static getAllUpcomingByProfessional(id_user) {
    return AppointmentRepository.getAllUpcomingByProfessional(id_user);
  }

  static getLastByProfessional(id_user) {
    return AppointmentRepository.getLastByProfessional(id_user);
  }

  static getAllLastMonthToNowByProfessional(id_user) {
    return AppointmentRepository.getAllLastMonthToNowByProfessional(id_user);
  }

  static getAllLastByProfessional(id_user) {
    return AppointmentRepository.getAllLastByProfessional(id_user);
  }

  static insert(appointmentData) {
    return AppointmentRepository.insert(appointmentData);
  }
}

module.exports = AppointmentService;
