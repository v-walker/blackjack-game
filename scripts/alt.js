let dealerHandEl = document.querySelector("#dealer-hand");
let dealerArr = [];
let dealerPoints;
let playerHandEl = document.querySelector("#player-hand");
let playerArr = [];
let playerPoints;

let deal = document.querySelector("#deal-button");
let hit = document.querySelector("#hit-button");
let stand = document.querySelector("#stand-button");

let getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
}

let shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let getCard = () => {
  shuffleArray(deck);
  let card = deck[deck.length-1];
  return card
}

let makeCardEl = (card) => {
  let cardEl = document.createElement("img");
  cardEl.setAttribute('src', `${card.image}`);
  return cardEl;
}

let addCardtoHand = (hand) => {
  let newCard = deck.pop();
  hand.push(newCard);
}

deal.addEventListener('click', (e) => {
    for (let i = 0; i < 2; i++) {
        // deal card to player
        playerHandEl.appendChild(makeCardEl(getCard()));
        addCardtoHand(playerArr);
        // deal card to dealer
        dealerHandEl.appendChild(makeCardEl(getCard()));
        addCardtoHand(dealerArr);
    };
});
