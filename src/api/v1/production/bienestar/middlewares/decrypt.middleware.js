const { decrypt, send } = require("../config/crypto.config");

const decryptMiddleware = (req, res, next) => {
  if (req.body.content !== undefined) {
    req.body = decrypt(req.body);
    next();
  } else {
    send(
      {
        status: 400,
        message: "Error en la peticion",
      },
      res
    );
  }
};

module.exports = {
  decryptMiddleware,
};
