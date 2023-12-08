const express = require('express');
const listController = require('../../controllers/listController');
const cardController = require('../../controllers/cardController');
const { createListSchema, updateListSchema } = require('../../validation/schemas/list');
const { paramIdSchema } = require('../../validation/schemas/params');
const validate = require('../../validation');

const router = new express.Router();

/**
 * GET /api/lists/{id}
 * @summary get one list
 * @tags Lists
 * @param {string} id.path.required - id of wanted list
 * @return {List} 200 - success response - application/json
 * @return {Error} 400 - error response - application/json
 * @return {Error} 404 - error response - application/json
 */
router.get('/:id', validate({ schema: paramIdSchema, source: 'params' }), listController.findOne);

/**
 * GET /api/lists/{id}/cards
 * @summary get one list's cards
 * @tags Lists
 * @param {string} id.path.required - id of wanted list
 * @return {array<Card>} 200 - success response - application/json
 * @return {Error} 400 - error response - application/json
 * @return {Error} 404 - error response - application/json
 */
router.get(
  '/:id/cards', 
  validate({ schema: paramIdSchema, source: 'params' }), 
  cardController.findAllByListId
);

/**
 * PATCH /api/lists/{id}
 * @summary update one list
 * @tags Lists
 * @param {string} id.path.required - id of wanted list
 * @param {ListPayload} request.body.required - list's new data
 * @return {List} 200 - success response - application/json
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - card not found
 */
router.patch(
  '/:id', 
  validate([
    { schema: paramIdSchema, source: 'params' },
    { schema: updateListSchema, source: 'body' },
  ]), 
  listController.updateOne
);

/**
 * DELETE /api/lists/{id}
 * @summary delete one list
 * @tags Lists
 * @param {string} id.path.required - id of wanted list
 * @return {} 204 - success response
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - card not found
 */
router.delete(
  '/:id',
  validate({ schema: paramIdSchema, source: 'params' }),
  listController.deleteOne
);

/**
 * GET /api/lists
 * @summary get all lists
 * @tags Lists
 * @return {array<List>} 200 - success response - application/json
 */
router.get('/', listController.findAll);

/**
 * POST /api/lists
 * @summary create one list
 * @tags Lists
 * @param {ListPayload} request.body.required - list's data
 * @return {List} 200 - success response - application/json
 * @return {Error} 400 - error response - bad input
 */
router.post(
  '/',
  validate({ schema: createListSchema, source: 'body' }),
  listController.createOne
);

module.exports = router;