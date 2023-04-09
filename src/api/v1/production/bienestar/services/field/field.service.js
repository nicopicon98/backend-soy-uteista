const FieldRepository = require("../../repositories/field");

class FieldService {
  static async getAll() {
    return FieldRepository.getAll();
  }

  static async getAllNotInCampus(id_campus) {
    return FieldRepository.getAllNotInCampus(id_campus);
  }

  static async insert(name_field) {
    return FieldRepository.insert(name_field);
  }

  static async delete(id_field) {
    return FieldRepository.delete(id_field);
  }
}

module.exports = FieldService;
