const { send } = require("@api_bienestar/config");
const FieldService = require("../../services/fields");
const { HTTP_HANDLING_MSGS } = require("../../utilities");

class FieldController {
  /**
   * Get all fields
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   *
   * @returns {object} - The list of fields
   */
  static async getAll(req, res) {
    try {
      const { id_user } = req.body;
      const fields = await FieldService.getAll();
      send({ data: fields, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  static campusMapping = {
    "SEDE PRINCIPAL": "1",
    "SEDE BARRANCABERMEJA": "2",
    "SEDE SAN JOSE DE CÚCUTA": "3",
    "SEDE PIEDECUESTA": "4",
    "SEDE SAN GIL": "5",
    "SEDE VÉLEZ": "6",
    "EDUCACIÓN VIRTUAL": "7",
  };

  static isNumber(str) {
    return !isNaN(+str);
  }

  static async getAllByCampus(req, res) {
    try {
      const { id_campus } = req.body;

      const id_campus_formatted = this.isNumber(id_campus)
        ? id_campus
        : this.campusMapping[id_campus] || "1";

      const fields = await FieldService.getAllByCampus(id_campus_formatted);

      res.status(200).json({ data: fields });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all fields not in a campus
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {number} req.body.id_campus - The ID of the campus
   *
   * @returns {object} - The list of fields not in the campus
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
   * Insert a field
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.body.name_field - The name of the field
   *
   * @returns {object} - The inserted field
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
   * Delete a field
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {number} req.params.id_field - The ID of the field
   *
   * @returns {object} - A message indicating the success or failure of the operation
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
