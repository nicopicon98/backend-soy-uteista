const CampusFieldRepository = require("../../repositories/campuses-fields");
const UserRepository = require("../../repositories/users");

class CampusFieldService {
  static async getAllByCampus() {
    const rawData = await CampusFieldRepository.getAllByCampus();
    const groupedData = {};

    rawData.forEach((row) => {
      if (!groupedData[row.id_campus]) {
        groupedData[row.id_campus] = {
          id_campus_field: row.id_campus_field,
          name_campus: row.name_campus,
          fields: [],
        };
      }

      groupedData[row.id_campus].fields.push({
        id_field: row.id_field,
        name_field: row.name_field,
        id_campus_field: row.id_campus_field,
      });
    });

    return Object.values(groupedData);
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
