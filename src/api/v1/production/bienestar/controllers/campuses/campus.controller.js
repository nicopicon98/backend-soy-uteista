const { send } = require("@api_bienestar/config");
const { HTTP_HANDLING_MSGS } = require("../../utilities");
const CampusService = require("../../services/campuses");

class CampusController {
  static async getAll(req, res) {
    const { id_user } = req.body;
    try {
      const resp = await CampusService.getAll();
      send({ data: resp, status: 200 });
    } catch (error) {
      send({ data: [error.message], status: 500 });
    }
  }
}

module.exports = CampusController;
