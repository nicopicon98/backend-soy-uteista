const { mysql } = require("@src/common/conexiones/conexionMysql");

class CampusRepository {
  static async getAll() {
    const query = "SELECT * FROM campuses ORDER BY id_campus ASC";
    return mysql.executeQuery(query);
  }
}

module.exports = CampusRepository;
