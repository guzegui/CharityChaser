let letters = ["a", "s", "d", "f"];
let score = 0;
let numWords = 0;
let isJustStarted = true;

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
    textBox.classList.remove("red-text", "green-text"); // Remove red-text and green-text classes
    return;
  }

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

  document.addEventListener("keydown", function (event) {
    if (event.key === randomLetter) {
      score += 10;
      //const scoreElement = document.getElementById("score");
      scoreElement.innerHTML = `Score: ${score}`;
      scoreElement.style.animation = "scoreUpdate 0.5s ease-in-out";

      textBox.classList.add("green-text");
      textBox.style.animation = "disappear 0.5s ease-in-out forwards";
    } else if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      textBox.classList.add("red-text");
      textBox.style.animation = "disappear 0.5s ease-in-out forwards";
    }
  });

  setTimeout(() => {
    textBox.classList.add("red-text");
    textBox.style.animation = "disappear 0.5s ease-in-out forwards";
  }, 1000);

  numWords--;
  setTimeout(startLetterGuessingGame, 1500); // Call displayRandomLetter after 1.5 seconds
}


export default startLetterGuessingGame;
