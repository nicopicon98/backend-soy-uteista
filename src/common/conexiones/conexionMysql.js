const mysqlLib = require("mysql");
class mysqlConnection {
  constructor() {}

  connectedDB() {
    this.connection = mysqlLib.createConnection({
      host: "localhost",
      user: "root",
      password: "06f60ff6f",
      database: "bienestar",
      port: 3306,
    });
  }

  disconnectedDB() {
    this.connection.end();
  }

  /** Ejecutar query */
  executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connectedDB();
      try {
        this.connection.query(query, params, function (error, results, fields) {
          resolve(results);
          reject(error);
        });
      } catch (error) {
        console.log(error);
      }

      this.disconnectedDB();
    });
  }
}

const mysql = new mysqlConnection();

module.exports = {
  mysql,
};
