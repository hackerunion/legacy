var reduce = require('reduce-dir');

var path = require('path');

var dir = path.join(__dirname, '..', 'api');

reduce(dir, function (err, res) {
  if (err) return console.error(err);

  console.log(JSON.stringify(res));
})
