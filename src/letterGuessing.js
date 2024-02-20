const bottomSideContainer = document.getElementById("bottom-side-container");
const scoreElement = document.getElementById("score");

// Get the current score value from the scoreElement
//let currentScore = parseInt(scoreElement.textContent.split(":")[1].trim());

const letters = ["d", "f", "a"];
let letterToGuess = null;
let listenToInput = true;
let letterToListen = null;

/*rightSide.innerHTML = `
  <div class="score">
    Score: ${score}
  </div>
  `;*/
function startLetterGuessingGame() {
  letterToGuess = chooseRandomLetter();
  showLetter(letterToGuess);
}

function chooseRandomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function showLetter(letter) {
  scoreElement.innerHTML = `${letter}`;
  checkLetter(letter);
}

function checkLetter(letter) {
  if (letter === letterToGuess) {
    scoreElement.classList.add("red-text");
    setTimeout(() => {
      scoreElement.classList.remove("red-text");
    }, 1000); // Remove the class after 1 seconds
    letters.splice(letters.indexOf(letterToGuess), 1);
    scoreElement.innerHTML = ""; // Remove the content of the rightSide element
    startLetterGuessingGame();

    if (letters.length === 0) {
      console.log("You win this part");
    }
  }
}

// code to listen to the key that was inserted
document.addEventListener("keydown", function (event) {
  // Ensure that the key pressed is a letter
  if (letterToGuess && event.key.length === 1 && event.key.match(/[a-z]/i)) {
    checkLetter(event.key);
  }
});

export default startLetterGuessingGame;
