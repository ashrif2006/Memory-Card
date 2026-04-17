const cards = {
  produce: ["🍈", "🍉", "🍊", "🍆", "🌶", "🍄", "🍒", "🍅"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
};
let gameContainer = document.getElementById("gameContainer");
let score = document.getElementById("score");
let timer = document.getElementById("timer");

let flippedCards = [];
let matchedCounts = 0;
function _16EL(array) {
  return array.concat(array);
}
let selectedCategory = "fruutes";
function sortCardsShuffle() {
  let array = _16EL(cards[selectedCategory]);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let time = 60;
function setDifficult(timeValue , btn) {
    time = timeValue;
    document.querySelectorAll(".modes.diff button").forEach((b) => {
        b.classList.remove("selected-category");
    });
    btn.classList.add("selected-category");
}
function setCardShape(category, btn) {
  selectedCategory = category;
  document.querySelectorAll(".modes.cat button").forEach((b) => {
    b.classList.remove("selected-category");
  });
  btn.classList.add("selected-category");
  console.log(btn);
}

function displayCards(cards) {
  gameContainer.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = "?";
    gameContainer.appendChild(cardElement);

    cardElement.addEventListener("click", () => {
      if (
        flippedCards.length < 2 &&
        !cardElement.classList.contains("flipped")
      ) {
        flipCard(cardElement, card);
        flippedCards.push({ element: cardElement, value: card });
      }
      if (flippedCards.length === 2) {
        checkMatch();
      }
    });
  });
}

function flipCard(cardElement, cardValue) {
  cardElement.textContent = cardValue;
  cardElement.classList.add("flipped");
}

function hideCard(cardElement) {
  cardElement.textContent = "?";
  cardElement.classList.remove("flipped");
}
function isSimilar(card1, card2) {
  return card1 === card2;
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (isSimilar(card1.value, card2.value)) {
    card1.element.classList.add("matched");
    card2.element.classList.add("matched");
    score.innerHTML = parseInt(score.innerHTML) + 10;
    matchedCounts += 2;
    flippedCards = [];
    if (matchedCounts === 16) {
      let timeTaken = time - parseInt(timer.innerHTML);
      clearInterval(countdown);
      document.getElementById("time-taken").innerHTML = timeTaken;
      document.getElementById("setup-winner").style.display = "block";
      document.getElementById("game-ui").style.display = "none";
    }
  } else {
    setTimeout(() => {
      hideCard(card1.element);
      hideCard(card2.element);
      flippedCards = [];
    }, 800);
  }
}

let countdown;
function timerCountdown(timerValue) {
  timer.innerHTML = timerValue;
  let timeLeft = parseInt(timer.innerHTML);
  countdown = setInterval(() => {
    timeLeft--;
    timer.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      isLoser();
    }
  }, 1000);
}
// timerCountdown();

function isLoser() {
  if (parseInt(timer.innerHTML) === 0) {
    document.getElementById("setup-loser").style.display = "block";
    document.getElementById("game-ui").style.display = "none";
  }
}

function startGame(time , category) {
  document.getElementById("setup-screen").style.display = "none";
  document.getElementById("game-ui").style.display = "block";
  score.innerHTML = 0;
  matchedCounts = 0;
  flippedCards = [];
  displayCards(sortCardsShuffle());
  timerCountdown(time);
}

// displayCards(sortCardsShuffle());