export function closeModal(modalElem) {
  // On récupère le formulaire de la modale active
  const modalFormElem = modalElem.querySelector('form');
  // On ferme la modale
  modalElem.classList.remove('is-active');
  // On reset le formulaire
  if (modalFormElem) {
    modalFormElem.reset();
  }
}
export function showConfirmModal(message) {
  const modalElem = document.querySelector('#confirm-modal');
  modalElem.querySelector('[slot="confirm-message"]').textContent = message;
  modalElem.classList.add('is-active');
  return new Promise((resolve) => {
    modalElem.querySelector('[data-accept]').addEventListener('click', () => {
      closeModal(modalElem);
      resolve(true);
    });
    modalElem.querySelector('[data-refuse]').addEventListener('click', () => {
      closeModal(modalElem);
      resolve(false);
    });
  });
}

export function showErrorModal(errorObject) {
  const modalElem = document.querySelector('#error-modal');
  modalElem.querySelector('button[data-close]').removeEventListener('click', closeErrorModal)
  modalElem.querySelector('[slot="error-status"]').textContent = errorObject.status;
  modalElem.querySelector('[slot="error-message"]').textContent = errorObject.message;
  modalElem.querySelector('button[data-close]').addEventListener('click', closeErrorModal);
  modalElem.classList.add('is-active');
}

function closeErrorModal() {
  const modalElem = document.querySelector('#error-modal');
  closeModal(modalElem);
}
