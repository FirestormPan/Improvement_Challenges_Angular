const { throwError } = require('rxjs');
const pool = require('../helpers/connectMySQL');
const userService = require('./userService');


const getContractById = async (id) => {
  const sql = 'SELECT * FROM contracts WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return rows[0] || null;
}

const createContract = async (title, description, color, participants) => {
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

const completeContract = async (contract_id, owner_id) => {
  const connection = await pool.getConnection();
  try {
    //check if contract exists
    let contract = await getContractById(contract_id)
    if(!contract){ throwError() }

    //if contract exists, start transaction
    await connection.beginTransaction();

    //select a random challenge based on contract color, or any color if "random"
    let schallengeSqlql = `
        SELECT description
        FROM challenges
    `;
    if(contract.color !== "random"){
      schallengeSqlql += `WHERE color = ?
        ORDER BY RAND()
        LIMIT 1`;
    }
    const [rows] = await connection.query(schallengeSqlql, [ contract["color"] ]);
    console.log(rows);
    const challenge = rows[0].description;

    //create the card in db
    const cardSql = 'INSERT INTO cards (title, text, type, owner_id) VALUES ( ?, ?, ?, ?)';
    const [cardResult] = await connection.query(cardSql, [ contract["title"], challenge, 'activatable', owner_id]);
    const cardId = cardResult.insertId;

    //add contract participants to card_users table (excluding owner)
    const getParticipantsSql = `
      SELECT user_id FROM user_contracts 
      WHERE contract_id = ? AND user_id != ?
    `;
    const [participants] = await connection.query(getParticipantsSql, [contract_id, owner_id]);
    
    if (participants.length > 0) {
      const cardUserValues = participants.map(p => [cardId, p.user_id]);
      const insertCardUsersSql = 'INSERT INTO card_users (card_id, user_id) VALUES ?';
      await connection.query(insertCardUsersSql, [cardUserValues]);
    }

    
    //remove the contract from the database
    const sql = 'DELETE FROM contracts WHERE id = ?';
    const [result] = await connection.query(sql, [contract_id]);

    await connection.commit();
    
    return result.affectedRows > 0;
  } catch (error) {
    try{
      await connection.rollback();
    }catch(err){
      console.error("Rollback failed:", err);
      throw error;
    }
  } finally {
    await connection.release();
  }
}

module.exports = {
  createContract,
  deleteContract,
  getContractWithUsers,
  completeContract
};