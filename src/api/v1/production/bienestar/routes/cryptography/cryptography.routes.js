const { sendService } = require("@api_bienestar/config");
const express = require("express");
const cryptRouter = express.Router();

cryptRouter.post("/deco", (req, res) => {
  const content = req.body;
  sendService(content, res);
});

/**
 * As info is being encrypted from the very entry point, it must be handled somewhere else
 * This is being handled on https://webservice.uts.edu.co/api/v1/production/soyuteista/enco
 */
// cryptRouter.post("/enco", (req, res) => {
//   const content = req.body;
//   sendService(encrypt(JSON.stringify(content)).content, res);
// });

module.exports = cryptRouter;
