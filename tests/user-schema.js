var Joi = require('joi');

module.exports = {
  email: Joi.string().email().required(),
  name: Joi.string().alphanum().required(),
  skills: Joi.array().required(),
  twitter: Joi.string().required(),
  github: Joi.string().required(),
  projects: Joi.array().required()
};
