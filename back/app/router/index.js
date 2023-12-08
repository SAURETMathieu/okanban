const express = require('express');
const apiRouter = require('./api');

const tagsRouter = require('./api/tags');

const router = new express.Router();

// on branche la route /api sur le router apiRouter
router.use('/api', apiRouter);

router.get('/', (_, response)=>{
  response.redirect('/api-docs');
});

router.use((request, response) => {
  response.status(404).json({ error: 'Not found' });
});

module.exports = router;