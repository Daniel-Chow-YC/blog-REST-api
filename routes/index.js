var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog Post API' });
});

// login 
router.post('/login', indexController.login);


module.exports = router;


