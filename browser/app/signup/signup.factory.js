app.factory('SignupFactory', function($http, $state, User) {

	var SignupFactory = {};

	SignupFactory.signup = function(newemail, newpassword) {
		return $http.post('/api/users', {email: newemail,password: newpassword})
		.then(function(response) {
			return $http.post('/login', {email: response.data.email, password: response.data.password})
		})
		.then(function(response) {
			if (response.status == 200) {
				$state.go('user', {id: response.data._id})
			}
		})
      	.then (null, function(err) {
           console.log("Invalid Login: ", err)
      	})
	}

	return SignupFactory;
})