import { Sortable } from 'sortablejs';
import {
  getCard,
  createCard,
  updateCard,
  deleteCard,
} from './api.js';

import { closeModal, showConfirmModal } from './utils.js';

export function initSortableCards(listId) {
  const cardContainer = document.querySelector(`ul[data-id="${listId}"] [slot="list-content"]`);
  Sortable.create(cardContainer, {
    animation: 250,
    ghostClass: 'ghost-hightlight',
    group: 'cards',
    onEnd: async (event) => {
      const cardId = parseInt(event.item.dataset.id, 10);
      const newListId = parseInt(event.to.closest('ul').dataset.id, 10);

      await updateCard({ id: cardId, listId: newListId });

      const container = event.to.parentElement;
      const cards = container.querySelectorAll('li');

      cards.forEach(async (card, index) => {
        const { id } = card.dataset;
        const newPosition = index;
        await updateCard({ id, position: newPosition });
      });
    },
  });
}

export function addCardToList(cardData) {
  const cardTemplate = document.querySelector('#card-template');
  const cardClone = document.importNode(cardTemplate.content, true);
  cardClone.querySelector('[slot="card-id"]').dataset.id = cardData.id;
  cardClone.querySelector('[slot="card-title"]').textContent = cardData.title;
  cardClone.querySelector('[slot="card-content"]').textContent = cardData.content;
  cardClone.querySelector('[slot=card-color]').style.borderTopColor = cardData.color;

  cardClone
    .querySelector('[slot="edit-card-button"]')
    .addEventListener('click', () => showUpdateCardModal(cardData.id));

  cardClone
    .querySelector('[slot="remove-card-button"]')
    .addEventListener('click', onDeleteCard);

  if (cardData.tags?.length > 0) {
    const tagContainer = cardClone.querySelector('[slot="card-tags"]');
    cardData.tags.forEach((tag) => {
      const tagTemplate = document.querySelector('#tag-template');
      const tagClone = document.importNode(tagTemplate.content, true);
      tagClone.querySelector('[slot="tag-name"]').textContent = tag.name;
      tagContainer.prepend(tagClone);
      // tagClone.querySelector('[slot="tag-color"]').style.backgroundColor = tag.color;
    });
  }
  const listElem = document.querySelector(
    `ul.column[data-id="${cardData.list_id}"] [slot="list-content"]`,
  );
  listElem.appendChild(cardClone);
}

export function showAddCardModal(listId) {
  showModal('create', listId);
}

function showUpdateCardModal(cardId) {
  showModal('update', cardId);
}

async function showModal(mode, id) {
  const cardData = mode === 'update' ? await getCard(id) : null;
  const modalElem = document.querySelector('#card-modal');
  const formElem = modalElem.querySelector('form');

  formElem.querySelector('input[name="id"]')?.remove();
  formElem.removeEventListener('submit', submitAddCard);
  formElem.removeEventListener('submit', submitUpdateCard);
  modalElem.querySelectorAll('.modal-background, button.close-modal').forEach((elem) => {
    elem.removeEventListener('click', closeCardModal);
  });

  formElem.querySelector('input[name="listId"]').value = mode === 'update'
    ? cardData.list_id
    : id;

  modalElem.querySelector('h5 span').textContent = mode === 'create'
    ? 'Ajouter une carte'
    : 'Modifier la carte';

  formElem.querySelector('button.is-success span:last-child').textContent = mode === 'create'
    ? 'Ajouter la carte'
    : 'Modifier la carte';

  formElem.querySelector('input[name="title"]').value = mode === 'create'
    ? ''
    : cardData.title;

  formElem.querySelector('textarea[name="content"]').value = mode === 'create'
    ? ''
    : cardData.content;

  formElem.querySelector('input[name="color"]').value = mode === 'create'
    ? '#ffffff'
    : cardData.color;

  if (mode === 'update') {
    const idInput = document.createElement('input');
    idInput.setAttribute('type', 'hidden');
    idInput.setAttribute('name', 'id');
    idInput.setAttribute('value', id);
    formElem.appendChild(idInput);
  }

  formElem.addEventListener('submit', mode === 'create'
    ? submitAddCard
    : submitUpdateCard);

  modalElem.querySelectorAll('.modal-background, button.close-modal').forEach((elem) => {
    elem.addEventListener('click', closeCardModal);
  });

  modalElem.classList.add('is-active');
}

async function submitCardForm(event, action) {
  event.preventDefault();
  const cardFormElem = event.currentTarget;
  const formData = new FormData(cardFormElem);
  const formCardData = Object.fromEntries(formData);
  const card = await action(formCardData);
  if (action === createCard) {
    addCardToList(card);
  }
  if (action === updateCard) {
    const cardElem = document.querySelector(`.card[data-id="${card.id}"]`);
    cardElem.querySelector('[slot="card-title"]').textContent = card.title;
    cardElem.querySelector('[slot="card-content"]').textContent = card.content;
    cardElem.querySelector('.card-header').style.borderColor = card.color;
  }
  closeCardModal();
}

function closeCardModal() {
  const modalElem = document.querySelector('#card-modal');
  closeModal(modalElem);
}

function submitUpdateCard(event) {
  submitCardForm(event, updateCard);
}

function submitAddCard(event) {
  submitCardForm(event, createCard);
}

async function onDeleteCard(event) {
  const cardId = event.currentTarget.closest('.card').dataset.id;
  if (await showConfirmModal('Êtes vous sûr de vouloir supprimer cette carte ?') && await deleteCard(cardId)) {
    document.querySelector(`.card[data-id="${cardId}"]`).remove();
  }
}

export default { addCardToList, showAddCardModal };
