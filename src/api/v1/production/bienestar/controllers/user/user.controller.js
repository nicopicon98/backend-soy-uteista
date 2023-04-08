const { send } = require("@api_bienestar/config/crypto.config");
const UserService = require("../../services/user");

class UserController {
  static async getAllByCampusField(req, res) {
    try {
      const { campus_field_id } = req.body;
      const users = await UserService.getAllByCampusField(campus_field_id);
      send({ data: users, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = UserController;