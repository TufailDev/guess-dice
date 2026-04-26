'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = () => {
  score[activePlayer] += currentScore;

  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  // check if players score is >= 100
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
};

const updateCurrentScore = () => {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const generateDice = () => {
  // Generate dice rolls
  const diceRoll = Math.trunc(Math.random() * 6) + 1;

  // display Dice
  diceEl.src = `dice-${diceRoll}.png`;
  diceEl.classList.remove('hidden');
  return diceRoll;
};

const resetGame = () => {
  score[0] = 0;
  score[1] = 0;
  updateCurrentScore();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

btnRoll.addEventListener('click', function () {
  const diceRoll = generateDice();

  // Check rolled 1
  if (diceRoll !== 1) {
    // add dice to current score
    currentScore += diceRoll;

    updateCurrentScore();
  } else {
    // Switch to next player
    currentScore = 0;
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score to active players score
  updateCurrentScore();

  // finish the game
  // switch to the next player
  switchPlayer();
});

btnNew.addEventListener('click', resetGame);
