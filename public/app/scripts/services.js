'use strict';

/* Services */

var rootServices = angular.module('huRootApp.services', ['ngResource']);

rootServices.value('version', '0.1');

rootServices.factory('IpAddress', function($resource) {
  //return $resource('https://api.twitter.com/1/statuses/:action',
  return $resource('http://ip.jsontest.com/');
  // {
  //   action: 'user_timeline.json',
  //   screen_name: 'cogell',
  //   count: '10',
  //   include_rts: '1',
  //   callback: 'JSON_CALLBACK'
  // }, {
  //   get:{
  //     method:'JSONP',
  //     isArray: true
  //   }});
});

rootServices.factory('Chapters', function($resource) {
  // return $resource("http://hackerunion.nodejitsu.com/api/chapters");
  return $resource('http://localhost:3001/api/chapters');
});

