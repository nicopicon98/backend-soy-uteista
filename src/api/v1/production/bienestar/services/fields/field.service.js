const FieldRepository = require("../../repositories/field");
const { HTTP_HANDLING_MSGS } = require("../../utilities");

class FieldService {
  /**
   * Get all fields
   *
   * @returns {Array} - The list of fields
   */
  static async getAll() {
    return FieldRepository.getAll();
  }

  /**
   * Get all fields not associated with a specific campus
   *
   * @param {string} id_campus - The ID of the campus
   * @returns {Array} - The list of fields
   */
  static async getAllNotInCampus(id_campus) {
    return FieldRepository.getAllNotInCampus(id_campus);
  }

  /**
   * Insert a field
   *
   * @param {string} name_field - The name of the field
   * @returns {Object} - The inserted field
   * @throws {Error} - If a field with the same name already exists
   */
  static async insert(name_field) {
    const existingField = await FieldRepository.getByName(name_field);
    if (existingField) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorDuplicateEntry(
          "Este servicio ya se encuentra registrado"
        )
      );
    }
    return FieldRepository.insert(name_field);
  }

  /**
   * Delete a field
   *
   * @param {string} id_field - The ID of the field
   * @returns {Object} - The deleted field
   * @throws {Error} - If the field does not exist or if it is associated with a campus
   */
  static async delete(id_field) {
    // Validate that the field exists
    const existingField = await FieldRepository.getById(id_field);
    if (!existingField) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorNotFound(
          "Este servicio no se encuentra registrado"
        )
      );
    }
    // Validate that the field is not associated with any campuses
    const fieldInCampus = await FieldRepository.isInCampusField(id_field);
    if (fieldInCampus) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorDeleteDependency("servicio", "campus")
      );
    }
    return FieldRepository.delete(id_field);
  }
}

module.exports = FieldService;
