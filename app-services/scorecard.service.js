(function () {
	'use strict';

	angular
	.module('app')
	.factory('ScorecardService', Service);

	function Service($location, $http) {
		var service = {};

		service.getScorecard = getScorecard;

		return service;

		function getScorecard(attemptId, callback) {
			$http({
				method: 'GET',
				url: 'http://localhost:8080/api/course/scorecard/'+attemptId
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