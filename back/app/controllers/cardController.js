const { List, Card, Tag } = require('../models');

const cardController = {
  async findAll(_, response){
    try {
      // On récupère toutes les cartes
      const cards = await Card.findAll({
        include: {
          association: 'tags',
          order: [['id', 'ASC']]
        },
        order:[['id','ASC']]
      });
      // On renvoie les cartes
      return response.json(cards);
    } catch (err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async findOne(request, response){
    try{
      // On récupère la carte demandée
      const card = await Card.findByPk(request.params.id, {
        include: {
          association: 'tags',
          order: [['id', 'ASC']]
        }
      });
      // Si la carte n'existe pas, on renvoie une erreur
      if(!card){
        return response.status(404).json({ error: "Card not found." });
      }
      // On renvoie la carte
      return response.json(card);
    } catch(err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async createOne(request, response){
    try {
      const { title, content, color, position, listId } = request.body;
      // On crée la carte demandée
      const card = await Card.create({ title, content, color, position, list_id: listId });
      // On renvoie la carte créée
      return response.status(201).json(card);
    } catch(err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async updateOne(request, response){
    try {
      const { title, content, color, position, listId } = request.body;
      // On récupère la carte à mettre à jour
      const selectedCard = await Card.findByPk(request.params.id);
      // Si la carte n'existe pas, on renvoie une erreur
      if(!selectedCard){
        return response.status(404).json({ error: "Card not found." });
      }
      // On met à jour la carte
      const updatedCard = await selectedCard.update({ title, content, color, position, list_id: listId });
      // On renvoie la carte mise à jour
      response.json(updatedCard);
    } catch(err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteOne(request, response){
    try {
      // On récupère la carte à effacer
      const selectedCard = await Card.findByPk(request.params.id);
      // Si la carte n'existe pas, on renvoie une erreur
      if(!selectedCard){
        return response.status(404).json({ error: "Card not found." });
      }
      // On supprime la carte
      await selectedCard.destroy();
      // On renvoie une réponse vide
      return response.status(204).end();
    } catch (err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async findAllByListId(request, response){
    try {
      // On récupère la liste demandée
      const list = await List.findByPk(request.params.id);
      // Si la liste n'existe pas, on renvoie une erreur
      if(!list){
        return response.status(404).json({ error: "List not found." });
      }
      // On récupère toutes les cartes de la liste
      const cards = await list.getCards({
        include: {
          association: 'tags',
          order: [['id', 'ASC']]
        },
        order:[['id','ASC']]
      });
      // On renvoie les cartes
      return response.json(cards);
    } catch (err){
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async addTag(request, response){
    try {
      // On récupère la carte à associer
      const card = await Card.findByPk(request.params.id);
      // Si la carte n'existe pas, on renvoie une erreur
      if(!card){
        return response.status(404).json({ error: "Card not found." });
      }
      // On récupère le tag à associer
      const tag = await Tag.findByPk(request.body.tagId);
      // Si le tag n'existe pas, on renvoie une erreur
      if(!tag){
        return response.status(404).json({ error: "Tag not found." });
      }
      // On associe la carte au tag
      await card.addTag(tag);
      // on récupére la carte avec les tags
      await card.reload({include: 'tags', order: [['id', 'ASC']]})
      // On renvoie la carte
      return response.json(card);
    } catch(err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async removeTag(request, response){
    try {
      // On récupère la carte dissociée
      const card = await Card.findByPk(request.params.cardId);
      // Si la carte n'existe pas, on renvoie une erreur
      if(!card){
        return response.status(404).json({ error: "Card not found." });
      }
      // On récupère le tag à dissocier
      const tag = await Tag.findByPk(request.params.tagId);
      // Si le tag n'existe pas, on renvoie une erreur
      if(!tag){
        return response.status(404).json({ error: "Tag not found." });
      }
      // On supprime l'association entre la carte et le tag
      await card.removeTag(tag);
      // on récupére la carte avec les tags
      await card.reload({include: 'tags', order: [['id', 'ASC']]})
      // On renvoie la carte
      return response.json(card);
    } catch(err) {
      console.log(err);
      // Si une erreur est survenue, on renvoie une erreur 500
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = cardController;