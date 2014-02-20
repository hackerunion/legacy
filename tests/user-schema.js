var Joi = require('joi');

module.exports = {
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  skills: Joi.array().required(),
  twitter: Joi.string(),
  github: Joi.string().required(),
  projects: Joi.array(),
  v: Joi.number(),
  //
  // TODO: REGEX THAT ITS A VALID URL OKAY
  //
  url: Joi.string()
};
