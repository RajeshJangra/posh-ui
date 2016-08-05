angular.module('induction.config', [
]).constant('constants',
		{
	baseUrl: "http://localhost:8080/",
	url:{
		auth:{
			url: 'api/auth',
			method: 'POST'
		}
	}
});
