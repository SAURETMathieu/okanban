const Joi = require("joi");

const associateTagCardSchema = Joi.object({
  tagId: Joi.number()
    .integer()
    .min(1)
    .required()
});

const dissociateTagCardSchema = Joi.object({
  cardId: Joi.number()
    .integer()
    .min(1)
    .required(),
  tagId: Joi.number()
    .integer()
    .min(1)
    .required()
});

module.exports = { associateTagCardSchema, dissociateTagCardSchema };

