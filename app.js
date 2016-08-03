(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        

        // app routes
        $stateProvider
            .state('course', {
                url: '/',
                templateUrl: 'course/index.view.html',
                controller: 'Course.IndexController',
                controllerAs: 'cm'
            })
            .state('scorecard', {
                url: '/scorecard',
                templateUrl: 'course/scorecard.view.html',
                controller: 'Course.ScorecardController',
                controllerAs: 'scorecardurl'
            })
			.state('questions', {
                url: '/questions',
                templateUrl: 'course/question.view.html',
                controller: 'Questions.IndexController',
                controllerAs: 'qm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            });
			// default route
        $urlRouterProvider.otherwise("/");
    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
			$rootScope.showLogin = true;
			if($localStorage.currentUser.role == 'admin'){
				$rootScope.showAdmin = true;
			} else{
				$rootScope.showAdmin = false;
			}
            $http.defaults.headers.common['x-auth-token'] = $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();