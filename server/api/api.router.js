'use strict';

var router = require('express').Router();
// var User = require('./users/user.model');

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

// router.post('/login', function(req, res, next) {
// 	User.findOne({email: req.body.email, password: req.body.password}).exec()
// 	.then(function(user) {
// 		if (!user) res.sendStatus(401);
// 		else {
// 			req.session.userId = user._id
// 			res.sendStatus(200)
// 		}
// 	})
// 	.then(null, next)
// })

module.exports = router;