const express = require('express');
const tagController = require('../../controllers/tagController');
const { createTagSchema, updateTagSchema } = require('../../validation/schemas/tag');
const { paramIdSchema } = require('../../validation/schemas/params');
const validate = require('../../validation');

const router = new express.Router();

/**
 * GET /api/tags/{id}
 * @summary get one tag
 * @tags Tags
 * @param {number} id.path.required - id of wanted tag
 * @return {Tag} 200 - success response - application/json
 * @return {Error} 400 - error response - application/json
 * @return {Error} 404 - error response - application/json
 */
router.get(
  '/:id', 
  validate({ schema: paramIdSchema, source: 'params' }), 
  tagController.findOne
);

/**
 * PATCH /api/tags/{id}
 * @summary update one tag
 * @tags Tags
 * @param {number} id.path.required - id of wanted tag
 * @param {TagPayload} request.body.required - tag's new data
 * @return {Tag} 200 - success response - application/json
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - tag not found
 */
router.patch(
  '/:id', 
  validate(
    [
      { schema: paramIdSchema, source: 'params' },
      { schema: updateTagSchema, source: 'body' },
    ]
  ),
  tagController.updateOne
);

/**
 * DELETE /api/tags/{id}
 * @summary delete one tag
 * @tags Tags
 * @param {number} id.path.required - id of wanted tag
 * @return {} 204 - success response
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - tag not found
 */
router.delete(
  '/:id', 
  validate({ schema: paramIdSchema, source: 'params' }), 
  tagController.deleteOne
);

/**
 * GET /api/tags
 * @summary get all tags
 * @tags Tags
 * @return {array<Tag>} 200 - success response - application/json
 */
router.get('/', tagController.findAll);

/**
 * POST /api/tags
 * @summary create one tag
 * @tags Tags
 * @param {TagPayload} request.body.required - tag's data
 * @return {Tag} 201 - success response - application/json
 * @return {Error} 400 - error response - bad input
 */
router.post(
  '/', 
  validate({ schema: createTagSchema, source: 'body' }), 
  tagController.createOne
);

module.exports = router;