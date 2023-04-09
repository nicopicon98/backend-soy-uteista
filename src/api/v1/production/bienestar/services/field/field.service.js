const FieldRepository = require("../../repositories/field");
const { HTTP_HANDLING_MSGS } = require("../../utilities");
class FieldService {
  static async getAll() {
    return FieldRepository.getAll();
  }

  static async getAllNotInCampus(id_campus) {
    return FieldRepository.getAllNotInCampus(id_campus);
  }

  static async insert(name_field) {
    const existingField = await FieldRepository.getByName(name_field);
    if (existingField) {
      throw new Error("Field already exists.");
    }
    return FieldRepository.insert(name_field);
  }

  static async delete(id_field) {
    const existingField = await FieldRepository.get(id_field);
    if (!existingField) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorDuplicateEntry("Este servicio ya existe")
      );
    }
    const fieldInCampus = await FieldRepository.isFieldInCampus(id_field);
    if (fieldInCampus) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorDeleteDependency("servicio", "campus")
      );
    }
    return FieldRepository.delete(id_field);
  }
}

module.exports = FieldService;
