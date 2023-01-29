const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "06f60ff6f",
  database: "bienestar",
  port: 3306
});

/** Ejecutar un query, no es obligatorio pasar parametros */
const executeQuery = (query, parameters = []) => {
  try {
    connection.connect((error) => {
      console.log(error)
    });

    connection.query("SELECT * FROM areas",[], function (error, results, fields) {
      
    });
  
    connection.end();
  } catch (error) {
    console.log(error)
  }

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
