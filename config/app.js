app = angular.module('Induction',["ngRoute"])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/login.html",
        controller:"LoginController"
    })
    .when("/listing", {
        templateUrl : "partials/listing.html",
        controller : "ListController"
    })
    .when("/questions", {
        templateUrl : "partials/question.html",
        controller:"QuestionController"
    })
    .otherwise("/", {
		templateUrl : "partials/login.html",
		controller : "LoginController"
    });
});