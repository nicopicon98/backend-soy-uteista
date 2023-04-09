const { sendService, encrypt } = require("@api_bienestar/config");
const express = require("express");
const cryptRouter = express.Router();

cryptRouter.post("/deco", (req, res) => {
  const content = req.body;
  sendService(content, res);
});

cryptRouter.post("/enco", (req, res) => {
  const content = req.body;
  sendService(encrypt(JSON.stringify(content)).content, res);
});

module.exports = cryptRouter;
