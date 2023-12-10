function validate(validators){
  // Si validators est un objet avec les propriétés schema et source, on le place dans un tableau
  if(!Array.isArray(validators) && validators.schema && validators.source){
    validators = [validators];
  }
  // Renvoie une fonction middleware
  return async (request, response, next) => {
    // À partir du tableau de validateurs, on crée un tableau de promesses de validations
    const validations = validators.map(({schema, source}) => {
      return schema.validateAsync(request[source]);
    });
    // On attend que toutes les validations soient terminées
    // Si tout est ok, on passe au middleware suivant
    // Sinon, on renvoie une erreur 400 avec le message d'erreur
    await Promise.all(validations)
      .then(() => next())
      .catch(error => response.status(400).json({ error: error.message }));
  }
}

module.exports = validate;