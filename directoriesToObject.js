var fs = require('fs');
var path = require('path');
//
// {
//   chapterName: {
//     users: [ userObject, otherUserObject]
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

module.exports = chapters.reduce(function (acc, chapter) {
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
