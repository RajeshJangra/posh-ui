(function () {
    'use strict';

    angular
        .module('induction.course',[
        'induction.configuration'
        ])
        .factory('CourcesService', Service);

    function Service($location, $http, $localStorage, Configuration) {
        var service = {};

        service.getCourses = getCourses;

        return service;

        function getCourses(username, callback) {
        	var baseUrl = Configuration.getBaseUrl();
            $http.get(baseUrl+'api/employee/'+username+'/courses')
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