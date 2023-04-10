const { HTTP_HANDLING_MSGS } = require("../../utilities");
const AuthRepository = require("../../repositories/auth");
const {
  comparePassword,
} = require("@src/common/security/bcrypt_encryption.js");

class AuthService {
  static async login(email_user, password_user) {
    //evaluate if user exists
    const resp = await AuthRepository.getByEmail(email_user);
    if (!(resp.length > 0)) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorNotFound(
          `${email_user} no se encuentra registrado`
        )
      );
    }
    //evaluate passwords match
    const validPassword = await comparePassword(
      password_user,
      resp[0].password_user
    );
    if (!validPassword) {
      throw new Error(HTTP_HANDLING_MSGS.errorWrongInfo());
    }

    //generate a token if the password is valid

    //query database once again to fulfill response required
    const { id_user } = resp[0];
    return AuthRepository.getDetailedInfo(id_user);
  }
}

module.exports = AuthService;
