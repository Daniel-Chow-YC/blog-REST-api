var User = require('../models/userModel');
const { request } = require('express');


// Display all users
exports.get_users = function(req, res , next) {
    User.find().sort([['username', 'ascending']])
    .exec(function (err, list_users ) {
        if (err) {
            return res.status(500).json({message: 'error fetching users', error: err.message})
        };
        list_users.forEach(obj => {
            obj.password = undefined
        })
        res.json(list_users);
    })
}; 

// create a user
exports.post_user = function(req, res, next){
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err) {
            res.status(500).json({ message: 'error creating user', error: err.message})
        }
        user.password = undefined
        res.json(user)

    })
}

