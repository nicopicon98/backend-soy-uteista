const { response } = require("express");
const { connection } = require("../common/conexionMysql");
const find = (req, res = response) => {
  //hacer query para buscar todos
  connection.query(
    `
    SELECT dependencias.nombre as dependenciaNombre, contactosDependencia.*
    FROM dependencias 
    INNER JOIN contactosDependencia ON contactosDependencia.idDependencia = dependencias.idDependencia
    `,
    [],
    function (err, result, fields) {
      err ? res.json(err) : res.json(array2);
    }
  );
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
