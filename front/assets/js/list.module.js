import { Sortable, Swap } from 'sortablejs';
import {
  getList,
  createList,
  updateList,
  deleteList,
} from './api.js';

import { closeModal, showConfirmModal } from './utils.js';
import { showAddCardModal, initSortableCards } from './card.module.js';

export function initSortableLists() {
  Sortable.mount(new Swap());
  const listsContainer = document.getElementById('lists-container');

  Sortable.create(listsContainer, {
    swap: true,
    animation: 250,
    swapClass: 'swap-highlight',
    handle: '.message-header',
    onEnd: () => {
      const lists = document.querySelectorAll('#lists-container>div');
      lists.forEach(async (list, index) => {
        const listId = parseInt(list.dataset.id, 10);
        const newPosition = index;
        await updateList({ position: newPosition, id: listId });
      });
    },
  });
}

export function addList(listData) {
  const listTemplate = document.querySelector('#list-template');
  const listClone = document.importNode(listTemplate.content, true);

  listClone.querySelector('.column').dataset.id = listData.id;
  listClone.querySelector('[slot="list-name"]').textContent = listData.name;

  listClone
    .querySelector('[slot="edit-list-button"]')
    .addEventListener('click', () => showUpdateListModal(listData.id));

  listClone
    .querySelector('[slot="remove-list-button"]')
    .addEventListener('click', onDeleteList);
  listClone
    .querySelector('[slot="add-card-button"]')
    .addEventListener('click', () => showAddCardModal(listData.id));
  document.querySelector('#lists-container').appendChild(listClone);
  initSortableCards(listData.id);
}

export function showAddListModal() {
  showModal('create');
}

function showUpdateListModal(listId) {
  showModal('update', listId);
}

async function showModal(mode, listId) {
  const listData = mode === 'update' ? await getList(listId) : null;
  const modalElem = document.querySelector('#list-modal');
  const formElem = modalElem.querySelector('form');
  formElem.querySelectorAll('button').forEach((btn) => btn.removeAttribute('disabled'));
  formElem.querySelector('input[name="id"]')?.remove();
  formElem.removeEventListener('submit', submitUpdateList);
  formElem.removeEventListener('submit', submitAddList);
  modalElem.querySelectorAll('.modal-background, button.close-modal').forEach((elem) => {
    elem.addEventListener('click', closeListModal);
  });

  modalElem.querySelector('h5 span').textContent = mode === 'create'
    ? 'Ajouter une liste'
    : 'Modifier la liste';

  formElem.querySelector('button.is-success span:last-child').textContent = mode === 'create'
    ? 'Ajouter la liste'
    : 'Modifier la liste';

  formElem.querySelector('input[name="name"]').value = mode === 'create'
    ? ''
    : listData.name;

  if (mode === 'update') {
    const idInput = document.createElement('input');
    idInput.setAttribute('type', 'hidden');
    idInput.setAttribute('name', 'id');
    idInput.setAttribute('value', listId);
    formElem.appendChild(idInput);
  }

  formElem.addEventListener('submit', mode === 'create'
    ? submitAddList
    : submitUpdateList);

  modalElem.querySelectorAll('.modal-background, button.close-modal').forEach((elem) => {
    elem.addEventListener('click', closeListModal);
  });

  modalElem.classList.add('is-active');
}

function closeListModal() {
  const modalElem = document.querySelector('#list-modal');
  closeModal(modalElem);
}

async function submitListForm(event, action) {
  event.preventDefault();
  const formElem = event.currentTarget;
  const formData = new FormData(formElem);
  const formListData = Object.fromEntries(formData);
  formElem.querySelectorAll('button').forEach((btn) => btn.setAttribute('disabled', 'true'));
  const list = await action(formListData);
  if (action === createList) {
    addList(list);
  }
  if (action === updateList) {
    const listElem = document.querySelector(`.column[data-id="${list.id}"]`);
    listElem.querySelector('[slot="list-name"]').textContent = list.name;
  }
  closeModal(formElem.closest('.modal'));
}

async function submitAddList(event) {
  submitListForm(event, createList);
}

async function submitUpdateList(event) {
  submitListForm(event, updateList);
}

async function onDeleteList(event) {
  const listId = event.currentTarget.closest('.column').dataset.id;
  if (await showConfirmModal('Êtes vous sûr de vouloir supprimer cette liste ?') && await deleteList(listId)) {
    document.querySelector(`.column[data-id="${listId}"]`).remove();
  }
}

export default { addList, showAddListModal };
