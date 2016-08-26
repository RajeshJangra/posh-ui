angular.module('induction.config', [
]).constant('constants',
		{
	baseUrl: "http://192.168.100.20:8080/induction/",
	url:{
		auth:{
			url: 'api/auth',
			method: 'POST'
		}
	}
});
