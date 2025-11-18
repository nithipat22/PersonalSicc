const mysql = require('mysql')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting MySQL connection:', err);
    return;
  }
  console.log('MySQL connection established');
  connection.release();
});

module.exports = {pool};