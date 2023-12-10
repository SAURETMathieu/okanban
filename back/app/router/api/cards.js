const express = require('express');
const cardController = require('../../controllers/cardController');
const { createCardSchema, updateCardSchema } = require('../../validation/schemas/card');
const { associateTagCardSchema, dissociateTagCardSchema } = require('../../validation/schemas/association');
const { paramIdSchema } = require('../../validation/schemas/params');
const validate = require('../../validation');

const router = new express.Router();

/**
 * GET /api/cards/{id}
 * @summary get one card
 * @tags Cards
 * @param {number} id.path.required - id of wanted card
 * @return {Card} 200 - success response - application/json
 * @return {Error} 400 - error response - application/json
 * @return {Error} 404 - error response - application/json
 */
router.get(
  '/:id', 
  validate({ schema: paramIdSchema, source: 'params' }), 
  cardController.findOne
);

/**
 * PATCH /api/cards/{id}
 * @summary update one card
 * @tags Cards
 * @param {number} id.path.required - id of wanted card
 * @param {CardPayload} request.body.required - card's new data
 * @return {Card} 200 - success response - application/json
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - card not found
 */
router.patch(
  '/:id',
  validate([
    { schema: paramIdSchema, source: 'params' },
    { schema: updateCardSchema, source: 'body' }
  ]),
  cardController.updateOne
);

/**
 * DELETE /api/cards/{id}
 * @summary delete one card
 * @tags Cards
 * @param {number} id.path.required - id of wanted card
 * @return {} 204 - success response
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - card not found
 */
router.delete(
  '/:id', 
  validate({ schema: paramIdSchema, source: 'params' }), 
  cardController.deleteOne
);

/**
 * GET /api/cards
 * @summary get all cards
 * @tags Cards
 * @return {array<Card>} 200 - success response - application/json
 */
router.get('/', cardController.findAll);

/**
 * POST /api/cards
 * @summary create one card
 * @tags Cards
 * @param {CardPayload} request.body.required - card's new data
 * @return {Card} 201 - success response - application/json
 * @return {Error} 400 - error response - bad input
 */
router.post(
  '/',
  validate({ schema: createCardSchema, source: 'body' }), 
  cardController.createOne
);

/**
 * POST /api/cards/{id}/tags
 * @summary associate one card to one tag
 * @tags Cards and Tags Associations
 * @param {number} id.path.required - id of wanted card
 * @param {TagIdPayload} request.body.required - card's new data
 * @return {Card} 200 - success response
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - card not found
 */
router.post(
  '/:id/tags',
  validate([
    { schema: paramIdSchema, source: 'params' },
    { schema: associateTagCardSchema, source: 'body' },
  ]),
  cardController.addTag
);

/**
 * DELETE /api/cards/{cardId}/tags/{tagId}
 * @summary dissociate one card from one tag
 * @tags Cards and Tags Associations
 * @param {string} cardId.path.required - id of wanted card
 * @param {string} tagId.path.required - id of wanted tag
 * @return {Card} 200 - success response
 * @return {Error} 400 - error response - bad input
 * @return {Error} 404 - error response - card not found
 */
router.delete(
  '/:cardId/tags/:tagId', 
  validate({schema: dissociateTagCardSchema, source: 'params'}), 
  cardController.removeTag
);

module.exports = router;