(function () {
	'use strict';

	angular
	.module('induction.question',[
	    'induction.configuration'
	    ])
	.factory('QuestionsService', Service);

	function Service($location, $http, $localStorage, Configuration) {
		var service = {};

		service.getQuestions = getQuestions;
		service.submitQuiz = submitQuiz;

		return service;

		function getQuestions(data, callback) {
			var baseUrl = Configuration.getBaseUrl();
			$http({
				method: 'GET',
				url: baseUrl+'api/course/'+data.course.id+'/start/'+data.empId
			}).then(function(response) {
				callback(response);
		    }, function(response) {
		    	if(response.status == 401){
					$location.path('/login');
				}
				console.log(response);
		    });
		}

		function submitQuiz(attemptId, questions) {
			var baseUrl = Configuration.getBaseUrl();
			$http({
				method: 'POST',
				url: baseUrl+'api/course/submit/'+attemptId,
				data: questions
			}).then(function(response) {
				$localStorage.attemptId = attemptId;
				$location.path('/scorecard');
		    }, function(response) {
		    	if(response.status == 401){
					$location.path('/login');
				}
		    	console.log(response);
		    });
		}

	}
})();