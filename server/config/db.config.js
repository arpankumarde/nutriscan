let mysql = require("mysql2");

// Create a connection to the database
let con = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectTimeout: 20000,
});

// Show connection Status
con.getConnection((err) => {
  if (err) {
    // Log error message with timestamp
    console.log(
      new Date().toLocaleString(),
      "Error connecting to the database: ",
      err
    );
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ETIMEDOUT") {
      console.log("Attempting to reconnect to the database.");
      con = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
    } else {
      throw err;
    }
    return;
  }
  console.log("Connected to the database.");
});

// Handle MySQL errors
con.on("error", (err) => {
  console.log("DB error", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ETIMEDOUT") {
    console.log("Attempting to reconnect to the database.");
    con = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  } else {
    throw err;
  }
});

module.exports = con;
