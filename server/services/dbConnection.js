var mysql = require("mysql2");
const FileSystem = require("fs");

var connection = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
  connectionLimit: 1,
});

connection.getConnection(async function (err, connect) {
  if (err) {
    console.error("error connecting: " + JSON.stringify(err), err.sqlMessage);
    return;
  }
  connect.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`);

  connect.release();
  console.log(process.env.DB_PORT || 3306, "db connected successfully");
});

module.exports = connection;
