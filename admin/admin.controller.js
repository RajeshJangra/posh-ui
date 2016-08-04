(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin.Controller', Controller);

    function Controller($location, $scope, AdminService, $localStorage) {
		
    	initController();

        function initController() {
			$scope.allCourses = [];
			if($localStorage.currentUser.role != 'admin'){
				$location.path('/');
			} else{
			AdminService.getAllCourses(function (response) {			
				$scope.allCourses = response.data;
			});
			}
        }
        
 
    }

})();