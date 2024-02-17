//import Level1 from "./Level1";
//
import Player from "./Player.js";

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");

// Create player character
const player = new Player(
  "../assets/characters/player/player_idle.gif",
  200,
  200,
  5
);

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      player.move("up");
      break;
    case "ArrowDown":
      player.move("down");
      break;
    case "ArrowLeft":
      player.move("left");
      break;
    case "ArrowRight":
      player.move("right");
      break;
  }
  renderPlayer();
});

function renderPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
}

/*

*/

/*


// CREATE LEVEL AS AN IMAGE

// Create level
const level1 = new Image();
level1.src = '../assets/level1.png';
level1.onload = drawLevel;



function drawLevel() {
    // Set canvas size to match the image dimensions
    canvas.width = level1.width;
    canvas.height = level1.height;
  
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the level image onto the canvas
    ctx.drawImage(level1, 0, 0); // Draw at position (0, 0)
  }


*/
