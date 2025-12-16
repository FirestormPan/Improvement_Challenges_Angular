var express = require('express');
var router = express.Router();
const usersController = require('../controllers/userController')
const multer  = require('multer')
//set a storing format for the files uploaded via multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${safeName}`);
  }
});

const upload = multer({ storage });

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
router.get('/check-availability/', usersController.checkAvailability)
router.post('/upload-pfp/', upload.single('avatar'), usersController.uploadPfp)
router.post('/contracts/', usersController.getUserContracts)
router.get('/search/:term', usersController.searchUsersByName);
module.exports = router;
