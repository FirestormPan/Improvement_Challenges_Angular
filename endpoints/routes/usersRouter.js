var express = require('express');
var router = express.Router();
const usersController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:id', usersController.get_user_byID);
router.post('/', usersController.user_post);
router.delete('/:id', usersController.user_delete)


module.exports = router;
