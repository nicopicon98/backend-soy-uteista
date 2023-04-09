const AuthService = require("../../services/auth");
const { send } = require("@api_bienestar/config");

class AuthController {
  static async login(req, res) {
    const { email_user, password_user } = req.body;
    try {
      const resp = await AuthService.login(email_user, password_user);
      send({ data: resp, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = AuthController;
