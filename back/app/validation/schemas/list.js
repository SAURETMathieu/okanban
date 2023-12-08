const Joi = require("joi");

const createListSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(1024)
    .required(),
  position: Joi.number()
    .integer()
    .min(0)
    .max(128),
});

const updateListSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(1024),
  position: Joi.number()
    .integer()
    .min(0)
    .max(128),
}).or('name', 'position');

module.exports = { createListSchema, updateListSchema };