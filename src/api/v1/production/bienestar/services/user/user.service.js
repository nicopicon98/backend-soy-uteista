const UserRepository = require("../../repositories/user");
const { HTTP_HANDLING_MSGS } = require("../../utilities");

class UserService {
  /**
   * Get all professionals by campus field ID
   *
   * @param {number} id_campus_field - The ID of the campus field
   * @returns {Array} - Array of professionals with related campus and field data
   */
  static async getAllProfessionalsByCampusField(id_campus_field) {
    return UserRepository.getAllByCampusField(id_campus_field);
  }

  /**
   * Get all professionals
   *
   * @param {number} id_user - The ID of the user (currently unused)
   * @returns {Array} - Array of professionals
   */
  static async getAllProfessionals(id_user) {
    return UserRepository.getAllProfessionals(id_user);
  }

  /**
   * Insert a professional into the database
   *
   * @param {object} professional - The professional object containing user data
   * @returns {object} - MySQL query result
   */
  static async insertProfessional(professional) {
    return UserRepository.insertProfessional(professional);
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
    return UserRepository.updateUser(id_user, name_user, location_user);
  }

  /**
   * Delete a user if not associated with a user_time_slots_date
   *
   * @param {number} id_user - The ID of the user
   * @returns {object} - MySQL query result
   * @throws {Error} - Throws an error if user is associated with a user_time_slots_date
   */
  static async deleteUser(id_user) {
    const isUserAssociated =
      await UserRepository.isUserAssociatedWithTimeSlotDate(id_user);

    if (isUserAssociated) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorDeleteDependency('profesional', 'horario')
      );
    }

    return UserRepository.deleteUser(id_user);
  }
}

module.exports = UserService;
