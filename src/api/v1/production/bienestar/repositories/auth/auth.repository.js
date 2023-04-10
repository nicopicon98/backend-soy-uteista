const { mysql } = require("@src/common/conexiones/conexionMysql");

class AuthRepository {
  static async getByEmail(email_user) {
    const query = "SELECT * FROM users WHERE email_user = ?";
    return mysql.executeQuery(query, [email_user]);
  }
  static async getDetailedInfo(id_user) {
    const query = ` SELECT 
      users.id_user, users.registration_date,  users.name_user, users.email_user, users.location_user,
      campuses.name_campus, roles.name_role, fields.name_field
      FROM users
      INNER JOIN campuses_fields ON users.id_campus_field = campuses_fields.id_campus_field
      INNER JOIN campuses ON campuses_fields.id_campus = campuses.id_campus
      INNER JOIN roles ON users.id_role = roles.id_role
      INNER JOIN fields ON campuses_fields.id_field = fields.id_field
      WHERE users.id_user = ?
    `;
    return mysql.executeQuery(query, [id_user]);
  }
}

module.exports = AuthRepository;
