const { send } = require("@api_bienestar/config");
const { HTTP_HANDLING_MSGS } = require("../../utilities");
const CampusService = require("../../services/campuses");

class CampusController {
  static async getAll(req, res) {
    const { id_user } = req.body;
    try {
      const campuses = await CampusService.getAll();
      send({ data: campuses, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = CampusController;
