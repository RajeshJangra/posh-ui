angular.module('induction.config', [
]).constant('constants',
		{
	baseUrl: "http://localhost:8080/induction/",
	url:{
		auth:{
			url: 'api/auth',
			method: 'POST'
		}
	}
});
