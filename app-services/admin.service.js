(function () {
	'use strict';

	angular
	.module('app')
	.factory('AdminService', Service);

	function Service($location, $http) {
		var service = {};

		service.getAllCourses = getAllCourses;

		return service;

		function getAllCourses(callback) {
			$http({
				method: 'GET',
				url: 'http://localhost:8080/api/course'
			}).then(function(response) {
				callback(response);
		    }, function(response) {
		    	if(response.status == 401){
					$location.path('/login');
				}
				console.log(response);
		    });
		}

	}
})();