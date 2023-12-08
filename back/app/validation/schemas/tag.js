const Joi = require("joi");

const createTagSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(16)
    .required(),
  color: Joi.string()
    .min(3)
    .max(40),
});

const updateTagSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(16),
  color: Joi.string()
    .min(3)
    .max(40),
}).or('name', 'color');

module.exports = { createTagSchema, updateTagSchema };