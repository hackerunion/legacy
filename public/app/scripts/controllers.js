
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
		HTTPService.getUsers("new_york").then(function(data) {
			console.log('users', data);
		});

		HTTPService.getEvents("new_york").then(function(data) {
			console.log('events', data)
		})
	}
	init();
}

function ChapterCntl($scope, $routeParams) {
	$scope.chapter = $routeParams.chapterName;
	$scope.users;
	$scope.events;

	console.log('ChapterCntl', $routeParams)
}





