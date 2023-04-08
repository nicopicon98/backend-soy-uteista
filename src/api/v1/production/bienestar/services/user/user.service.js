const UserRepository = require("../../repositories/user");

class UserService {
  static async getAllProfessionalsByCampusField(campus_field_id) {
    try {
      return await UserRepository.getAllByCampusField(campus_field_id);
    } catch (error) {
      throw error;
    }
  }

  static async getAllProfessionals(user_id) {
    return UserRepository.getAllProfessionals(user_id);
  }
}

module.exports = UserService;
