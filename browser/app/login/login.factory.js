app.factory('LoginFactory', function($http, $state, User) {

	var LoginFactory = {};

	LoginFactory.signup = function(email, password){
     	return $http.post('/login',{email: email,password: password})
     	.then(function(res){ 
     		if (res.status === 200) {
     			$state.go('user', {id: res.data._id})
     		} 		
     	})
          .then (null, function(err) {
               console.log("Invalid Login: ", err)
          })
     }

	return LoginFactory;
})