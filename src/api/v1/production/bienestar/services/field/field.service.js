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
    console.log({ name_field });
    const existingField = await FieldRepository.getByName(name_field);
    console.log(existingField, "sql response");
    if (existingField) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorDuplicateEntry(
          "Este servicio ya se encuentra registrado"
        )
      );
    }
    return FieldRepository.insert(name_field);
  }

  static async delete(id_field) {
    const existingField = await FieldRepository.get(id_field);
    if (!existingField) {
      throw new Error(
        HTTP_HANDLING_MSGS.errorNotFound(
          "Este servicio no se encuentra registrado"
        )
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
