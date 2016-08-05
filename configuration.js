(function () {
    "use strict";
    angular.module('induction.configuration', [
        'induction.config'
    ]).factory('Configuration', function (constants) {

        function getUrl(path) {
            function index(obj, i) {
                return obj[i];
            }
           return path.split('.').reduce(index,constants.url);
         }
         function getBaseUrl(){
           return constants.baseUrl;

         }
        return {
            getUrl: getUrl,
            getBaseUrl: getBaseUrl
        };
    });
}());
