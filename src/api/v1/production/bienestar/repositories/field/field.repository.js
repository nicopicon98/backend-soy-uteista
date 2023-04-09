const { mysql } = require("@src/common/conexiones/conexionMysql");

class FieldRepository {
  static async getAll() {
    const query = "SELECT * FROM fields";
    return mysql.executeQuery(query);
  }

  static async getAllNotInCampus(id_campus) {
    const query = `
    SELECT f.*
      FROM fields f
      WHERE f.id_field NOT IN (
        SELECT cf.id_field
        FROM campuses_fields cf
        WHERE cf.id_campus = ?
      )
  `;
    return mysql.executeQuery(query, [id_campus]);
  }

  static async insert(name_field) {
    const query = "INSERT INTO fields (name_field) VALUES (?)";
    return mysql.executeQuery(query, [name_field]);
  }

  static async delete(id_field) {
    const query = "DELETE FROM fields WHERE id_field = ?";
    return mysql.executeQuery(query, [id_field]);
  }

  static async getByName(name_field) {
    const query = "SELECT * FROM fields WHERE LOWER(name_field) = LOWER(?)";
    const result = await mysql.executeQuery(query, [name_field]);
    console.log(result, "query_result")
    return result;
  }

  static async isFieldInCampus(id_field) {
    const query = "SELECT * FROM campuses_fields WHERE id_field = ?";
    const result = await mysql.executeQuery(query, [id_field]);
    return result.length > 0;
  }
}

module.exports = FieldRepository;
