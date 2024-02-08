'use strict';

const newgameBtn = document.querySelector('.btn--new'); //NEW GAME BTN
const rollBtn = document.querySelector('.btn--roll'); //ROLL BTN
const holdBtn = document.querySelector('.btn--hold'); //HOLD BTN
const dice = document.querySelector('.dice'); //Dice Image

const p1 = {
  name: 'Player 1',
  currScore: document.querySelector('#current--0'),
  score: document.querySelector('#score--0'),
};

const p2 = {
  name: 'Player 2',
  currScore: document.querySelector('#current--1'),
  score: document.querySelector('#score--1'),
};

let eventListenerEnabled = true;
let currPlayer = p1;
resetGame();

//ADDING EVENT LISTENERS
rollBtn.addEventListener('click', () => {
  if (eventListenerEnabled) rollHandler();
});

holdBtn.addEventListener('click', () => {
  if (eventListenerEnabled) holdHandler();
});

newgameBtn.addEventListener('click', resetGame);

function rollHandler() {
  const diceNum = Math.floor(Math.random() * 6) + 1; //DICE ROLL
  dice.src = `dice-${diceNum}.png`; //DISPLAYING DICE IMG
  dice.style.display = 'inline'; //Displaying DICE

  if (diceNum !== 1) {
    currPlayer.currScore.innerText = Number(currPlayer.currScore.innerText) + diceNum;
  } else {
    currPlayer.currScore.innerText = 0;
    switchPlayer();
  }
}

function holdHandler() {
  currPlayer.score.innerText =
    Number(currPlayer.currScore.innerText) + Number(currPlayer.score.innerText); //Updating Score

  currPlayer.currScore.innerText = 0; //Setting currScore to 0

  if (currPlayer.score.innerText >= 100) winHandler();
  else switchPlayer();
}

function winHandler() {
  eventListenerEnabled = false;
  dice.style.display = 'none';
  document.querySelector('.player--active').classList.add('player--winner');
}

function resetGame() {
  dice.style.display = 'none';
  p1.currScore.innerText = 0;
  p1.score.innerText = 0;
  p2.currScore.innerText = 0;
  p2.score.innerText = 0;
  eventListenerEnabled = true;
  document.querySelector('.player--active').classList.remove('player--winner');
  if (currPlayer !== p1) switchPlayer();
}

function switchPlayer() {
  if (currPlayer === p1) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    currPlayer = p2;
  } else {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    currPlayer = p1;
  }
}
