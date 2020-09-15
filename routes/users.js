var express = require('express');
var router = express.Router();

// require controller modules
var userController = require('../controllers/userController');

/* GET all users. */
router.get('/', userController.get_users)

// Create a user
router.post('/', userController.post_user)


// Delete a user
router.delete('/:id', userController.delete_user)

module.exports = router;
