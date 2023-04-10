const CampusRepository = require("../../repositories/campuses");

class CampusService {
  static async getAll() {
    return CampusRepository.getAll();
  }
}

module.exports = CampusService;
