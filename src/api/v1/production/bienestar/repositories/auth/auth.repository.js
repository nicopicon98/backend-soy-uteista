const { mysql } = require("@src/common/conexiones/conexionMysql");

class AuthRepository {
  static async itExists(email_user) {
    const query = "SELECT * FROM users WHERE email_user = ?";
    return mysql.executeQuery(query, [email_user]);
    ;
  }
}

module.exports = AuthRepository;
