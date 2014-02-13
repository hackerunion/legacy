/* global require */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3001);

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.get('/api/chapters', chapters);
app.get('/api/chapters/:chapter_name', sanitize, chapter);
app.get('/api/chapters/:chapter_name/:directory', sanitize, chapter_directory);

function sanitize(req, res, next) {
  for (var key in req.params) {
    if (req.params[key].indexOf(".") > -1) {
      return res.json(400, "Bad request");
    }
  }
  next();
}

function chapters(req, res) {
  function callback(err, files) {
    res.json(200, {"chapters": files});
  }

  fs.readdir('chapters', callback);
}

function chapter(req, res) {
  function callback(err, files) {
    res.json(200, files);
  }

  fs.readdir('chapters/' + req.params.chapter_name, callback);
}

function chapter_directory(req, res) {

  function callback(err, files) {
    var data = [];

    for (var i=0; i<files.length; i++) {
      try {
        var d = require('./chapters/' + req.params.chapter_name + '/' + req.params.directory + '/' + files[i]);
        data.push(d)
      } catch(exception) {}
    }

    res.json(200, data);
  }

  fs.readdir('chapters/' + req.params.chapter_name + '/' + req.params.directory, callback);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
