
var fs = require('fs');
var path = require('path');

//
// TODO: DONT HARDCODE THIS
//


//
// {
//   chapterName: {
//     users: [ pathToFile.json, pathToOtherFile.json]
//     events: []
//   }
// }
//
// Synchronously create the resources object that contains
// the hierarchy of the folders with at the core level it contains
// arrays of the json files
//
// Remark: how many json files does it take to make this load too much in
// memory? most likely pre-optimizing
//
// Note: We do a lot of sync stuff here because we are just initializing the
// server and makes the code way cleaner
//
var chaptersDir = path.join(__dirname, 'chapters');

var chapters = fs.readDirSync(chaptersDir).reduce(function (acc, chapter) {
  var chapterDir = path.join(chaptersDir, chapter);
  acc[chapter] = fs.readDirSync(chapterDir).reduce(function (paths, resource) {
    var resourceDir = path.join(chapterDir, resource);
    paths[resource] = fs.readDirSync(resourceDir).map(function(file) {
      //
      // Check for bad JSON JUST IN CASE OK GUYS
      //
      var json;
      try { json =  require(path.join(resourceDir, file)) }
      catch (ex) { json =  null }

      return json;
    }).filter(Boolean);
    return paths;
  }, {});
  return acc;
}, {});

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
