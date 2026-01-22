var pool = require('../helpers/connectMySQL');
var challengeService = require('../services/challengeService');

const deleteCard = async (req, res) => {
    try{
        console.log("deleting?", req.params.id);
        challengeService.deleteCard(req.params.id);
        return res.status(200).json({message: 'Challenge card deleted successfully'});
    }catch(error){
        console.error('Error:', error);
        return res.status(500).send('Internal server error');
    }
};


module.exports = {
    deleteCard
};