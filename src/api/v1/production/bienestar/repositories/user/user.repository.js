const { mysql } = require("@src/common/conexiones/conexionMysql");

class UserRepository {
  static async getAllProfessionalsByCampusField(campus_field_id) {
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
        [campus_field_id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProfessionals(user_id) {
    const query = `SELECT 
        id_user, name_user, email_user, location_user, 
        id_role, id_campuses_field, registration_date
        FROM users 
        WHERE id_role = 2`;
    return mysql.executeQuery(query);
  }
}

module.exports = UserRepository;
