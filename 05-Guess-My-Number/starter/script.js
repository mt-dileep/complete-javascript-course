'use strict';

let value = Math.ceil(Math.random() * 20) + 1,
  highScore = 0,
  score = 20;
function calculate(guess) {
  if (value == guess) {
    document.querySelector('.number').textContent = value;
    document.querySelector('.message').textContent = 'Correct Answer!';
    highScore += score;
    document.querySelector('.highscore').textContent = highScore;
    document.querySelector('body').style.backgroundColor = 'green';
  } else if (value > guess) {
    document.querySelector('.message').textContent = 'Too Low!';
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.message').textContent = 'Too High!';
    score--;
    document.querySelector('.score').textContent = score;
  }
}

document.querySelector('.btn.check').addEventListener('click', onCheck);
function onCheck() {
  console.log('guessed: ', document.querySelector('.guess').value);
  document.querySelector('.guess').value > 0 &&
    calculate(document.querySelector('.guess').value);
}

document.querySelector('.btn.again').addEventListener('click', onAgain);
function onAgain() {
  reset();
}

function reset() {
  value = Math.ceil(Math.random() * 20) + 1; // 0-20
  highScore = 0;
  score = 20;
  document.querySelector('.message').textContent = 'Guess number...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.highscore').textContent = highScore;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = null;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
}
