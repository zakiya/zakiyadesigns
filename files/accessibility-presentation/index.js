// Get modal and trigger elements
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const trigger = document.querySelector('[data-type="itsatrap-button"]');
const trapDoorContent = document.querySelector('[data-type="trap-door"]');

// Hide trap door content initially
if (trapDoorContent) {
  trapDoorContent.style.display = 'none';
}

// Function to open modal
const openModal = () => {
  if (modal && trapDoorContent && modalBody) {
    // Move trap door content to modal
    modalBody.innerHTML = trapDoorContent.innerHTML;
    modal.classList.add('active');

    // Focus on close button for accessibility
    modalClose.focus();
  }
};

// Function to close modal
const closeModal = () => {
  if (modal) {
    modal.classList.remove('active');
    trigger.focus();
  }
};

// Open modal on click
if (trigger) {
  trigger.addEventListener('click', openModal);

  // Handle keyboard events (Enter and Space keys)
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal();
    }
  });
}

// Close modal when clicking X button
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside the modal content
if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}
