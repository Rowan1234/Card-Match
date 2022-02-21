const cardGrid = document.getElementById('cards');
const restartButton = document.querySelector('.restart');
const score = document.getElementById('score');
const nextCard = document.getElementById('next-card');
let currentScore = 0;
let cardActive = false;
let cardCounter = 0;
const deckOfCards = [
  'fas fa-anchor',
  'fas fa-atom',
  'fas fa-frog',
  'fas fa-feather-alt',
  'fas fa-cogs',
  'fas fa-fan',
  'fas fa-bolt',
  'fas fa-hat-wizard',
  'fas fa-apple-alt',
  'fas fa-bell',
  'fas fa-bomb',
  'fas fa-brain',
];

// used for shuffling the randomized deck array
let shuffle = function(array) {
  const newArray = array.slice();
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

// used for updating the users score
function updateScore(num) {
  if (num === 0) {
    currentScore = 0;
    score.textContent = currentScore;
  } else {
    currentScore += num;
    score.textContent = currentScore;
  }
}

/**
 * resets the the users score,
 * resets all the cards and gives them new icons / shuffles them
 */
function reset() {
  const randomDeck = shuffle(deckOfCards);
  const cardObjects = cardGrid.children;
  for (let x = 0; x < cardObjects.length; x++) {
    cardObjects[x].classList.remove('matched');
    cardObjects[x].classList.remove('show')
    const cardIcon = cardObjects[x].querySelector('i');
    cardIcon.className = randomDeck[x];
  }
  cardCounter = 0;
  nextCard.querySelector('i').className = deckOfCards[cardCounter];
  updateScore(0);
}

/**
 * listens for clicks on the grid of cards,
 * if a card is clicked check if another card has already been selected,
 * if another card has not been selected then change that and show the card for half a second and then hide it,
 * if the card has the same icon as the current card we are trying to find then make it a matched card and update the next card,
 * if the card happens to be the last card we need then send the victory message.
 * after all of that set active card back to false so we can click on more unless we win
 */ 
cardGrid.addEventListener('click', function(e) {
  if (e.target.className === 'card') {
    if (cardActive === false) {
      cardActive = true;
      updateScore(1);
      e.target.classList.toggle('show')
      setTimeout(function() {
        e.target.classList.toggle('show')

        if (e.target.querySelector('i').className === deckOfCards[cardCounter]) {
          if (cardCounter === deckOfCards.length - 1) {
            alert(`You won with a score of: ${currentScore}`);
          } else {
            cardCounter++;
            nextCard.querySelector('i').className = deckOfCards[cardCounter];
          }

          e.target.classList.toggle('matched');
        } 

        cardActive = false;
      }, 500);
    }
  }
})

// resets the game
restartButton.addEventListener('click', function() {
  reset();
})

reset();