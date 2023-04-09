const express = require("express");
const authRouter = express.Router();
const AUTH_ROUTES_MODEL = require('../../models/routes/auth');

//middlewares

//routes model

//controllers

authRouter.post(
  AUTH_ROUTES_MODEL.LOGIN,
  (req, res) => res.send("it's working")
)