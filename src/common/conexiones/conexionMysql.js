const mysql = require("mysql");

class mysqlConnection {
  constructor() {}

  connect() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "06f60ff6f",
      database: "bienestar",
      port: 3306,
    });

    this.connection.connect(function (err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }

    });
  }

  disconnect() {
    this.connection.end(function (err) {
      if (err) {
        console.error("error disconnecting: " + err.stack);
        return;
      }

      console.log("disconnected from database");
    });
  }

  executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connect();

      this.connection.query(query, params, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });

      this.disconnect();
    });
  }
}

const mysqlInstance = new mysqlConnection();

module.exports = {
  mysql: mysqlInstance,
};
