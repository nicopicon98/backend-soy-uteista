const { mysql } = require("@src/common/conexiones/conexionMysql");

class CampusFieldRepository {
  static async getAllByCampus() {
    const query = `
    SELECT c.id_campus, c.name_campus, f.id_field, f.name_field, cf.id_campus_field
    FROM campuses c
    JOIN campuses_fields cf ON c.id_campus = cf.id_campus
    JOIN fields f ON f.id_field = cf.id_field
    ORDER BY c.id_campus
    `;
    return mysql.executeQuery(query);
  }

  static async insert(id_campus, id_field) {
    const query =
      "INSERT INTO campuses_fields (id_campus, id_field) VALUES (?, ?)";
    return mysql.executeQuery(query, [id_campus, id_field]);
  }

  static async delete(id_campus_field) {
    const query = "DELETE FROM campuses_fields WHERE id_campus_field = ?";
    return mysql.executeQuery(query, [id_campus_field]);
  }

  static async getById(id_campus_field) {
    const query = "SELECT * FROM campuses_fields WHERE id_campus_field = ?";
    const result = await mysql.executeQuery(query, [id_campus_field]);
    return result[0];
  }
}

module.exports = CampusFieldRepository;
