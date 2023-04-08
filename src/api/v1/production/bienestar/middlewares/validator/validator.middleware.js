const { validationResult } = require("express-validator");
const { send } = require("../../config/crypto.config");

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return send({ error: [errors.array()[0].msg], status: 406 }, res);
};

module.exports = validationMiddleware
