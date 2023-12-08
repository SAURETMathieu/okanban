import {
  getLists,
} from './api.js';

import { addList, showAddListModal, initSortableLists } from './list.module.js';
import { addCardToList } from './card.module.js';

async function init() {
  document.querySelector('#add-list-btn').addEventListener('click', () => showAddListModal());
  await initKanban();
  initSortableLists();
}

async function initKanban() {
  const lists = await getLists();
  lists.sort((a, b) => a.position - b.position)?.forEach((list) => {
    addList(list);
    list.cards.sort((a, b) => a.position - b.position).forEach(addCardToList);
  });
}

init();
