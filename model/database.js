require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "mvpData",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = "DROP TABLE if exists events; CREATE TABLE events (id INT AUTO_INCREMENT PRIMARY KEY, eventTitle VARCHAR(255), eventLocation VARCHAR(255), eventDate INT, eventStartTime INT, eventEndTime INT);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `events` was successful!");

    console.log("Closing...");
  });

  con.end();
});


