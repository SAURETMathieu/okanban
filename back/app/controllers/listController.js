const { List } = require('../models');

const listController = {
  async findAll(_, response){
    try {
      // On récupère toutes les listes
      const lists = await List.findAll({
        include: {
          association: 'cards',
          order: [['position', 'ASC']],
          include: {
            association: 'tags',
            order: [['id', 'ASC']]
          }
        },
        order:[['position','ASC']]
      });
      // On renvoie les listes
      return response.json(lists);
    } catch (err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async findOne(request, response){
    try{
      // On récupère la liste correspondante
      const list = await List.findByPk(request.params.id, {
        include: {
          association: 'cards',
          include: {
            association: 'tags',
            order: [['id', 'ASC']]
          }
        }
      });
      // Si la liste n'existe pas, on renvoie une erreur
      if(!list){
        return response.status(404).json({ error: "List not found." });
      }
      // On renvoie la liste
      return response.json(list);
    } catch(err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async createOne(request, response){
    try{
      const createdList = await List.create(request.body);
      return response.status(201).json(createdList);
    } catch(err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async updateOne(request, response){
    try {
      // On récupère la liste correspondante
      const list = await List.findByPk(request.params.id);
      // Si la liste n'existe pas, on renvoie une erreur
      if(!list){
        return response.status(404).json({ error: "List not found." });
      }
      // On met à jour la liste
      const updatedList = await list.update(request.body);
      // On renvoie la liste mise à jour
      response.json(updatedList);
    } catch(err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteOne(request, response){
    try {
      // On récupère la liste correspondante
      const list = await List.findByPk(request.params.id);
      // Si la liste n'existe pas, on renvoie une erreur
      if(!list){
        return response.status(404).json({ error: "List not found." });
      }
      // On supprime la liste
      const result = await list.destroy();
      // On renvoie une réponse vide
      return response.status(204).end();
    } catch (err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = listController;