import Game from "./Game.js";

const letters = [
  "b",
  "c",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "t",
  "u",
  "v",
  "x",
  "y",
  "z",
];

let score = 0;

// Generate a random number of rounds between 0 and 5 using Math.random

let currentRound = setCurrentRound();
let totalRounds = setRandomRounds();
let randomLetter = setRandomLetter();
let letterGuessed = false;

const scoreElement = document.getElementById("score");
const textBox = document.getElementById("text-box");
const container = document.getElementById("text-container");

document.addEventListener("keydown", handleInput);
document.addEventListener("keypress", handleKeyPress);

export function startLetterGuessingGame(game) {
  if (currentRound > totalRounds) {
    game.score = score;
    endLetterGuessingGame();
    game.gameLoop();
  } else {
    letterGuessed = false;
    // Choose a random letter, set color and animation
    randomLetter = setRandomLetter();
    textBox.style.color = "black";
    textBox.style.animation = "appear 0.5s ease-in-out forwards";

    // Get random coordinates object
    let randomDisplay = getRandomDisplay();

    // Render the text box and display it
    textBox.style.display = "flex";
    textBox.style.alignItems = "center";
    textBox.style.justifyContent = "center";
    textBox.style.flexDirection = "column";

    textBox.style.fontSize = "2rem";
    textBox.style.top = `${randomDisplay.top}px`;
    textBox.style.left = `${randomDisplay.left}px`;
    textBox.textContent = randomLetter;
    setTimeout(() => {
      if (randomLetter === textBox.textContent) {
        textBox.style.color = "green";
      } else {
        textBox.style.color = "red";
      }
      textBox.style.animation = "disappear 0.5s ease-in-out forwards";
      setTimeout(() => {
        textBox.style.animation = "";
        scoreElement.style.animation = "";
        currentRound++;
        letterGuessed = true;
        startLetterGuessingGame(game);
      }, 500);
    }, 1500);
  }
}

function handleInput(event) {
  if (currentRound <= totalRounds) {
    let letter = event.key;
    // Control for number of letters pressed and if letter has been already guessed right
    if (letter === randomLetter && event.key.length === 1 && !letterGuessed) {
      textBox.style.color = "green";
      score += 10;
      scoreElement.textContent = "Score: " + score;
      scoreElement.style.animation = "appear 0.5s ease-in-out forwards";
      letterGuessed = true;
    } else {
      textBox.style.color = "red";
    }
  }
}

function handleKeyPress(event) {
  event.preventDefault();
}

function setCurrentRound() {
  let currentRound = 0;
  return currentRound;
}

function setRandomRounds() {
  let totalRounds = Math.floor(Math.random() * 6);
  return totalRounds;
}

function setRandomLetter() {
  let randomLetter = letters[Math.floor(Math.random() * letters.length)];
  return randomLetter;
}

function endLetterGuessingGame() {
  currentRound = setCurrentRound(currentRound);
  totalRounds = setRandomRounds(totalRounds);
  document.removeEventListener("input", handleInput);
  document.removeEventListener("keypress", handleKeyPress);

  // Center the display
  textBox.style.animation = "appear 0.5s ease-in-out forwards";
  const centeredDisplay = getCenteredDisplay();
  textBox.style.top = `${centeredDisplay.top}px`;
  textBox.style.left = `${centeredDisplay.left}px`;

  // center textbox inside container using flex layout
  textBox.style.display = "flex";
  textBox.style.alignItems = "center";
  textBox.style.justifyContent = "center";
  textBox.style.flexDirection = "column";

  // set font size to 1 rem
  textBox.style.fontSize = "2rem";

  textBox.style.color = "black";
  textBox.textContent = "Gotta go! I'm very busy, you know";
  // Add a one second timeout for the animation
  setTimeout(() => {
    textBox.style.animation = "disappear 0.5s ease-in-out forwards";
  }, 1000);
}

function getRandomDisplay() {
  // Calculate the bounds of the container and the text box
  const containerRect = container.getBoundingClientRect();
  const textBoxRect = textBox.getBoundingClientRect();
  // Calculate max coordinates and display text box in random position within
  const maxTop = containerRect.height - textBoxRect.height;
  const maxLeft = containerRect.width - textBoxRect.width;
  const randomTop = Math.floor(Math.random() * maxTop);
  const randomLeft = Math.floor(Math.random() * maxLeft);

  return { top: randomTop, left: randomLeft };
}

function getCenteredDisplay() {
  // Calculate the bounds of the container and the text box
  const containerRect = container.getBoundingClientRect();
  const textBoxRect = textBox.getBoundingClientRect();
  // Calculate the center of the container
  const containerCenterX = containerRect.width / 2;
  const containerCenterY = containerRect.height / 2;
  // Calculate the top-left corner of the text box
  const textBoxTop = Math.round(containerCenterY - textBoxRect.height / 2);
  const textBoxLeft = Math.round(containerCenterX - textBoxRect.width / 2);

  return { top: textBoxTop, left: textBoxLeft };
}

export default startLetterGuessingGame;
