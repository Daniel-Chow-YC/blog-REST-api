var Comment = require('../models/commentModel');

// get all comments for a post
exports.get_comments = function(req, res, next){
    Comment.find({post: req.params.id}).sort([['date', 'descending']])
    .exec((err, comments)=>{
        if (err) {
            res.status(400).json({message: 'error fetching comments', error:err})
        }
        else {
            res.json(comments)
        }
    })
}

// get specific comment
exports.get_comment = (req, res, next) => {
    Comment.find({post: req.params.id, _id: req.params.commentid})
    .exec((err,comment)=>{
        if (err) {
            res.status(400).json({message: 'error fetching comment', error:err})
        }
        else {
            res.json(comment);
        }
    })
};

// create a comment
exports.create_comment = (req, res, next) => {
    let comment = new Comment({
        main: req.body.main,
        author: req.body.author,
        post: req.params.id
    })
    comment.save((err, comment)=>{
        if (err) {
            res.status(400).json({message:'error posting comment', error: err})
        }
        else {
            res.json(comment);
        }
    })
};

// delete a comment
exports.delete_comment = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.commentid, (err, del_comment)=>{
        if (err) {
            res.status(400).json({message:'error, unable to delete comment', error: err})
        }
        else {
            res.json({message:'deleted comment', deleted_comment: del_comment})
        }
    })
};