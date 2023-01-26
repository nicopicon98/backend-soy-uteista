const express = require("express");
const bienestar = express.Router();
const { login, register } = require("./bienestar.service");

bienestar.use((req, res, next) => {
    next();
});

bienestar.get("/login", login);
bienestar.get("/register", register);

module.exports = {
    bienestar,
};
