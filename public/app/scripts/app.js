/* route handling file */
var RootApp = angular.module('RootApp', ['ngRoute'])

	.config(function($locationProvider) {
		
		$locationProvider.html5Mode(true);

	})

	.config(function($provide) {
	
		// register services 
		$provide.factory('HTTPService', HTTPService);

	});
		