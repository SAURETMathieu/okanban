const { Tag } = require('../models');

const tagController = {
  async findAll(_, response){
    try {
      // On récupère tous les tags
      const tags = await Tag.findAll();
      // On renvoie les tags
      return response.json(tags);
    } catch (err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async findOne(request, response){
    try{
      // On récupère le tag demandé
      const tag = await Tag.findByPk(request.params.id);
      // Si le tag n'existe pas, on renvoie une erreur
      if(!tag){
        return response.status(404).json({ error: "Tag not found." });
      }
      // On renvoie le tag
      return response.json(tag);
    } catch(err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async createOne(request, response){
    try{
      // On crée le tag
      const tag = await Tag.create(request.body);
      return response.status(201).json(tag);
    } catch(err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async updateOne(request, response){
    try {
      // On récupère le tag à mettre à jour
      const tag = await Tag.findByPk(request.params.id);
      // Si le tag n'existe pas, on renvoie une erreur
      if(!tag){
        return response.status(404).json({ error: "Tag not found." });
      }
      // On met à jour le tag
      const updatedTag = await tag.update(request.body);
      // On renvoie le tag mise à jour
      response.json(updatedTag);
    } catch(err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteOne(request, response){
    try {
      // On récupère le tag à effacer
      const tag = await Tag.findByPk(request.params.id);
      // Si le tag n'existe pas, on renvoie une erreur
      if(!tag){
        return response.status(404).json({ error: "Tag not found." });
      }
      // On supprime le tag
      await tag.destroy();
      // On renvoie une réponse vide
      return response.status(204).end();
    } catch (err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = tagController;