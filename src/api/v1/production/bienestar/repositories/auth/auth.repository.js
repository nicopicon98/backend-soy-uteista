const { mysql } = require("@src/common/conexiones/conexionMysql");

class AuthRepository {
  static async itExists(email_user) {
    console.log(email_user, "email_user")
    const query = "SELECT * FROM users WHERE email_user = ?";
    const result = await mysql.executeQuery(query, [email_user]);
    console.log(result, "result")
    return result.length > 0;
  }
}

module.exports = AuthRepository;
