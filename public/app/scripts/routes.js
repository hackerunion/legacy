
RootApp.config(function($routeProvider) {
	
	$routeProvider.when('/teams', {
		templateUrl: '/views/teams.html',
		controller: TeamsCntl
	});
	$routeProvider.when('/', {
		templateUrl: '/views/index.html'
	});

});