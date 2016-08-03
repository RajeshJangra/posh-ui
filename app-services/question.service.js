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
			$http.get('http://localhost:8080/api/course/'+data.course.id+'/start/'+data.empId)
			.success(function (response) {
				callback(response);
			})
			.error(function(response){
				$location.path('/login');
			});
		}

		function submitQuiz(attemptId, questions, callback) {
			$http.post('http://localhost:8080/api/course/submit/'+attemptId, questions)
			.success(function (response) {
				callback(response);
			})
			.error(function(response){
				if(response.status == 401){
					$location.path('/login');
				}
			});
		}

	}
})();