
var fs = require('fs');
var path = require('path');
var chapters = require('./chapters-obj');
// Create a sublevel per chapter DAMNIT PREOPTIMIZATION
module.exports = function (db, app, callback) {
  var done = 0,
      streams;

  function onFinish() {
    return
  }
  //
  // Remark: Just grab the resource keys so we can setup the sublevels before hand
  // we make the assumption here that all of the same resources are in each
  // chapter.
  // TODO: make this less messy
  //

  var chapterKeys = Object.keys(chapters);
  var resources = Object.keys(chapterKeys[0]);
  // Make a sublevel for each resource
  app.sublevels = {};
  resources.forEach(function (resource) {
    app.sublevels[resource] = db.sublevel(resource);
  });


  Object.keys(chapters).forEach(function (chapter) {
    Object.keys(chapters[chapter]).forEach(function (resource) {

    });
  });
  //
  // TODO: Make this better
  //
  // How are we namespacing keys to optimize our streams?
  //
  // Global users db to get ALL users (futuring)
  //
  // Namespace by chapterName to get a quick stream
  //
  // chapterName!userName
  //
  // Namespace by chapterName!eventName
  //

};
