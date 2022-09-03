'use strict';

let currScore = 0;
let rollNum = 0;
let activePlayer = 0;
let matchOver = false;

function rollDice() {
  const num = Math.trunc(Math.random() * 6 + 1);
  diceImg.src = 'dice-' + num + '.png';
  return num;
}

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currScore0 = document.querySelector('#current--0');
const currScore1 = document.getElementById('current--1');
const diceImg = document.querySelector('.dice');
const player0 = document.getElementsByClassName('player--0')[0];
const player1 = document.getElementsByClassName('player--1')[0];

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');

function resetGame() {
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  diceImg.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  matchOver = false;
  activePlayer = 0;
}
resetGame();

function switchPlayer() {
  activePlayer = activePlayer ? 0 : 1;
  player1.classList.toggle('player--active');
  player0.classList.toggle('player--active');
  if (activePlayer) {
    currScore1.textContent = 0;
    currScore0.textContent = 0;
  } else {
    currScore1.textContent = 0;
    currScore0.textContent = 0;
  }
}

newGameBtn.addEventListener('click', resetGame);

holdScore.addEventListener('click', function () {
  if (activePlayer == 0) {
    const score = Number(score0.textContent) + Number(currScore0.textContent);
    score0.textContent = score;
    if (score >= 100) {
      matchOver = true;
      player0.classList.add('player--winner');
      if (!diceImg.classList.contains('hidden'))
        diceImg.classList.add('hidden');
    }
  } else {
    const score = Number(score1.textContent) + Number(currScore1.textContent);
    score1.textContent = score;
    if (score >= 100) {
      matchOver = true;
      player1.classList.add('player--winner');
      if (!diceImg.classList.contains('hidden'))
        diceImg.classList.add('hidden');
    }
  }
  switchPlayer();
});

rollDiceBtn.addEventListener('click', function () {
  if (!matchOver) {
    if (diceImg.classList.contains('hidden'))
      diceImg.classList.remove('hidden');
    const num = rollDice();
    if (activePlayer == 0) {
      currScore0.textContent =
        num == 1 ? 0 : Number(currScore0.textContent) + num;
      if (num == 1) switchPlayer();
    } else {
      currScore1.textContent =
        num == 1 ? 0 : Number(currScore1.textContent) + num;
      if (num == 1) switchPlayer();
    }
  }
});
