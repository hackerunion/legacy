var test = require('tape');
var Joi = require('joi');

var chapters = require('../chapters-obj');
var userSchema = require('./user-schema');

test('validate all the users based on defined schema', function (t) {
  Object.keys(chapters).forEach(function (chapter) {
    Object.keys(chapters[chapter]).forEach(function (resource) {
      if (resource === 'users') {
        chapters[chapter][resource].forEach(function (obj) {
          t.equals(Joi.validate(obj, userSchema), null, 'User object is valid');
        });
      }
    });
  });
  t.end();
});
