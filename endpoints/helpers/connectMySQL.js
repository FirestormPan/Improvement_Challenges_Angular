const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1kalampangala^%69**1209",
  database: "improvementdares",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
  
if (pool) {
  console.log("MySQL Pool connected successfully.");
}
  
module.exports=pool;