'use strict';

angular.module('huRootApp', [
  'ngResource',
  'ngRoute',
  'huRootApp.services'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
