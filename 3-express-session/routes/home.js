var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('home', {
  	title: 'Express Home',
  	username: req.session.username
  });
});

module.exports = router;
