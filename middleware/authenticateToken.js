const jwt = require('jsonwebtoken');

// format of token:
// Authorization: Bearer <access_token>

function authenticateToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const accessToken = bearer[1]
        // verify token:
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if (err) {return res.sendStatus(403)}
            else {
                req.token = accessToken;
                req.user = user;
                next();
            }
        })
    }
    else {
        res.sendStatus(401);
    }
};

module.exports = {authenticateToken}; 