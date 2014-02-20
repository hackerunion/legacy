
function BaseCntl($scope, $location, HTTPService) {
	$scope.domain = window.location.origin;

	$scope.chapters;

	$scope.submodules = {};

	var getChapters = function() {
		HTTPService.getChapters().then(function(data) {
			console.log('data', data);
			$scope.chapters = data;
		});
	}
	$scope.getChapterSubmodules = function(chapterName) {
		HTTPService.getChapter(chapterName).then(function(data) {
			$scope.submodules[chapterName] = data;
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
			for (submodIndex in chapter.submodules) {
				var submodule = chapter.submodules[submodIndex];

				HTTPService.getChapterSubmodule($scope.chapterName, submodule).then(function(data) {
					$scope.subdirectories[data.module] = data.data;
				});
			}
		});

	}
	init();
}





