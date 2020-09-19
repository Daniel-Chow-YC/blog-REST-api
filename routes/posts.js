var express = require('express');
var router = express.Router();

var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController')
var auth = require('../middleware/authenticateToken');

// get all blog posts
router.get('/', postController.get_posts);

router.get('/users', function(req, res) {
    res.redirect('/posts')
});

// create a post
router.post('/', auth.authenticateToken, postController.create_post)

// get a specific post
router.get('/:id', postController.get_post)

// get all posts from the same author/user
router.get('/users/:id', postController.get_user_posts)

// delete a post
router.delete('/:id', auth.authenticateToken, postController.delete_post)

// update a post
router.put('/:id', auth.authenticateToken, postController.update_post)

// -----------Comments---------------//

// get all comments for a post
router.get('/:id/comments', commentController.get_comments)

// create a comment for a post
router.post('/:id/comments', commentController.create_comment);

// get a specfic comment
router.get('/:id/comments/:commentid', commentController.get_comment)

// delete a comment
router.delete('/:id/comments/:commentid', auth.authenticateToken, commentController.delete_comment)



module.exports = router;