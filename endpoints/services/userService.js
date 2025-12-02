const pool = require('../helpers/connectMySQL');
const bcrypt = require('bcryptjs');

exports.getUserById = async (id) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0] || null;
};

exports.getUserByName = async (username) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.query(sql, [username]);
  return rows[0] || null;
};


// returns all contracts that include the specified user(id)
exports.getUserContracts = async (userId) => {
  const [rows] = await pool.query(`
    SELECT c.*
    FROM contracts c
    JOIN user_contracts uc ON uc.contract_id = c.id
    WHERE uc.user_id = ?
  `, [userId]);

  return rows;
};


exports.createUser = async ({ id, username, email, password }) => {
  // Hash password
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Prepare query
  const sql = id
    ? 'INSERT INTO users (id, username, hashed_password, email) VALUES (?, ?, ?, ?)'
    : 'INSERT INTO users (username, hashed_password, email) VALUES (?, ?, ?)';

  const params = id
    ? [id, username, hashedPassword, email]
    : [username, hashedPassword, email];

  await pool.query(sql, params);
};

exports.deleteUserByUsername = async (username) => {
  const sql = 'DELETE FROM users WHERE username = ?';
  const [result] = await pool.query(sql, [username]);

  return result.affectedRows > 0;  // true if user deleted
};

exports.changePassword = async (username, newPassword) => {
  //hash the new password before storing it
  const salt = bcrypt.genSaltSync(5);
  const newHashedPassword = bcrypt.hashSync(newPassword, salt);

  var sqlQuery= 'UPDATE users SET hashed_password = ? WHERE username = ? ;'

  return await pool.query(sqlQuery, [ newHashedPassword, username]) 
};


exports.usernameExists = async (username) => {
  const sql = `SELECT id FROM users WHERE username = ? LIMIT 1`;
  const [rows] = await pool.query(sql, [username]);
  return rows.length > 0;
};

// Check if an email exists
exports.emailExists = async (email) => {
  const sql = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sql, [email]);
  return rows.length > 0;
};

exports.uploadPfp = async (userId, filePath) => {
  const sql = 'UPDATE users SET pfp = ? WHERE id = ?';
  console.log(userId, filePath)
  await pool.query(sql, [filePath, userId]);
}