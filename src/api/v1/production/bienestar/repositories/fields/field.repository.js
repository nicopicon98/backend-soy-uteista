const { mysql } = require("@src/common/conexiones/conexionMysql");

class FieldRepository {
  /**
   * Get all fields
   *
   * @returns {Array} - The list of all fields
   */
  static async getAll() {
    const query = "SELECT * FROM fields";
    return mysql.executeQuery(query);
  }

  /**
   * Get all fields that are not associated with a given campus
   *
   * @param {number} id_campus - The ID of the campus
   * @returns {Array} - The list of all fields that are not associated with the given campus
   */
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

  /**
   * Insert a new field
   *
   * @param {string} name_field - The name of the new field
   * @returns {object} - The newly inserted field
   * @throws An error if a field with the same name already exists
   */
  static async insert(name_field) {
    const query = "INSERT INTO fields (name_field) VALUES (?)";
    return mysql.executeQuery(query, [name_field]);
  }

  /**
   * Delete a field by ID
   *
   * @param {number} id_field - The ID of the field to delete
   * @returns {object} - The deleted field
   * @throws An error if the field doesn't exist or is associated with a campus
   */
  static async delete(id_field) {
    const query = "DELETE FROM fields WHERE id_field = ?";
    return mysql.executeQuery(query, [id_field]);
  }

  /**
   * Get a field by name
   *
   * @param {string} name_field - The name of the field to retrieve
   * @returns {object} - The retrieved field
   */
  static async getByName(name_field) {
    const query = "SELECT * FROM fields WHERE LOWER(name_field) = LOWER(?)";
    const result = await mysql.executeQuery(query, [name_field]);
    return result[0];
  }

  /**
   * Check if a field is associated with a campus
   *
   * @param {number} id_field - The ID of the field to check
   * @returns {boolean} - True if the field is associated with a campus, false otherwise
   */
  static async isInCampusField(id_field) {
    const query = "SELECT * FROM campuses_fields WHERE id_field = ?";
    const result = await mysql.executeQuery(query, [id_field]);
    return result.length > 0;
  }

  /**
   * Get a field by ID
   *
   * @param {number} id_field - The ID of the field to retrieve
   * @returns {object} - The retrieved field
   */
  static async getById(id_field) {
    const query = "SELECT * FROM fields WHERE id_field = ?";
    const result = await mysql.executeQuery(query, [id_field]);
    return result[0];
  }
}

module.exports = FieldRepository;
