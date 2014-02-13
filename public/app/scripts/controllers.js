
function MainCntl($scope, $location, HTTPService) {
	$scope.domain = window.location.origin;

	$scope.chapters;
	$scope.users;
	$scope.events;

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

function TeamsCntl($scope) {
	console.log('TeamsCntl')
}





