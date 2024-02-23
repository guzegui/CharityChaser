//import Level1 from "./Level1";
//
import startLetterGuessingGame from "./letterGuessing.js";
import Sprite from "./Sprite.js";
import collisions from "./collisions.js";
import Boundary from "./Boundary.js";
import Player from "./Player.js";
import Pedestrian from "./Pedestrian.js";
import Position from "./Position.js";
import Game from "./Game.js";


// create Game object
let game = new Game();


game.initTimer();
game.initScore();
game.gameLoop();


// Event listeners

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
