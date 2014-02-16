
function BaseCntl($scope, $location, HTTPService) {
	$scope.domain = window.location.origin;

	$scope.chapters;

	var getChapters = function() {
		HTTPService.getChapters().then(function(data) {
			console.log('data', data);
			$scope.chapters = data;
		});
	}

	var init = function() {
		getChapters();
	}
	init();
}

function ChapterCntl($scope, $routeParams, HTTPService) {
	$scope.chapterName = $routeParams.chapterName;
	$scope.subdirectories = {};

	var init = function() {

		HTTPService.getChapter($scope.chapterName).then(function(chapter) {
			for (subdirIndex in chapter.submodules) {
				var subdirectory = chapter.submodules[subdirIndex];

				HTTPService.getChapterSubdirectory($scope.chapterName, subdirectory).then(function(data) {
					$scope.subdirectories[data.subdirectory] = data.data;
				});
			}
		});

	}
	init();
}





