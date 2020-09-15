var User = require('../models/userModel');
const { request } = require('express');
const { findById } = require('../models/userModel');


// Display all users
exports.get_users = function(req, res , next) {
    User.find().sort([['username', 'ascending']])
    .exec(function (err, list_users ) {
        if (err) {
            return res.status(500).json({message: 'error fetching users', error: err.message})
        }
        else {
            list_users.forEach(obj => {
                obj.password = undefined
            })
            res.json(list_users);
        }
    })
}; 

// create a user
exports.post_user = function(req, res, next){
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err, user) {
        if (err) {
            res.status(500).json({ message: 'error creating user', error: err.message})
        }
        else {
            user.password = undefined;
            res.json(user);
        };

    });
};

// find a specific user
exports.get_user = function(req,res,next) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.status(400).json({message: 'could not find user', error: err})
        }
        else {
          user.password = undefined;
          res.json(user);
        }
    });
    
}

// delete a user
exports.delete_user = function(req, res, next) {
    User.findByIdAndDelete(req.params.id, function(err, del_user){
        if (err) {
            res.status(400).json({message: 'Error, could not delete user', error: err})
        }
        else {
            del_user.password = undefined;
            res.json({message: 'deleted user', deleted_user: del_user})
        }
    })
};
