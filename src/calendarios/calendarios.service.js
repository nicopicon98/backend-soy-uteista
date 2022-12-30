const { response } = require("express");
const { executeQuery } = require("../common/conexiones/conexionMysql");
const find = async (req, res = response) => {
  //hacer query para buscar todos
  const resp = await executeQuery();
};

const create = (req, res = response) => {
  connection.query(
    `
  INSERT INTO carrito  
  (correo_estudiante, id_idea)
  values (?,?)`,
    [req.params.email, req.params.id_idea],
    function (err, result, fields) {
      err ? res.json(err) : res.json(result);
    }
  );
};

const remove = (req, res = response) => {
  connection.query(
    `
  DELETE FROM carrito 
  WHERE id_carrito = ?`,
    [req.params.id_cart],
    function (err, result, fields) {
      err ? res.json(err) : res.json(result);
    }
  );
};

module.exports = {
  find,
  create,
  remove,
};
