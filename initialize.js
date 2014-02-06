
var fs = require('fs');
var async = require('async');
var levelws = require('level-ws');

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
// arrays of the file paths to the resources
//
var chaptersDir = path.join(__dirname, 'chapters');

var chapters = fs.readDirSync(chaptersDir);

var resources = chapters.reduce(function (acc, chapter) {
  var chapterDir = path.join(chaptersDir, chapter);
  acc[chapter] = fs.readDirSync(chapterDir).reduce(function (paths, resource) {
    var resourceDir = path.join(chapterDir, resource);
    paths[resource] = fs.readDirSync(resourceDir).map(function(file) {
      return path.join(resourceDir, file);
    });
    return paths;
  }, {});
  return acc;
}, {});

// Create a sublevel per chapter DAMNIT PREOPTIMIZATION
module.exports = function (db, callback) {

  db = levelws(db);

  var ws = db.createWriteStream();

  ws.on('error', callback);

  ws.on('close', callback);
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
