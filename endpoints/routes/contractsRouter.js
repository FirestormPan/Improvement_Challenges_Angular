var express = require('express');
var router = express.Router();
var contractsController = require('../controllers/contractController');

router.get('/', function(req, res, next) {
res.send('respond with a resource');
});


router.post('/', contractsController.createContract);
router.delete('/:id', contractsController.deleteContract);
router.get('/:id', contractsController.getContractWithUsers);
router.post('/create', contractsController.createContract);
router.post('/complete/', contractsController.completeContract);

module.exports = router;
