(function () {
	'use strict';

	angular
	.module('app')
	.factory('QuestionsService', Service);

	function Service($location, $http, $localStorage) {
		var service = {};

		service.getQuestions = getQuestions;
		service.submitQuiz = submitQuiz;

		return service;

		function getQuestions(data, callback) {
			$http({
				method: 'GET',
				url: 'http://localhost:8080/api/course/'+data.course.id+'/start/'+data.empId
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
			$http({
				method: 'POST',
				url: 'http://localhost:8080/api/course/submit/'+attemptId,
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