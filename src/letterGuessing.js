import Game from "./Game.js";

let letters = ["q", "w"];
let score = 0;

// Generate a random number of rounds between 0 and 5 using Math.random

let currentRound = setCurrentRound();
let totalRounds = setRandomRounds();

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
    // Choose a random letter, set color and animation
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    textBox.style.color = "black";
    textBox.style.animation = "appear 0.5s ease-in-out forwards";

    // Get random coordinates object
    let randomDisplay = getRandomDisplay();

    // Render the text box and display it
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
        startLetterGuessingGame(game);
      }, 500); // Changed from 1000 to 500
    }, 1500); // Changed from 1000 to 1500
  }
}

function handleInput(event) {
  let letter = event.key;
  if (letter === textBox.textContent) {
    textBox.style.color = "green";
    score += 10;
    scoreElement.textContent = "Score: " + score;
    scoreElement.style.animation = "appear 0.5s ease-in-out forwards";
  } else {
    textBox.style.color = "red";
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

function endLetterGuessingGame() {
  currentRound = setCurrentRound(currentRound);
  totalRounds = setRandomRounds(totalRounds);
  document.removeEventListener("input", handleInput);
  document.removeEventListener("keypress", handleKeyPress);

  // Center the display
  textBox.style.color = "black";
  textBox.style.animation = "appear 0.5s ease-in-out forwards";
  const centeredDisplay = getCenteredDisplay();
  textBox.style.top = `${centeredDisplay.top}px`;
  textBox.style.left = `${centeredDisplay.left}px`;
  textBox.textContent = "Gotta go! I'm very busy, you know";
  textBox.style.animation = "disappear 0.5s ease-in-out forwards";
  textBox.style.animation = "";
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
