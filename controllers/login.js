app.controller('LoginController',function($scope){
	alert('Hello');
	$scope.form={
		username:''
	};
    $scope.login = function(){
	console.log($scope.form)
}
});