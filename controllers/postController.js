var Post = require('../models/postModel');
const { post } = require('../app');


// Dislpay all blog posts
exports.get_posts = function(req, res, next){
    Post.find().sort([['date', 'descending']])
    .populate('author')
    .exec((err, posts) => {
        if (err) {return res.status(500).json({message: 'There was an error fetching blog posts', error: err})}
        else {
            posts.forEach(post => {
                post.author.password = undefined;
            })
            res.json(posts);
        }
    });
};

// create a post
exports.create_post = function(req, res, next){
    let post = new Post({
        title: req.body.title,
        post: req.body.post,
        author: req.body.author,
        date: req.body.date
    })
    post.save(post, function(err, post){
        if (err) {
            res.status(400).json({message: 'error creating post', error: err})
        }
        else {
            res.json({message:'post created', post: post})
        }
    });
};

// get a specific post
exports.get_post = function(req, res, next){
    Post.findById(req.params.id).populate('author')
    .exec((err, post) => {
        if (err) {
            res.status(400).json({message: 'error finding post', error:err})
        }
        else {
            post.author.password = undefined;
            res.json(post);
        }
    })
}

// delete post
exports.delete_post = function(req, res, next) {
    Post.findByIdAndDelete(req.params.id, function(err, del_post){
        if (err) {
            res.status(400).json({message: 'Error, could not delete post', error: err})
        }
        else {
            // del_user.password = undefined;
            res.json({message: 'deleted post', deleted_post: del_post})
        }
    })
};
