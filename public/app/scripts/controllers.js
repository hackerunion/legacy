
function BaseCntl($scope, $location, HTTPService) {
	$scope.domain = window.location.origin;

	$scope.chapters;

	var getChapters = function() {
		HTTPService.getChapters().then(function(data) {
			console.log('data', data);
			$scope.chapters = data;
		});
	}
	var getUsers = function(chapter) {
		HTTPService.httpGET("/api/chapters/" + chapter + "")
	}


	var init = function() {
		getChapters();
	}
	init();
}

function ChapterCntl($scope, $routeParams, HTTPService) {
	$scope.chapterName = $routeParams.chapterName;
	$scope.users;
	$scope.events;

	var init = function() {
		HTTPService.getUsers($scope.chapterName).then(function(data) {
			console.log('users', data);
			$scope.users = data;
		});

		HTTPService.getEvents($scope.chapterName).then(function(data) {
			console.log('events', data);
			$scope.events = data;
		});
	}
	init();
}





