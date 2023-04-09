const { mysql } = require("@src/common/conexiones/conexionMysql");

class AuthRepository {
  static async itExists(email_user) {
    const query = "SELECT * FROM users WHERE email_user = ?";
    const result = mysql.executeQuery(query, [email_user]);
    return result.length > 0;
  }
}

module.exports = AuthRepository;
