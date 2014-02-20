
function BaseCntl($scope, $location, HTTPService) {
	$scope.domain = window.location.origin;

	$scope.chapters;
	/* instead of tacking the chapter's submodules onto the chapter,
		there is a separate object to hold the submodules.
		maps: {chapterName: submodules of chapter}
	*/
	$scope.submodules = {}; 

	var getChapters = function() {
		HTTPService.getChapters().then(function(data) {
			$scope.chapters = data;
		});
	}
	/* please rename this function */
	$scope.getChapterSubmodules = function(chapterName) {
		if ($scope.submodules[chapterName]) {
			$scope.submodules[chapterName] = null;
			return;
		}
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





