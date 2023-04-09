const { sendService } = require("@api_bienestar/config");
const cryptRouter = express.Router();
const express = require("express");

cryptRouter.post("/deco", (req, res) => {
  const content = req.body;
  sendService(content, res);
});

module.exports = cryptRouter;
