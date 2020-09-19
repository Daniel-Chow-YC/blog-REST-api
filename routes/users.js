var express = require('express');
var router = express.Router();
var auth = require('../middleware/authenticateToken');

// require controller modules
var userController = require('../controllers/userController');

/* GET all users. */
router.get('/', userController.get_users)

// Create a user
router.post('/', auth.authenticateToken, userController.post_user)

// Get a specific user
router.get('/:id', userController.get_user)

// Delete a user
router.delete('/:id', auth.authenticateToken, userController.delete_user)

// Update a user
router.put('/:id', auth.authenticateToken, userController.update_user)

module.exports = router;
