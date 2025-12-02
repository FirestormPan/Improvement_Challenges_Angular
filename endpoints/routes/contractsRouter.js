var express = require('express');
var router = express.Router();
var contractsController = require('../controllers/contractController');

router.get('/', function(req, res, next) {
res.send('respond with a resource');
});


router.get('/:id', contractsController.getContractById);
router.post('/', contractsController.createContract);
router.delete('/:id', contractsController.deleteContract);
// router.post("/usersContracts", contractsController.get_users_contracts);

module.exports = router;
