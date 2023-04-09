const { mysql } = require("@src/common/conexiones/conexionMysql");

class UserRepository {
  /**
   * Get all professionals by campus field ID
   *
   * @param {number} id_campus_field - The ID of the campus field
   * @returns {Array} - Array of professionals with related campus and field data
   */
  static async getAllProfessionalsByCampusField(id_campus_field) {
    try {
      const rows = await mysql.executeQuery(
        `SELECT users.name_user, users.id_user,
          campuses_fields.*, campuses.id_campus as campus_id_campus, campuses.name_campus as name_campus,
          fields.id_field as fields_id_field, fields.name_field as name_field
          FROM users
          INNER JOIN campuses_fields ON campuses_fields.id_campuses_field = users.id_campuses_field
          INNER JOIN fields ON fields.id_field = campuses_fields.id_field
          INNER JOIN campuses ON campuses.id_campus = campuses_fields.id_campus
          WHERE users.id_campuses_field = ? AND users.id_role = 2`,
        [id_campus_field]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all professionals
   *
   * @param {number} _id_user - The ID of the user (currently unused)
   * @returns {Array} - Array of professionals
   */
  static async getAllProfessionals(_id_user) {
    const query = `SELECT 
        id_user, name_user, email_user, location_user, 
        id_role, id_campuses_field, registration_date
        FROM users 
        WHERE id_role = 2`;
    return mysql.executeQuery(query);
  }

  /**
   * Insert a professional into the database
   *
   * @param {object} professional - The professional object containing user data
   * @returns {object} - MySQL query result
   */
  static async insertProfessional(professional) {
    const result = await mysql.executeQuery(
      "INSERT INTO users (name_user, email_user, password_user, location_user, id_campuses_field, id_role) VALUES (?, ?, ?, ?, ?, ?)",
      [
        professional.name_user,
        professional.email_user,
        professional.password_user,
        professional.location_user,
        professional.id_campuses_field,
        2,
      ]
    );
    return result;
  }

  /**
   * Update a user's name and location
   *
   * @param {number} id_user - The ID of the user
   * @param {string} name_user - The updated name of the user
   * @param {string} location_user - The updated location of the user
   * @returns {object} - MySQL query result
   */
  static async updateUser(id_user, name_user, location_user) {
    const sql = `UPDATE users SET name_user = ?, location_user = ? WHERE id_user = ?`;
    const values = [name_user, location_user, id_user];
    return mysql.executeQuery(sql, values);
  }

  /**
   * Check if a user is associated with a user_time_slots_date
   *
   * @param {number} id_user - The ID of the user
   * @returns {boolean} - Returns true if the user is associated with a user_time_slots_date, otherwise false
   */
  static async isUserAssociatedWithTimeSlotDate(id_user) {
    const rows = await mysql.executeQuery(
      "SELECT COUNT(*) as count FROM user_time_slots_date WHERE id_user = ?",
      [id_user]
    );
    return rows.count > 0;
  }

  /**
   * Delete a user by ID
   *
   * @param {number} id_user - The ID of the user
   * @returns {object} - MySQL query result
   */
  static async deleteUser(id_user) {
    console.log(id_user, "id_user");
    const result = await mysql.executeQuery(
      "DELETE FROM users WHERE id_user = ?",
      [id_user]
    );

    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }

    return result;
  }
}

module.exports = UserRepository;
