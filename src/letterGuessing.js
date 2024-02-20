const bottomSideContainer = document.getElementById("bottom-side-container");

const letters = ["d", "f", "a"];

let mainLetter = null;

const showLetter = (letter) => {
  let listenToInput = true;

  let letterToListen = letter;

  bottomSideContainer.innerHTML = `
        <div>
            ${letter}
        </div>
    `;
};

const checkLetter = (letter) => {
  if (letter === mainLetter) {
    showLetter(letters.shift());

    if (letters.length === 0) {
      console.log("You win this part");
    }
  }
};

function showNextLetter(){
  showLetter(letters.shift());
};

// code to listen to the key that was inserted
document.addEventListener("keydown", function (event) {
  // Ensure that the key pressed is a letter
  if (mainLetter && event.key.length === 1 && event.key.match(/[a-z]/i)) {
    checkLetter(event.key);
  }
});

export default showNextLetter;
