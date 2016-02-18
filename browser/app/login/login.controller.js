app.controller('loginCtrl',function($scope, $http, $state){
	$scope.submitLogin = function(){
     		return $http.post('/login',{email: $scope.email,password: $scope.password})
     		.then(function(res){ 
     			if (res.status === 200) {
     				$state.go('user', {id: res.data._id})
     				
     			}
     			if (res.status === 401) {
     				console.log("error invalid login");
     			}    		
     		})      
	};
})