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
var chaptersDir = path.join(__dirname, 'api', 'chapters');

var chapters = fs.readdirSync(chaptersDir);

module.exports = chapters.reduce(function (acc, chapter) {
  var chapterDir = path.join(chaptersDir, chapter);
  acc[chapter] = fs.readdirSync(chapterDir).reduce(function (paths, resource) {
    var resourceDir = path.join(chapterDir, resource);
    paths[resource] = fs.readdirSync(resourceDir).map(function(file) {
      if (!/.json$/.test(file)) {
        return null;
      }
      var json;
      //
      // LETS MAKE SURE WE HAVE VALID JSON JUST TO BE SURE GUYS
      //
      try { json = require(path.join(resourceDir, file)) }
      catch (ex) { json = null }

      return json;
    }).filter(Boolean);
    return paths;
  }, {});
  return acc;
}, {});
