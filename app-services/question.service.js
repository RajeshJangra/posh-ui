(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionsService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.getQuestions = getQuestions;

        return service;

        function getQuestions(data, callback) {
            $http.get('http://localhost:8080/api/course/'+data.course.id+'/start/'+data.empId)
                  .success(function (response) {
                        callback(response);
                });
        }
        
    }
})();