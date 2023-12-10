BEGIN;

INSERT INTO "list" ("name","position") VALUES
  ('Backlog',0),
  ('À faire',1),
  ('En cours',2),
  ('À tester',3),
  ('Terminé',4);
  
  INSERT INTO "card" ("title", "content", "color", "list_id", "position") VALUES
  ('Création du front', 'Cette carte concerne la création du front. Nous devons créer une interface utilisateur intuitive et réactive.', '#ffffff', 1, 0),
  ('Mise en production', 'Cette carte concerne la mise en production. Nous devons déployer notre application sur un serveur de production.', '#ffffff', 1, 1),
  ('Test de sécurité', 'Cette carte concerne le test de sécurité. Nous devons nous assurer que notre application est sécurisée contre les attaques courantes.', '#0000ff', 2, 0),
  ('Refactorisation des routers', 'Cette carte concerne la refactorisation des routers. Le code doit être propre et facile à comprendre.', '#ffffff', 2, 1),
  ('Création de la doc', 'Cette carte concerne la création de la documentation. La documentation doit être claire et complète.', '#ffffff', 2, 2),
  ('Mise en place des routes', 'Cette carte concerne la mise en place des routes. Chaque route doit correspondre à une fonctionnalité spécifique de l''application.', '#ffffff', 3, 0),
  ('Refactorisation de la validation', 'Cette carte concerne la refactorisation de la validation. Nous devons nous assurer que les données entrantes sont valides.', '#ffffff', 3, 1),
  ('Conception de la db', 'Cette carte concerne la conception de la base de données. Nous devons définir les tables, les relations et les index nécessaires.', '#ff0000', 4, 0),
  ('Mise en place de Sequelize', 'Cette carte concerne la mise en place de Sequelize. Sequelize est un ORM pour Node.js qui nous permet de gérer notre base de données de manière plus intuitive.', '#00ff00', 4, 1),
  ('Conception de l''API', 'Cette carte concerne la conception de l''API. Nous devons définir les routes, les contrôleurs et les middlewares nécessaires.', '#ffffff', 4, 2),
  ('Création du repo', 'Cette carte concerne la création du repo. Le repo doit être bien organisé et contenir tous les fichiers nécessaires.', '#ffffff', 5, 0),
  ('Création du projet', 'Cette carte concerne la création du projet. Nous devons définir les objectifs, les délais et les ressources nécessaires.', '#ffffff', 5, 1);

INSERT INTO "tag" ("name", "color") VALUES
  ('Urgent', 'hsl(348, 100%, 61%)'),
  ('Important', 'hsl(48, 100%, 67%)'),
  ('À discuter', 'hsl(204, 86%, 53%)'),
  ('Abandonné', 'hsl(0, 0%, 96%)');
INSERT INTO "card_has_tag" ("card_id", "tag_id") VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 2),
  (3, 1),
  (3, 3),
  (4, 1),
  (4, 2),
  (5, 1),
  (5, 2),
  (6, 1),
  (6, 3),
  (7, 1),
  (8, 2),
  (9, 1),
  (9, 3),
  (10, 1),
  (10, 2),
  (10, 3),
  (11, 4);

COMMIT;