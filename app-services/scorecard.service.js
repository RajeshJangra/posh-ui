(function () {
	'use strict';

	angular
	.module('induction.scorecard',[
	    'induction.configuration'
	    ])
	.factory('ScorecardService', Service);

	function Service($location, $http, Configuration) {
		var service = {};

		service.getScorecard = getScorecard;

		return service;

		function getScorecard(attemptId, callback) {
			var baseUrl = Configuration.getBaseUrl();
			$http({
				method: 'GET',
				url: baseUrl+'api/course/scorecard/'+attemptId
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