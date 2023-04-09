const { HTTP_HANDLING_MSGS } = require("../../utilities");
const AuthRepository = require("../../repositories/auth");
const {
  comparePassword,
} = require("@src/common/security/bcrypt_encryption.js");

class AuthService {
  static async login(email_user, password_user) {
    //evaluate if user exists
    const resp = await AuthRepository.itExists(email_user);
    console.log(resp);
    if (!(resp.length > 0)) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorNotFound(
          `${email_user} no se encuentra registrado`
        )
      );
    }
    //evaluate passwords match
    // const validPassword = comparePassword(password_user);
  }
}

module.exports = AuthService;
