import animate from "./main.js";

let letters = ["a", "s", "d", "f"];
let score = 0;
let numWords = 0;
let isJustStarted = true;
let listenToLetters = null;

const scoreElement = document.getElementById("score");

function startLetterGuessingGame() {
  if (isJustStarted) {
    numWords = Math.floor(Math.random() * 6) + 5; // Random number between 5 and 10
    isJustStarted = false;
  }

  if (numWords === 0) {
    const textBox = document.getElementById("text-box");
    textBox.textContent = "Thanks for playing";
    textBox.style.animation = "appear 0.5s ease-in-out forwards";
    document.removeEventListener("keydown", listenToLetters);
    animate();
    setTimeout(() => {
      textBox.classList.remove("red-text", "green-text"); // Remove red-text and green-text classes
      textBox.style.animation = "disappear 0.5s ease-in-out forwards";
      //isLetterGuessingGameActive = false;
      //return isLetterGuessingGameActive;
    }, 1500);
  } else {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const textBox = document.getElementById("text-box");
    textBox.textContent = randomLetter;
    textBox.classList.remove("red-text", "green-text");
    textBox.style.animation = "appear 0.5s ease-in-out forwards";

    const container = document.getElementById("text-container");
    const containerRect = container.getBoundingClientRect();
    const textBoxRect = textBox.getBoundingClientRect();
    const maxTop = containerRect.height - textBoxRect.height;
    const maxLeft = containerRect.width - textBoxRect.width;

    // Set random top and left positions for the text-box within the container
    const randomTop = Math.floor(Math.random() * maxTop);
    const randomLeft = Math.floor(Math.random() * maxLeft);
    textBox.style.top = `${randomTop}px`;
    textBox.style.left = `${randomLeft}px`;

    listenToLetters = document.addEventListener("keydown", function (event) {
      if (event.key === randomLetter) {
        score += 10;
        //const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = `Score: ${score}`;
        scoreElement.style.animation = "scoreUpdate 0.5s ease-in-out";

        textBox.classList.add("green-text");
        textBox.style.animation = "disappear 0.5s ease-in-out forwards";
      }
      //if (event.key.length === 1 && event.key.match(/[a-z]/i))
      else {
        textBox.classList.add("red-text");
        textBox.style.animation = "disappear 0.5s ease-in-out forwards";
      }
    });

    setTimeout(() => {
      textBox.classList.add("red-text");
      textBox.style.animation = "disappear 0.5s ease-in-out forwards";
      startLetterGuessingGame(); // Call startLetterGuessingGame after 1.5 seconds
    }, 1000);

    numWords--;
  }
}

export default startLetterGuessingGame;
