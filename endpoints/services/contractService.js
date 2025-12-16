const pool = require('../helpers/connectMySQL');
const userService = require('./userService');

//@Deprecated
const getContractById = async (id) => {
  const sql = 'SELECT * FROM contracts WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0] || null;
}

const createContract = async (title, description, color, participants) => {
  console.log("got in the service")
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const sql = 'INSERT INTO contracts (title, description, color) VALUES (?, ?, ?)';
    const [result] = await connection.query(sql, [title, description, color]);
    const contractId = result.insertId;

    // Insert participants into the user_contracts table
    if (participants && participants.length > 0) {
      const userIds = await Promise.all(
        participants.map(async (participant) => {
          const user = await userService.getUserByName(participant);
          return user?.id;
        })
      );

      const validUserIds = userIds.filter(id => id != null);
      
      if (validUserIds.length > 0) {
        const values = validUserIds.map(userId => [userId, contractId]);
        const insertUserContractsSql = 'INSERT INTO user_contracts (user_id, contract_id) VALUES ?';
        await connection.query(insertUserContractsSql, [values]);
      }
    }

    await connection.commit();
    console.log("transaction completed goody!")
    return contractId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
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