
function BaseCntl($scope, $location, HTTPService) {
	$scope.domain = window.location.origin;

	$scope.chapters;
	/* instead of tacking the chapter's submodules onto the chapter,
		there is a separate object to hold the submodules.
		maps: {chapterName: submodules of chapter}
	*/
	$scope.submoduleNames = {};
	$scope.chapterSubmodules = {};

	var getChapters = function() {
		HTTPService.getChapters().then(function(data) {
			$scope.chapters = data;
		});
	}
	$scope.getChapter = function(chapterName) {
		if ($scope.submoduleNames[chapterName]) {
			$scope.submoduleNames[chapterName] = null;
			return;
		}
		HTTPService.getChapter(chapterName).then(function(data) {
			$scope.submoduleNames[chapterName] = data;
		});
	}

	$scope.getChapterSubmodule = function(chapterName, submoduleName) {
		if ($scope.chapterSubmodules[chapterName+submoduleName]) {
			$scope.chapterSubmodules[chapterName+submoduleName] = null;
			return;
		}

		HTTPService.getChapterSubmodule(chapterName, submoduleName).then(function(data) {
			$scope.chapterSubmodules[chapterName+submoduleName] = data;
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
					$scope.subdirectories[data.module] = JSON.stringify(data.data, null, 4);
				});
			}
		});

	}
	init();
}





