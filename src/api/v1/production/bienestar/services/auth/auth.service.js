const HTTP_HANDLING_MSGS = require("../../utilities");
const AuthRepository = require("../../repositories/auth");

class AuthService {
  static async login(email_user, password_user) {
    //evaluate if user exists
    const resp = await AuthRepository.itExists(email_user);
    if (!resp) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorNotFound(
          `${email_user} no se encuentra registrado`
        )
      );
    }
    return { message: "it's working" };
  }
}

module.exports = AuthService;
