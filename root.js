/* global require */
var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var level = require('level');
var sublevel = require('level-sublevel');

var db = sublevel(level(__dirname + 'database'));

var initialize = require('./initialize');

var app = express();
app.set('port', process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, '/public/app')));

app.get('/', function(req, res) {
  res.sendfile('public/app/base.html');
});
app.get('/chapters/:chapterName', function(req, res) {
  res.sendfile('public/app/base.html');
});

app.get('/api/chapters', chapters);
app.get('/api/chapters/:chapter_name', sanitize, chapter);
app.get('/api/chapters/:chapter_name/:directory', sanitize, chapter_directory);
app.use(express.static(__dirname + '/public/app'));

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
    if (err) {
      return notFound(err, res);
    }
    res.json(200, files);
  }

  fs.readdir('chapters', callback);
}

function chapter(req, res) {
  function callback(err, files) {
    if (err) {
      return notFound(err, res);
    }
    res.json(200, files);
  }

  fs.readdir('chapters/' + req.params.chapter_name, callback);
}

function chapter_directory(req, res) {

  function callback(err, files) {
    if (err) {
      return notFound(err, res);
    }
    //
    // Validate the files are json before we try and load them
    //
    var root = path.join(__dirname, 'chapters', req.params.chapter_name, req.params.directory);
    var data  = files.filter(function (file) {
      return /.json$/.test(file);
    }).map(function (file) {
      var d;
      try { d = require(path.join(root, file)); }
      catch (ex) { d = null; }
      return d;
    }).filter(Boolean);

    res.json(200, data);
  }

  fs.readdir('chapters/' + req.params.chapter_name + '/' + req.params.directory, callback);
}

function notFound(err, res) {
 //
  // TODO: send better error responses
  //
  res.writeHead(500, { 'content-type': 'application/json' });
  return res.end(JSON.stringify({ error: err.message, reason: 'invalid parameters'}));
}

var server = http.createServer(app);

//
// Initializes the database and loads
//
initialize(db, function (err) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
