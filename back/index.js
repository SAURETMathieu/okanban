require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const swagger = require('express-jsdoc-swagger');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

// Configuration swagger 
const swaggerOptions = {
  info: {
    title: 'Kanban API',
    description: 'API for Kanban project',
    version: '1.0.0',
  },
  filesPattern: './app/router/**/*.js',
  swaggerUIPath: '/api-docs',
  baseDir: __dirname,
  exposeSwaggerUI: true,
};

// Initilisation d'express-jsdoc-swagger
swagger(app)(swaggerOptions);

// Mise en place du CORS
app.use(cors({
  origin: '*',
}));

// Mise en place des body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mise en place du dossier statique
app.use(express.static('public'));

// Mise en place du router
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`server ready on http://localhost:${PORT}`);
});

