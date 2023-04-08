const UserRepository = require("../../repositories/user");

class UserService {
  static async getAllProfessionalsByCampusField(id_campus_field) {
    return UserRepository.getAllByCampusField(id_campus_field);
  }

  static async getAllProfessionals(id_user) {
    return UserRepository.getAllProfessionals(id_user);
  }

  static async insertProfessional(professional) {
    return UserRepository.insertProfessional(professional);
  }
}

module.exports = UserService;
