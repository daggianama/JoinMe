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

  let sql = `DROP TABLE if exists friends, participation, users, events;
  CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255));
  CREATE TABLE events (id INT AUTO_INCREMENT PRIMARY KEY, eventTitle VARCHAR(255), eventLocation VARCHAR(255), eventDate DATETIME, eventStartTime TIME, eventEndTime TIME, longitude DECIMAL(9,6), latitude DECIMAL(9,6), category VARCHAR(255));
  CREATE TABLE friends (id INT AUTO_INCREMENT PRIMARY KEY, user1_id INT, user2_id INT, FOREIGN KEY (user1_id) REFERENCES users(id), FOREIGN KEY (user2_id) REFERENCES users(id));
  CREATE TABLE participation (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, event_id INT, public BOOLEAN DEFAULT false, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (event_id) REFERENCES events(id));
`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `events` was successful!");

    console.log("Closing...");
  });

  con.end();
});


