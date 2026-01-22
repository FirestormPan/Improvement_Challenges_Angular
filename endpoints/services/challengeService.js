var pool = require('../helpers/connectMySQL');

const deleteCard = async (cardId) => {
    const sql = 'DELETE FROM cards WHERE id = ?';
    const [result] = await pool.query(sql, [cardId]);
    return result.affectedRows > 0;
}


module.exports = {
    deleteCard
};