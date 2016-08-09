(function () {
	'use strict';

	angular
	.module('induction.admin',[
        'induction.configuration'
        ])
	.factory('AdminService', Service);

	function Service($location, $http, Configuration) {
		var service = {};

		service.getAllCourses = getAllCourses;

		return service;

		function getAllCourses(callback) {
			var baseUrl = Configuration.getBaseUrl();
			$http({
				method: 'GET',
				url: baseUrl+'course'
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