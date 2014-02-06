'use strict';

/* Services */

var rootServices = angular.module('huRootApp.services', ['ngResource']);

rootServices.value('version', '0.1');

rootServices.factory('IpAddress', function($resource) {
  //return $resource('https://api.twitter.com/1/statuses/:action',
  return $resource("http://ip.jsontest.com/");
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

