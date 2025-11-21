// app.js
// ¿Dónde Está la Pupusa? - A Salvadoran Memory Game

/*-------------------------------- Constants --------------------------------*/

// BASE_CARDS, MATCH_MESSAGES, MISMATCH_MESSAGES, WIN_MESSAGE
// come from data.js


/*---------------------------- State (Variables) ----------------------------*/

// Deck of cards currently in play (after duplicating + shuffling)
let deck = [];

let firstSelectedCard = null;
let secondSelectedCard = null;
let matchedPairs = 0;
let isBoardLocked = false;
let isGameOver = false;
let currentMessage = '';

// timer state
let secondsElapsed = 0;
let timerInterval = null;
let hasGameStarted = false;

// How long the player has to win (in seconds)------------------------------------------WIN
const MAX_SECONDS = 120;

// Message shown when the player loses--------------------------------------------------LOSE
const LOSE_MESSAGE = 'Time is up. You ran out of time. Click "Play Again" to try again.';


/*------------------------ Cached Element References ------------------------*/

const boardEl = document.getElementById('board');
const messageEl = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');

const guessedCountEl = document.getElementById('guessed-count');
const totalPairsEl = document.getElementById('total-pairs');
const timerEl = document.getElementById('timer');

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleBoardClick);
playAgainBtn.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

// Initialize / reset the entire game
function init() {
  const duplicatedCards = BASE_CARDS.concat(BASE_CARDS);

  deck = duplicatedCards.map((card, index) => {
    return {
      id: `${card.type}-${index}`,
      type: card.type,
      label: card.label,
      imgSrc: card.imgSrc,
      flipped: false,
      matched: false,
    };
  });

  shuffleArray(deck);

  firstSelectedCard = null;
  secondSelectedCard = null;
  matchedPairs = 0;
  isBoardLocked = false;
  isGameOver = false;
  currentMessage = 'Haz clic en una carta para empezar.';

  // stats
  totalPairsEl.textContent = BASE_CARDS.length;
  guessedCountEl.textContent = matchedPairs;

  // reset timer (but don't start it yet)
  resetTimer();

  // Hide play again button initially
  playAgainBtn.style.display = 'none';

  render();
}

// Render the current game state to the DOM
function render() {
  // Clear the board
  boardEl.innerHTML = '';

  // Render each card
  deck.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    // Store card id in a data attribute
    cardEl.dataset.id = card.id;

    // FRONT (flipped or matched)
    if (card.flipped || card.matched) {
      cardEl.classList.remove('card-back');
      cardEl.classList.add('card-front');

      const imgEl = document.createElement('img');
      imgEl.src = card.imgSrc;
      imgEl.alt = card.label;
      cardEl.appendChild(imgEl);
    }
    // BACK (face down)
    else {
      cardEl.classList.remove('card-front');
      cardEl.classList.add('card-back');

      const backImg = document.createElement('img');
      backImg.src = './images/card-back.png';
      backImg.alt = 'card back';
      cardEl.appendChild(backImg);
    }

    boardEl.appendChild(cardEl);
  });

  // ---- UPDATE MESSAGE + STATS EVERY RENDER ----
  messageEl.textContent = currentMessage;

  // this is the key line for "Total Guessed"
  guessedCountEl.textContent = matchedPairs;
  totalPairsEl.textContent = BASE_CARDS.length;

  // ---- WIN CHECK --------------------------------------------------------------------
  const totalPairs = BASE_CARDS.length;
  if (matchedPairs === totalPairs) {
    isGameOver = true;
    currentMessage = WIN_MESSAGE;
    messageEl.textContent = currentMessage;
    playAgainBtn.style.display = 'inline-block';

    // stop timer on win
    clearInterval(timerInterval);
    timerInterval = null;
    hasGameStarted = false;
  } else {
    if (!isGameOver) {
      playAgainBtn.style.display = 'none';
    }
  }
}

function handleBoardClick(event) {
  if (isGameOver) return; // stop if you won or lost

  const cardEl = event.target.closest('.card');
  if (!cardEl) return;

  if (isBoardLocked) return;

  // Find the card object
  const cardId = cardEl.dataset.id;
  const clickedCard = deck.find(card => card.id === cardId);
  if (!clickedCard) return;

  // Ignore already flipped or matched cards
  if (clickedCard.flipped || clickedCard.matched) return;

  // Flip the card
  clickedCard.flipped = true;

  // Start timer on the very first flip
  if (!hasGameStarted) {
    hasGameStarted = true;
    startTimer();
  }

  // First selection
  if (!firstSelectedCard) {
    firstSelectedCard = clickedCard;
    currentMessage = 'Elegí otra carta para ver si hace juego.';
    render();
    return;
  }

  // Second selection
  secondSelectedCard = clickedCard;
  isBoardLocked = true;
  render();

  // Check if they match
  checkForMatch();
}


// Compare the two selected cards and handle match / mismatch
function checkForMatch() {
  if (!firstSelectedCard || !secondSelectedCard) {
    isBoardLocked = false;
    return;
  }

  if (firstSelectedCard.type === secondSelectedCard.type) {
    // MATCH ✅
    firstSelectedCard.matched = true;
    secondSelectedCard.matched = true;

    // increase pair count
    matchedPairs += 1;

    // Random match message
    currentMessage = getRandomItem(MATCH_MESSAGES);

    // Reset selection
    firstSelectedCard = null;
    secondSelectedCard = null;
    isBoardLocked = false;

    render();
  } else {
    // MISMATCH ❌
    currentMessage = getRandomItem(MISMATCH_MESSAGES);
    render();

    // After a short delay, flip them back
    setTimeout(() => {
      firstSelectedCard.flipped = false;
      secondSelectedCard.flipped = false;

      firstSelectedCard = null;
      secondSelectedCard = null;
      isBoardLocked = false;

      render();
    }, 1000);
  }
}

// Helper to shuffle an array in place (Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

// Helper to get a random item from an array
function getRandomItem(arr) {
  const index = Math.floor(Math.random() * Math.random() * arr.length);
  return arr[index];
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
  const seconds = String(secondsElapsed % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (timerInterval) return; // already running
  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateTimerDisplay();

    // Check lose condition: time ran out
    if (!isGameOver && secondsElapsed >= MAX_SECONDS) {
      isGameOver = true;
      currentMessage = LOSE_MESSAGE;

      clearInterval(timerInterval);
      timerInterval = null;

      // Prevent further clicking
      isBoardLocked = true;

      // Show the Play Again button
      playAgainBtn.style.display = 'inline-block';

      // Re-render to show final message
      render();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  secondsElapsed = 0;
  hasGameStarted = false;
  updateTimerDisplay();
}


/*----------------------------- Start the Game ------------------------------*/

// Run init once when the page loads
init();
