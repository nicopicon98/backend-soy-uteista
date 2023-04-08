const UserRepository = require("../../repositories/user");

class UserService {
  static async getAllProfessionalsByCampusField(id_campus_field) {
    try {
      return await UserRepository.getAllByCampusField(id_campus_field);
    } catch (error) {
      throw error;
    }
  }

  static async getAllProfessionals(id_user) {
    return UserRepository.getAllProfessionals(id_user);
  }
}

module.exports = UserService;
