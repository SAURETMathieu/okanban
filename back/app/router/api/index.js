const express = require('express');
const listsRouter = require('./lists');
const cardsRouter = require('./cards');
const tagsRouter = require('./tags');

const router = new express.Router();

// on branche la route /lists sur le router dedié aux listes
router.use('/lists', listsRouter);
// on branche la route /cards sur le router dedié aux cartes
router.use('/cards', cardsRouter);
// on branche la route /tags sur le router dedié aux tags
router.use('/tags', tagsRouter);

module.exports = router;

/*
Types definitions for swagger
*/

/**
 * A list type
 * @typedef {object} List
 * @property {number} id - list's id
 * @property {string} name - list's na
 * @property {number} position - list's position
 * @property {array<Card>} cards - list's cards
 * @property {string} created_at - list's creation date
 * @property {string} updated_at - list's last update date
 */

/**
 * A card type
 * @typedef {object} Card
 * @property {number} id - card's id
 * @property {string} content - card's content
 * @property {string} color - card's color
 * @property {number} position - card's position
 * @property {number} list_id - card's list id
 * @property {array<Tag>} tags - card's tag
 * @property {string} created_at - card's creation date
 * @property {string} updated_at - card's last update date
 */

/**
 * A tag type
 * @typedef {object} Tag
 * @property {number} id - tag's id
 * @property {string} name - tag's name
 * @property {string} color - tag's color
 * @property {string} created_at - tag's creation date
 * @property {string} updated_at - tag's last update date
 */

/**
 * A list payload type
 * @typedef {object} ListPayload
 * @property {string} name - list's name
 * @property {number} position - list's position
 */

/**
 * A card payload type
 * @typedef {object} CardPayload
 * @property {string} content - card's content
 * @property {string} color - card's color
 * @property {number} position - card's position
 * @property {number} list_id - card's list id
 */

/**
 * A tag payload type
 * @typedef {object} TagPayload
 * @property {string} name - tag's name
 * @property {string} color - tag's color
 */

/**
 * A tagId payload type
 * @typedef {object} TagIdPayload
 * @property {number} tagId - tag's id
 */

/**
 * A error type
 * @typedef {object} Error
 * @property {string} error - error message
 */
