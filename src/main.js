import Game from "./Game.js";

//DOM elements
const gameContainer = document.getElementById("game-container");
const gameIntro = document.getElementById("game-intro");

const canvas = document.getElementById("game-screen");
const startButton = document.getElementById("start-button");


window.onload = () => {
  startButton.addEventListener("click", function () {
    gameIntro.style.display = "none";
    gameContainer.style.display = "flex";
    // create Game object
    let game = new Game();
  
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w":
          game.keys.ArrowUp = true;
          break;
        case "s":
          game.keys.ArrowDown = true;
          break;
        case "a":
          game.keys.ArrowLeft = true;
          break;
        case "d":
          game.keys.ArrowRight = true;
          break;
      }
    });
    
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w":
          game.keys.ArrowUp = false;
          break;
        case "s":
          game.keys.ArrowDown = false;
          break;
        case "a":
          game.keys.ArrowLeft = false;
          break;
        case "d":
          game.keys.ArrowRight = false;
          break;
      }
    });

    game.initTimer();
    game.initScore();
    game.gameLoop();
  });
  // display flex for gamecontainer
  
  // Event listeners
  
  

}

