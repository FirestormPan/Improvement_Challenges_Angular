var express = require('express');
var router = express.Router();
const usersController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', usersController.getUserById);
router.post('/signup', usersController.createUser);
// router.put('/', usersController.user_put);
router.patch('/:id', usersController.user_patch);
router.delete('/:id', usersController.deleteUserByUsername)
router.post('/auth/', usersController.authenticate_user)
router.post('/forgotPassword/', usersController.changePassword)
router.post('/getUsersContracts/', usersController.getUserContracts)
router.get('/check-availability/', usersController.checkAvailability)

module.exports = router;
