var express = require('express');
var router = express.Router();

var postController = require('../controllers/postController');

// get all blog posts
router.get('/', postController.get_posts);

// create a post
router.post('/', postController.create_post)

// get a specific post
router.get('/:id', postController.get_post)

// delete a post
router.delete('/:id', postController.delete_post)

// // update a post
// router.put('/:id', postController.update_post)

module.exports = router;