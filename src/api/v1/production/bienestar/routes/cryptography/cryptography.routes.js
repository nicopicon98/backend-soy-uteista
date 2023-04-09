const { sendService } = require("@api_bienestar/config");
const express = require("express");
const cryptRouter = express.Router();

cryptRouter.post("/deco", (req, res) => {
  const content = req.body;
  sendService(content, res);
});

module.exports = cryptRouter;
