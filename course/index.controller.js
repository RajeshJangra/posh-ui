(function () {
    'use strict';

    angular
        .module('app')
        .controller('Course.IndexController', Controller);

    function Controller($location, $scope, CourcesService, $localStorage) {

        initController();

        function initController() {
			var username = $localStorage.currentUser.username;
			$scope.username = username;
			CourcesService.getCourses(username, function (result) {
			   if (result.length > 0) {
                       $scope.courses = result;
                    } else {
                       
                    }
            });
        }
		
		$scope.questions = function questions(courseId,courseName,empId) {
			var data = {"courseId":courseId,"courseName":courseName,"empId":empId};
			$localStorage.selectedCource = data;
           $location.path('questions'); 
        };
		
    }

})();