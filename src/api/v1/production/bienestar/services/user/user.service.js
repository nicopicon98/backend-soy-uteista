const UserRepository = require("../../repositories/user");

class UserService {
  static async getAllByCampusField(campus_field_id) {
    try {
      return await UserRepository.getAllByCampusField(campus_field_id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;