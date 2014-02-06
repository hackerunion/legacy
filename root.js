/* global require */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3001);

app.get('/hello', hello);

app.get('/api/chapters/:chapter_name', chapter);

function hello(req, res) {
  res.send(200, "Hello!!!!!");
}

function chapter(req, res) {
  res.json(200, [{chapter: req.params.chapter_name}]);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});

//   function callback(err, files) {
//     res.end(files.toString());
//   }

//   fs.readdir('people', callback)

// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');
