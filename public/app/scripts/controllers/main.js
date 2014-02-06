'use strict';

angular.module('huRootApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('TeamListCtrl', function ($scope, IpAddress) {

    $scope.addresses = IpAddress.get();

    $scope.fruits = [
        'Apple',
        'Banana',
        'Cherry'
    ];
  })

;
