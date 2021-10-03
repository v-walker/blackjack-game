// deck cards: 
// suite, value, image

// deck = [{}, {}, {}, {}] pop

// shuffle logic ==> randomize indices for objects in deck

// dealer = [] push 14

// player = [] push  ==> if over 21, lose game

// ace can be value of 1 or 11

// let testObj = document.querySelector(".test");
// testObj.innerHTML = "<img src ='images/queen_of_diamonds.png'>";

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
}

let addCardtoHand = (hand) => {
  let newCard = deck.pop();
  hand.push(newCard);
}

//let's work on getting the value out of playerArr and dealerArr into playerPoints and dealerPoints; 
// also work on getting that value to display in the window;

let sumPoints = (hand) => {
  let values = []
  hand.forEach(card =>
    values.push(card.value));
  console.log(values);

  let sum = values.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
  console.log(sum);
  return sum;
}

let displayPoints = (sum, player) => {
  let displaySpan = document.querySelector(`#${player}-points`);
  displaySpan.textContent = sum;
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
displayPoints(sumPoints(playerArr), "player");
displayPoints(sumPoints(dealerArr), "dealer");
});


// for hit, need to give card to player; if player hand value > 21 after new card, bust

hit.addEventListener('click', (e) => {
  
})

// need to check value of dealer hand; if dealer hand > 16, dealer stays, else dealer gets new card too

stand.addEventListener('click', (e) => {

})


// need win/loss logic/visuals (an alert? a modal(playagain?))
// need to take cards from playerArr and dealerArr and add back to deck & clear the table