
RootApp.config(function($routeProvider) {
	
	$routeProvider.when('/chapters/:chapterName', {
		templateUrl: '/views/chapter.html',
		controller: ChapterCntl
	});
	$routeProvider.when('/', {
		templateUrl: '/views/index.html'
	});

});