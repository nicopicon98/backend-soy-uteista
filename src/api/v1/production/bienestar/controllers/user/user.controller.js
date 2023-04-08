const { send } = require("@api_bienestar/config/crypto.config");
const UserService = require("../../services/user");

class UserController {
  static async getAllProfessionalsByCampusField(req, res) {
    try {
      const { id_campus_field } = req.body;
      const users = await UserService.getAllProfessionalsByCampusField(id_campus_field);
      send({ data: users, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async getAllProfessionals(req, res) {
    try {
      const { id_user } = req.body;
      const users = await UserService.getAllProfessionals(id_user);
      send({ data: users, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = UserController;