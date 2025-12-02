const pool = require('../helpers/connectMySQL');


//@Deprecated
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

const getContractWithUsers = async (contract_id)=>{
  const sql = `SELECT 
    c.id,
    c.title,
    c.description,
    c.color,
    c.dueDate,
    COALESCE(JSON_ARRAYAGG(u.username), JSON_ARRAY()) AS participants
    FROM contracts c
    LEFT JOIN user_contracts uc 
        ON c.id = uc.contract_id
    LEFT JOIN users u
        ON u.id = uc.user_id
    WHERE c.id = ?
    GROUP BY c.id, c.title, c.description, c.color, c.dueDate;
  `;
  const [rows] = await pool.query(sql, [contract_id]);
  return rows[0];
}

module.exports = {
  createContract,
  deleteContract,
  getContractWithUsers
};