import "bootstrap";
import "./style.css";

window.onload = function () {
  const suits = [
    { symbol: "♠", class: "black" },
    { symbol: "♥", class: "red" },
    { symbol: "♦", class: "red2" },
    { symbol: "♣", class: "black2" }
  ];

  const numbs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deckContainer = document.getElementById("deck");

  function createFullDeck() {
    const deck = [];
    for (let suit of suits) {
      for (let i = 0; i < numbs.length; i++) {
        deck.push({
          suit: suit.symbol,
          class: suit.class,
          value: numbs[i],
          numeric: i + 1
        });
      }
    }
    return deck;
  }

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function renderDeck(cards) {
    const deckContainer = document.getElementById("deck");
    deckContainer.innerHTML = "";

    for (const card of cards) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "plcard";
      cardDiv.innerHTML = `
        <span class="suit-top ${card.class}">${card.suit}</span>
        <span class="numberr ${card.class}">${card.value}</span>
        <span class="suit-bttm ${card.class}">${card.suit}</span>
      `;
      deckContainer.appendChild(cardDiv);
    }
  }

  // Function to generate a random deck of cards based on user input(userInput)
let drawnCards = []; 

function generateRandomDeck() {
  const userInput = parseInt(document.getElementById("cardCount").value);

  if (isNaN(userInput) || userInput < 4 || userInput > 13) {
    alert("Please enter a number between 4 and 13.");
    return;
  }

  const chosenDeck = createFullDeck();
  shuffle(chosenDeck);
  drawnCards = chosenDeck.slice(0, userInput); 

  renderDeck(drawnCards);
}

///BubbleSort F(x)
 
function sortDrawnCards() {
  if (drawnCards.length === 0) return;

  const sortLog = document.getElementById("sort-log");
  sortLog.innerHTML = ""; // Clear any previous log

  const cards = [...drawnCards]; // Copy of original cards drawn

  // Bubble sort with render at each outer iteration
  for (let i = 0; i < cards.length - 1; i++) {
    for (let j = 0; j < cards.length - i - 1; j++) {
      if (cards[j].numeric > cards[j + 1].numeric) {
        [cards[j], cards[j + 1]] = [cards[j + 1], cards[j]];
      }
    }

    // Render the current step after each outer loop iteration
    renderSortStep(cards, `Step ${i + 1}`);
  }

  renderSortStep(cards, "Final");
}

///-----------------------

//------Sort log rendering function

function renderSortStep(cards, step) {
  const sortLog = document.getElementById("sort-log");

  const label = document.createElement("p");
  sortLog.appendChild(label);

  const row = document.createElement("div");
  row.className = "sorted-row"; // 

  for (const card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "plcard";
    cardDiv.innerHTML = `
      <span class="suit-top ${card.class}">${card.suit}</span>
      <span class="numberr ${card.class}">${card.value}</span>
      <span class="suit-bttm ${card.class}">${card.suit}</span>
    `;
    row.appendChild(cardDiv);
  }

  sortLog.appendChild(row);
}

 


  // Event listener for the button click - save UI# deck/prevent refresh
document.querySelector("#drawBtn").addEventListener("click", (event) => {
    event.preventDefault();
    generateRandomDeck();
});

// Event listener for the button click - save sort deck/prevent refresh
document.querySelector("#btn-sort").addEventListener("click", (event) => {
    event.preventDefault();
    sortDrawnCards();
});

  //button onclick
  window.generateRandomDeck = generateRandomDeck;
  //button 2
  window.sortDrawnCards = sortDrawnCards;
};