'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport')
var User = require('../api/users/user.model');

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'tongiscool'
    //cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   next();
// });

app.use(function (req, res, next) {
	if(!req.session.number) {
		req.session.number = Math.floor(Math.random()*100);
	}
    console.log('session', req.session);
    next();
});

app.post('/login', function(req, res, next) {
	return User.findOne({email: req.body.email, password: req.body.password}).exec()
	.then(function(user) {
		if (!user) res.sendStatus(401);
		else {
			req.session.userId = user._id
			res.send(user);
		}
	})
	.then(null, next)
})

app.put('/logout', function(req, res, next) {
	req.session.destroy()
	res.end()
})

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));



module.exports = app;