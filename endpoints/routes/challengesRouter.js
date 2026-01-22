var express = require('express');
var router = express.Router();
var challengeController = require('../controllers/challengeController');

router.delete('/deleteCard/:id', challengeController.deleteCard);

module.exports = router;
