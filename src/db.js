// mysql 계정
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  connectionLimit: 50,
  queueLimit: 0,
  waitForConnection: true
});

db.connect(err => {
  if (!err) {
    console.log("✅　Connect DB");
  } else {
    console.log("❎　Don't connect DB");
  }
});

export default db;
