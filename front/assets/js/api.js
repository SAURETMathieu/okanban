import { apiBaseUrl } from './config.js';
import { showErrorModal } from './utils.js';

async function handleResponse(response) {
  const body = await response.json();
  if (!response.ok) {
    showErrorModal({ status: response.status, message: body.error });
    return false;
  }
  return body;
}

// Lists

export async function getLists() {
  try {
    // On récupère les listes/cartes/tags côté serveur
    const response = await fetch(`${apiBaseUrl}/lists`);
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la récupération des listes');
  }
}

export async function getList(listId) {
  try {
    // On récupère les listes/cartes/tags côté serveur
    const response = await fetch(`${apiBaseUrl}/lists/${listId}`);
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la récupération la liste');
  }
}

export async function createList(listData) {
  try {
    // On crée la liste côté serveur
    const response = await fetch(`${apiBaseUrl}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    });
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la récupération de la liste');
  }
}

export async function updateList(listData) {
  try {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // on reçoit {id:3, name:"nom de la liste"}
    // on crée à partir de cet objet une nouvelle variable id qui contient la valeur de l'id
    // et une nouvelle variable data qui contient le reste des données
    const { id, ...data } = listData;
    // On crée la liste côté serveur
    const response = await fetch(`${apiBaseUrl}/lists/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la modification de la liste');
  }
}

export async function deleteList(listId) {
  try {
    const response = await fetch(`${apiBaseUrl}/lists/${listId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const body = await response.json();
      showErrorModal(body.error);
      return false;
    }
    return true;
  } catch (error) {
    showErrorModal('Une erreur est survenue lors de la suppression de la liste');
    return false;
  }
}

// Cards

export async function getCard(cardId) {
  try {
    // On récupère les listes/cartes/tags côté serveur
    const response = await fetch(`${apiBaseUrl}/cards/${cardId}`);
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la récupération la liste');
  }
}

export async function createCard(cardData) {
  try {
  // On crée la carte côté serveur
    const response = await fetch(`${apiBaseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la récupération des cartes');
  }
}

export async function updateCard(cardData) {
  try {
    const { id, ...data } = cardData;
    // On crée la liste côté serveur
    const response = await fetch(`${apiBaseUrl}/cards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la récupération modification de la carte');
  }
}

export async function deleteCard(cardId) {
  try {
    const response = await fetch(`${apiBaseUrl}/cards/${cardId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const body = await response.json();
      showErrorModal(body.error);
      return false;
    }
    return true;
  } catch (error) {
    showErrorModal('Une erreur est survenue lors de la suppression des listes');
    return false;
  }
}

export async function associateTagToCard(tagId, cardId){
  try {
    const response = await fetch(`${apiBaseUrl}/cards/${cardId}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tagId}),
    });
    return handleResponse(response);
  } catch (error) {
    showErrorModal('Une erreur est survenue lors de l\'ajout du tag');
    return false;
  }
}

export async function dissociateTagFromCard(tagId, cardId){
  try {
    const response = await fetch(`${apiBaseUrl}/cards/${cardId}/tags/${tagId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const body = await response.json();
      showErrorModal(body.error);
      return false;
    }
    return true;
  } catch (error) {
    showErrorModal('Une erreur est survenue lors de la suppression du tag');
    return false;
  }
}

export async function getTags() {
  try {
    // On récupère les tags côté serveur
    const response = await fetch(`${apiBaseUrl}/tags`);
    return handleResponse(response);
  } catch (error) {
    return showErrorModal('Une erreur est survenue lors de la récupération des tags');
  }
}
