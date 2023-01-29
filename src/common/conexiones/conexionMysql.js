const mysql = require('mysql');
class mysqlConnection {
  constructor() {
    this.host = "localhost",
      this.user = "root",
      this.password = "06f60ff6f",
      this.database = "bienestar",
      this.port = 3306
  }

  connectedDB() {
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.dbname,
      port: this.port
    });
    this.connection.connect()
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
