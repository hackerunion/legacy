/* global require */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3001);

app.get('/api/chapters', chapters);
// app.get('/api/chapters/:chapter_name', chapter);
// app.get('/api/chapters/:chapter_name/users', chapter_users);

function chapters(req, res) {
  function callback(err, files) {
    res.json(200, files);
  }

  fs.readdir('chapters', callback);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});

//   function callback(err, files) {
//     res.end(files.toString());
//   }

//   fs.readdir('users', callback)

// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');
