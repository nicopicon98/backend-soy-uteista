const CampusFieldService = require("../../services/campuses_fields");

class CampusFieldController {
  static async getAllByCampus(req, res) {
    const { id_user } = req.body;
    try {
      const campusesFields = await CampusFieldService.getAllByCampus();
      send({ data: campusesFields, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async insert(req, res) {
    const { id_campus, id_field } = req.body;

    try {
      await CampusFieldService.insert(id_campus, id_field);
      send(
        {
          data: { message: "Campus field successfully inserted." },
          status: 200,
        },
        res
      );
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static async delete(req, res) {
    const { id_campus_field } = req.body;

    try {
      await CampusFieldService.delete(id_campus_field);
      send(
        {
          data: { message: "Campus field successfully deleted." },
          status: 200,
        },
        res
      );
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = CampusFieldController;
