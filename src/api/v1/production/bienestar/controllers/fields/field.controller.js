const { send } = require("@api_bienestar/config");
const FieldService = require("../../services/fields");
const { HTTP_HANDLING_MSGS, CampusFormatter } = require("../../utilities");

class FieldController {
  /**
   * @description Get all fields
   * @param {object} req - Request object containing the user id
   * @param {object} res - Response object
   */
  static async getAll(req, res) {
    try {
      const fields = await FieldService.getAll();
      send({ data: fields, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * @description Get all fields by campus
   * @param {object} req - Request object containing the campus id
   * @param {object} res - Response object
   */
  static async getAllByCampus(req, res) {
    try {
      const { id_campus } = req.body;

      const id_campus_formatted = CampusFormatter.isNumber(id_campus)
        ? id_campus
        : CampusFormatter.campusMapping[id_campus] || "1";

      const fields = await FieldService.getAllByCampus(id_campus_formatted);

      send({ data: fields, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * @description Get all fields not in a campus
   * @param {object} req - Request object containing the campus id
   * @param {object} res - Response object
   */
  static async getAllNotInCampus(req, res) {
    const { id_campus } = req.body;

    try {
      const fields = await FieldService.getAllNotInCampus(id_campus);
      send({ data: fields, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * @description Insert a field
   * @param {object} req - Request object containing the name of the field
   * @param {object} res - Response object
   */
  static async insert(req, res) {
    const { name_field } = req.body;

    try {
      await FieldService.insert(name_field);
      send(
        {
          data: HTTP_HANDLING_MSGS.successInsert(name_field),
          status: 200,
        },
        res
      );
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * @description Delete a field
   * @param {object} req - Request object containing the field id
   * @param {object} res - Response object
   */
  static async delete(req, res) {
    const { id_field } = req.body;

    try {
      await FieldService.delete(id_field);
      send(
        {
          data: HTTP_HANDLING_MSGS.successDelete(),
          status: 200,
        },
        res
      );
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = FieldController;
