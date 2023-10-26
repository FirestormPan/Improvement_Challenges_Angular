var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:usernameIncludes', usersController.get_user_byID);

router.post('/create', usersController.user_create_post) 

module.exports = router;
