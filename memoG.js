const game = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let startScreen = document.getElementById("start")
let gameScreen = document.getElementById("gameScreenHidden");
let scoreScreen = document.getElementById("scoreScreenHidden");
let startBtn = document.getElementById("startBtn")
let a = document.querySelector("a");
let p = document.querySelector("p");
let h3 = document.querySelector("h3");
let currentScore = 0
let lowScore = localStorage.getItem("lowScore");

if (lowScore) {
  document.querySelector("h2").innerText = "Best score: " + lowScore;
}

startBtn.addEventListener("click", function(){
  gameScreen.removeAttribute("id");
  startScreen.remove();
})

h3.append(currentScore);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    game.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")){
    return
  } else {
    currentScore ++;
    h3.innerText = "Your score is: " + currentScore;
  }

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length){
    gameScreen.setAttribute("id", "gameScreenHidden");
    scoreScreen.removeAttribute("id")
    a.style.display = "flex";
    p.style.display = "flex";
    let lowestScore = +localStorage.getItem("lowScore") || Infinity;
    if (currentScore < lowestScore) {
      p.append(currentScore + " - NEW BEST SCORE!!");
      localStorage.setItem("lowScore", currentScore);
    } else{
      p.append(currentScore + " - KEEP TRYING")
    }
  }
}
createDivsForColors(shuffledColors);

