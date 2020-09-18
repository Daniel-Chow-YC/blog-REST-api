var User = require('../models/userModel');
const bcrypt = require('bcryptjs');
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
exports.post_user = async function(req, res, next){
    let salt = await bcrypt.genSalt(10);
    let hashed_pass = await bcrypt.hash(req.body.password, salt)
    let user = new User({
        username: req.body.username,
        password: hashed_pass
    });
    // check if username is already taken
    User.find({username: req.body.username}, (err, foundUsers) => {
        if (err) return next(err);
        else if (foundUsers.length) {
            res.status(400).json({message: 'username is already taken'})
        }
        else {
            user.save(function (err, user) {
                if (err) {
                    res.status(400).json({ message: 'error creating user', error: err.message})
                }
                else {
                    user.password = undefined;
                    res.json({message: 'user created' ,user});
                };        
            });
        }
    })
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


// update a user
exports.update_user = async function(req, res, next){
    let updated_user = new User({
        _id: req.params.id,
        username: req.body.username,
        password: req.body.password
    })
    User.findByIdAndUpdate(req.params.id, updated_user, {new: true}, function(err, updated_user) {
        if (err) {
            res.status(400).json({error: err});
        }
        else {
            updated_user.password = undefined;
            res.json({message: 'updated user', user_updated: updated_user})
        }
    })
};
