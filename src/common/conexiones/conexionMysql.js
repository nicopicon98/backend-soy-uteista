const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "servicios",
});

/** Ejecutar un query, no es obligatorio pasar parametros */
const executeQuery = (query, parameters = []) => {
  return new Promise((resolve, reject) => {
    connection.connect();

    connection.query(query, parameters, function (error, results, fields) {
      resolve(results);
      reject(error);
    });

    connection.end();
  });
};

module.exports = {
  executeQuery,
};
