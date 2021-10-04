// holds cards in DOM
let dealerHandEl = document.querySelector("#dealer-hand");
let playerHandEl = document.querySelector("#player-hand");
// holds dealer's and player's hands of cards (objects) from deck;
let dealerArr = [];
let playerArr = [];

// buttons
let deal = document.querySelector("#deal-button");
let hit = document.querySelector("#hit-button");
let stand = document.querySelector("#stand-button");
let mainMessageDiv = document.querySelector('#messages');
let playAgain = document.createElement("button");

playAgain.setAttribute("type", "button");
playAgain.textContent = "Click me to play again!"
let textMessageDiv = document.createElement("div");

let shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

let getCard = () => {
  let card = deck[deck.length-1];
  return card
};

let makeCardEl = (card) => {
  let cardEl = document.createElement("img");
  cardEl.setAttribute('src', `${card.image}`);
  return cardEl;
};

let addCardtoHand = (hand) => {
  let newCard = deck.pop();
  hand.push(newCard);
};

let sumPoints = (hand, user) => {
  let values = []
  hand.forEach(card =>
    values.push(card.value));
  let sum = values.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);

  // ace logic
  acesInHand = hand.filter((card) => card.name == "ace");
  if (acesInHand.length == 0) {
    return sum;
  }
  else if (acesInHand.length == 1 && user == "player" && sum > 21) {
    sum -= 10 * (acesInHand.length);
    return sum;
  }
  else if (acesInHand.length == 2 && user == "dealer" && hand.length > 2) {
    sum -= 10;
  }
  else if (acesInHand.length >= 2) {
    sum -= 10 * (acesInHand.length - 1);
    return sum;
  }
  else {
    return sum;
  }
};

// used to display points from player/dealer in DOM when called by click events
let displayPoints = (sum, player) => {
  let displaySpan = document.querySelector(`#${player}-points`);
  displaySpan.textContent = sum;
};

// wins and losses count in DOM
let wins = 0;
let losses = 0;
let winsDisplay = document.querySelector("#win-count");
winsDisplay.textContent = wins;
let lossDisplay = document.querySelector("#loss-count");
lossDisplay.textContent = losses;

// displays message in DOM regarding win, loss, or tie, when called
let addMessage = () => {
  mainMessageDiv.appendChild(textMessageDiv);
  mainMessageDiv.appendChild(playAgain);
}

let win = () => {
  textMessageDiv.textContent = "✨ 🌈 😎 🚀 🤙 💰 ✨ You win! You're a champion! ✨ 💰 🤙 🚀 😎 🌈 ✨"
  addMessage();
  hit.disabled = true;
  stand.disabled = true;
  wins += 1;
  winsDisplay.textContent = wins;
  return wins;
}

let lose = () => {
  textMessageDiv.textContent = "⛔ 📉 👎 💀 You're a loser. Shame.💀 👎 📉 ⛔"
  addMessage();
  hit.disabled = true;
  stand.disabled = true;
  losses += 1;
  lossDisplay.textContent = losses;
  return losses;
}

let tie = () => {
  textMessageDiv.textContent = "😑 You tied with the dealer, which is basically a loss because if you're not first, you're last. Shame.😑"
  addMessage();
  hit.disabled = true;
  stand.disabled = true;
}

deal.addEventListener('click', (e) => {
  shuffleArray(deck);  
  for (let i = 0; i < 2; i++) {
    playerHandEl.appendChild(makeCardEl(getCard()));
    addCardtoHand(playerArr);
    dealerHandEl.appendChild(makeCardEl(getCard()));
    addCardtoHand(dealerArr);
    };
  displayPoints(sumPoints(playerArr, "player"), "player");
  displayPoints(sumPoints(dealerArr, "dealer"), "dealer");
  deal.disabled = true;
  if (sumPoints(dealerArr, "dealer") === 21 && sumPoints(playerArr, "player") === 21) {
    tie();
  }
  else if (sumPoints(dealerArr, "dealer") === 21) {
    lose();
  }
  else if (sumPoints(playerArr, "player") === 21) {
    win();
  }
});

hit.addEventListener('click', (e) => {
  playerHandEl.appendChild(makeCardEl(getCard()));
  addCardtoHand(playerArr);
  let playerSum = sumPoints(playerArr, "player");
  displayPoints(playerSum, "player");
  if (playerSum > 21) {
    lose();
  }
  else if (playerSum === 21) {
    win();
  }
});

stand.addEventListener('click', (e) => {
  hit.disabled = true;
  stand.disabled = true;
  // while dealer hand < 17, dealer continues to draw cards...
  while (sumPoints(dealerArr, "dealer") < 17) {
    dealerHandEl.appendChild(makeCardEl(getCard()));
    addCardtoHand(dealerArr);
    displayPoints(sumPoints(dealerArr, "dealer"), "dealer");
  }
  if (sumPoints(dealerArr, "dealer") === 21) {
    lose();
  }
  else if (sumPoints(dealerArr, "dealer") > 21) {
    win();
  }
  else if (sumPoints(dealerArr, "dealer") < 21 && sumPoints(dealerArr, "dealer") > sumPoints(playerArr, "player")) {
    lose();
  }
  else if (sumPoints(dealerArr, "dealer") === sumPoints(playerArr, "player")) {
    tie();
  }
  else if (sumPoints(dealerArr, "dealer") < sumPoints(playerArr, "player")) {
    win();
  }
});

// when "play again" is clicked, need to take cards from playerArr and dealerArr and add back to deck & clear the table
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

playAgain.addEventListener('click', (e) => {
  deal.disabled = false;
  hit.disabled = false;
  stand.disabled = false;
  deck = deck.concat(dealerArr);
  dealerArr = [];
  deck = deck.concat(playerArr);
  playerArr = [];
  removeAllChildNodes(dealerHandEl);
  removeAllChildNodes(playerHandEl);
  removeAllChildNodes(mainMessageDiv);
  displayPoints(undefined, "dealer");
  displayPoints(undefined, "player");
});