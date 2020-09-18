const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


exports.login = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) {
        res.status(400).json({message: 'error, something went wrong', error: err})
      }
      if (!user) {
        res.status(401).json({message: 'incorrect username or password'})
      }
      else {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (response) {
              // generate a signed json web token with the contents of user object, and secret access token
              const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'})
              res.json({message:'log in successful', accessToken: accessToken});
            }
            else {
              res.status(401).json({message: 'incorrect username or password'})
            }
        })
      }
   
    })
};