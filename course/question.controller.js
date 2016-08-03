(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($location, $scope, QuestionsService, $localStorage) {

        initController();

        function initController() {
			$location.path('/questions');
			var data = $localStorage.selectedCource;
			$scope.course = data.course;
			$scope.videoLink = "./static/videos/"+data.course.name+".mp4";
			$scope.pdfLink = "./static/pdf/"+data.course.name+".pdf";
			QuestionsService.getQuestions(data, function (result) {
            $scope.allQuestions = result.questions; 
			$scope.attemptId = result.attemptId;			
            });
			
        }
		
		
		$scope.start = function() {
			var data = $localStorage.selectedCource;
			QuestionsService.getQuestions(data, function (result) {
			$scope.allQuestions = result.questions; 
			$scope.attemptId = result.attemptId;	

			$scope.id = 0;
			$scope.quizOver = false;
			$scope.quizstarted = true;
			$scope.showScore = false;
			$scope.inProgress = true;
			$scope.getQuestion();
			$scope.selectedQuestions = [];
			});
			
			};

			$scope.reset = function() {
				$scope.inProgress = false;
				$scope.score = 0;
			}

			$scope.getQuestion = function() {
				var q = $scope.allQuestions[$scope.id];
				if(q) {
					$scope.question = q;
					$scope.options = q.choices;
					$scope.answer = q.correctChoiceId;
					$scope.answerMode = true;
				} else {
					$scope.quizOver = true;
					$scope.quizstarted = false;
				}
			};

			$scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();
				if(ans == $scope.answer) {
					$scope.score++;
					$scope.correctAns = true;
				} else {
					$scope.correctAns = false;
				}

				$scope.selectedQuestions.push({"id":$scope.question.id,"selectedChoiceId":ans});
				$scope.answerMode = false;
			};

			$scope.nextQuestion = function() {
				$scope.id++;
				$scope.getQuestion();
			}

			
			
			$scope.showHome = function() {
				$location.path('/');
			}
			
			$scope.finalSubmit = function() {
				
				QuestionsService.submitQuiz($scope.attemptId, $scope.selectedQuestions, function (response) {	
					$scope.score = response.scoreInPercent;
					$scope.result = response.result;
				});
				$scope.showScore = true;
				$scope.quizOver = false;
        }
		
		 
    }

})();