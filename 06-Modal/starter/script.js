'use strict';

const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const showModalBtns = document.querySelectorAll('.show-modal');

function open() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

showModalBtns.forEach(function (btn) {
  btn.addEventListener('click', open);
});

function close() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
closeBtn.addEventListener('click', close);

overlay.addEventListener('click', close);

document.addEventListener('keyup', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    console.log(e.key);
    close();
  }
});
