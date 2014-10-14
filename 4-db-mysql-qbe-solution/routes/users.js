var express = require('express');
var router = express.Router();

// walkthrough 4-1
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'NodeJSExamples'
});

/* GET users listing. */
router.get('/', function(req, res) {


	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('select * from Person', function(err, rows) {
			if (err) {
				throw err;
			} else {
				console.log('ROWS @:' + new Date());
				console.log(rows);
				res.render('users', { title: 'Users', rows:rows, name: req.query.name});
			}

			connection.release();
		});

	});

});


router.post('/', function(req, res) {


	req.assert('lastName', 'Last Name is required').notEmpty();
	var errors = req.validationErrors();
	
	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('select * from Person where lastName like ?', [req.body.lastName + '%'],
			function(err, rows) {
				if (err) {
					throw err;
				} else {

					res.render('users', {
						title: 'Users',
						errors: errors,
						rows: rows,
						lastName: req.body.lastName
					});
				}

				connection.release();
			});

	});

});

module.exports = router;