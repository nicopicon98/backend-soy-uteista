const AuthService = require("../../services/auth");

class AuthController {
  static async login(req, res) {
    const { email_user, password_user } = req.body;
    try {
      const resp = await AuthService.login(email_user, password_user)
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = AuthController
