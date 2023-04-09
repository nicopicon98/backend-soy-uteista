const { hashPassword } = require("@src/common/security/bcrypt_encryption");
const { send } = require("@api_bienestar/config/crypto.config");
const MailerService = require("../../services/mailer");
const { HTTP_HANDLING_MSGS } = require("../../utilities");
const UserService = require("../../services/user");

class UserController {
  /**
   * Get all professionals by campus field
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.body.id_campus_field - The ID of the campus field
   *
   * @returns {object} - The list of professionals
   */
  static async getAllProfessionalsByCampusField(req, res) {
    try {
      const { id_campus_field } = req.body;
      const users = await UserService.getAllProfessionalsByCampusField(
        id_campus_field
      );
      send({ data: users, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * Get all professionals
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.body.id_user - The ID of the user
   *
   * @returns {object} - The list of professionals
   */
  static async getAllProfessionals(req, res) {
    try {
      const { id_user } = req.body;
      const users = await UserService.getAllProfessionals(id_user);
      send({ data: users, status: 200 }, res);
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * Insert a professional
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.body.name_user - The name of the user
   * @param {string} req.body.email_user - The email of the user
   * @param {string} req.body.password_user - The password of the user
   * @param {string} req.body.location_user - The location of the user
   * @param {string} req.body.id_campuses_field - The ID of the campus field
   *
   * @returns {object} - The inserted professional
   */
  static async insertProfessional(req, res) {
    const {
      name_user,
      email_user,
      password_user,
      location_user,
      id_campuses_field,
    } = req.body;
    const passwordWithoutEncrypt = password_user;
    const password_user_hashed = await hashPassword(password_user);
    const professional = {
      name_user,
      email_user,
      password_user: password_user_hashed,
      location_user,
      id_campuses_field,
    };
    try {
      await UserService.insertProfessional(professional);
      const emailSent = await MailerService.sendWelcomeUserEmail(
        name_user,
        email_user,
        passwordWithoutEncrypt
      );
      // Check if the event is emitted successfully
      if (emailSent) {
        send(
          {
            data: HTTP_HANDLING_MSGS.successInsert(email_user),
            status: 200,
          },
          res
        );
      } else {
        send(
          {
            data: HTTP_HANDLING_MSGS.successInsertEmailNotSent(email_user),
            status: 200,
          },
          res
        );
      }
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        send(
          {
            error: [
              HTTP_HANDLING_MSGS.errorDuplicateEntry("El usuario ya existe"),
            ],
            status: 409,
          },
          res
        );
      } else {
        send(
          {
            error: [HTTP_HANDLING_MSGS.errorInternalServer(error)],
            status: 500,
          },
          res
        );
      }
    }
  }

  /**
   * Update a user's name and location
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.body.id_user - The ID of the user
   * @param {string} req.body.name_user - The updated name of the user
   * @param {string} req.body.location_user - The updated location of the user
   *
   * @returns {object} - The updated user
   */
  static async updateUser(req, res) {
    const { id_user, name_user, location_user } = req.body;
    try {
      const result = await UserService.updateUser(
        id_user,
        name_user,
        location_user
      );
      if (result.affectedRows === 0) {
        send(
          {
            error: [HTTP_HANDLING_MSGS.errorNotFound(`profesional`)],
            status: 404,
          },
          res
        );
      }
      send(
        {
          data: {
            message: HTTP_HANDLING_MSGS.successUpdate(
              `Profesional: ${name_user}`
            ),
          },
          status: 200,
        },
        res
      );
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }

  /**
   * Delete a user
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {number} req.params.id_user - The ID of the user
   *
   * @returns {object} - A message indicating the success or failure of the operation
   */
  static async deleteUser(req, res) {
    const { id_user } = req.body;
    try {
      await UserService.deleteUser(id_user);
      send(
        {
          data: { message: HTTP_HANDLING_MSGS.successDelete("profesional") },
          status: 200,
        },
        res
      );
    } catch (error) {
      send({ error: [error.message], status: 500 }, res);
    }
  }
}

module.exports = UserController;
