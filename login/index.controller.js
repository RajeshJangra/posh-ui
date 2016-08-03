﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', Controller);

    function Controller($rootScope, $location, AuthenticationService) {
        var vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
					$rootScope.showLogin = true;
                    $location.path('/');

                } else {
                	vm.error = 'Username or password is incorrect';
                	if(result === null || result === 'null' || result === undefined){
                		vm.error = 'Looks like server is down or not reachable.';
                	}
                    vm.loading = false;
                }
            });
        };
    }

})();