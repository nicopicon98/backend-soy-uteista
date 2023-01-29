const mysql = require('mysql');
class mysqlConnection {
  constructor() {
  }

  connectedDB() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "06f60ff6f",
      database: "bienestar",
      port: 3306
    });
  }

  disconnectedDB() {
    this.connection.end();
  }

  /** Ejecutar query */
  executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connectedDB()
      this.connection.query(query, params,
        function (error, results, fields) {
          resolve(results)
          reject(error)
        })

      this.disconnectedDB()
    });
  }
}

module.exports = {
  mysqlConnection
}
