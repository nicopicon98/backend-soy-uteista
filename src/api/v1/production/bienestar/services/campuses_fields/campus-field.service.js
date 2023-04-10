const CampusFieldRepository = require("../../repositories/campuses-fields");
const UserRepository = require("../../repositories/users");

class CampusFieldService {
  static async getAllByCampus(id_campus) {
    return CampusFieldRepository.getAllByCampus(id_campus);
  }

  static async insert(id_campus, id_field) {
    return CampusFieldRepository.insert(id_campus, id_field);
  }

  static async delete(id_campus_field) {
    const campusField = await CampusFieldRepository.getById(id_campus_field);
    if (!campusField) {
      throw new Error("Campus field not found.");
    }

    const usersInCampusField =
      await UserRepository.getAllProfessionalsByCampusField(id_campus_field);
    if (usersInCampusField.length > 0) {
      throw new Error(
        "Cannot delete campus field, users are associated with it."
      );
    }

    return CampusFieldRepository.delete(id_campus_field);
  }
}

module.exports = CampusFieldService;
