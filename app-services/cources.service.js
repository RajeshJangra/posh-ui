(function () {
    'use strict';

    angular
        .module('app')
        .factory('CourcesService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.getCourses = getCourses;

        return service;

        function getCourses(username, callback) {
            $http.get('http://localhost:8080/api/employee/'+username+'/courses')
                  .success(function (response) {
                        callback(response);
                });
        }
        
    }
})();