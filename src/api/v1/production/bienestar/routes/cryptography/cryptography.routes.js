const express = require("express");
const cryptRouter = express.Router();

cryptRouter.post("/deco", (req, res) => {
  const content = req.body;
  sendService(content, res);
});