﻿﻿(function () {
    'use strict';

    angular
        .module('induction.authentication',[
           'induction.configuration'
           ])
        .factory('AuthenticationService', Service);

    function Service($rootScope, $http, $localStorage, Configuration) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
        	var baseUrl = Configuration.getBaseUrl();
            $http.post(baseUrl+'auth', { username: username, password: password })
                .success(function (response) {
					service.Logout;
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.token, role : response.roles[0] };
						if(response.roles[0] == 'admin'){
							$rootScope.showAdmin = true;
						} else{
							$rootScope.showAdmin = false;
						}
						
                        $http.defaults.headers.common['X-Auth-Token'] = response.token;
                        // add jwt token to auth header for all requests made by the $http service
                        //$http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(response);
                    }
                })
				.error(function(response){
					callback(response);
				});
        }

        function Logout() {
            // remove user from local storage and clear http auth header
			$rootScope.showLogin = false;
			$rootScope.showAdmin = false;
            delete $localStorage.currentUser;
            delete $http.defaults.headers.common['X-Auth-Token'];
			
        }
    }
})();