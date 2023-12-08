const Joi = require("joi");

const createCardSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(64)
    .required(),
  content: Joi.string()
    .min(3)
    .max(1024)
    .required(),
  color: Joi.string()
    .min(3)
    .max(40),
  position: Joi.number()
    .integer()
    .min(0)
    .max(128),
  listId: Joi.number()
    .integer()
    .min(1)
    .required()
});

const updateCardSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(64),
  content: Joi.string()
    .min(3)
    .max(1024),
  color: Joi.string()
    .min(3)
    .max(40),
  position: Joi.number()
    .integer()
    .min(0)
    .max(128),
  listId: Joi.number()
    .integer()
    .min(1),
}).or('content', 'color','position','listId');

module.exports = { createCardSchema, updateCardSchema };