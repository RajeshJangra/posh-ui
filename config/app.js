app = angular.module('Induction',["ngRoute"])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/login.html",
        controller:"LoginController"
    })
    .when("/listing", {
        templateUrl : "templates/listing.html",
        controller : "ListController"
    })
    .when("/questions", {
        templateUrl : "templates/question.html",
        controller:"QuestionController"
    })
    .otherwise("/", {
		templateUrl : "templates/login.html",
		controller : "LoginController"
    });
});