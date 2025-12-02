const pool = require('../helpers/connectMySQL');

const getContractById = async (id) => {
  const sql = 'SELECT * FROM contracts WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0] || null;
}

const createContract = async (title, description, color) => {
  const sql = 'INSERT INTO contracts (title, description, color) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [title, description, color]);
  return result.insertId;
}

const deleteContract = async (id) => {
  const sql = 'DELETE FROM contracts WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getContractById,
  createContract,
  deleteContract
};