var express = require('express');
var router = express.Router();
const usersController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', usersController.get_user_by_Id);
router.post('/signup', usersController.user_post);
// router.put('/', usersController.user_put);
router.patch('/:id', usersController.user_patch);
router.delete('/:id', usersController.user_delete)
router.post('/auth/', usersController.authenticate_user)
router.post('/forgotPassword/', usersController.changePassword)


module.exports = router;
