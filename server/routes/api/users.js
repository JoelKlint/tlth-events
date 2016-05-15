var router = require('express').Router();
var User = require('../../../models/user');

router.route('/')
	.get(function(req, res, next) {
		User.find().then(function(users) {
			res.json(users);
		})
		.catch(function(error) {
			return next(err);
		});
	})

	.post(function(req, res, next) {
		var user = new User(req.body);
		user.save().then(function(user) {
			res.json(user);
		})
		.catch(function(err) {
			return next(err);
		});
	});

module.exports = router;
