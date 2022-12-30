const express = require("express");
const citas = express.Router();
const { find, create, remove } = require("./citas.service");

citas.use((req, res, next) => {
  next();
});

citas.get("/", find);

citas.post("/", create);

citas.delete("/:idCita", remove);

module.exports = {
  citas
};