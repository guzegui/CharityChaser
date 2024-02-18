//import Level1 from "./Level1";
//
import Sprite from "./Sprite.js";
import collisions from "./collisions.js";
import Boundary from "./Boundary.js";

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");
// canvas.width = 1024;
// canvas.height = 576;
canvas.width = 1152;
canvas.height = 576;

// Iterate through collisions array and create a new 2d array of 50 elements (map width) per row
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

// Create canvas objects for collision detection

const boundaries = [];

// Iterate through every row and column
collisionsMap.forEach((row, index) => {
  row.forEach((element, column) => {
    // If element is not a zero, create a new Boundary object in boundaries array
    if (element !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: column * 16,
            y: index * 16,
          },
        })
      );
    }
  });
});

console.log(collisionsMap)
console.log(boundaries)

// Load level as an image
const levelImage = new Image();
levelImage.src = "../assets/level1_BIG.png"; //1152 * 576

// Load player as an image
const playerImage = new Image();
playerImage.src = "../assets/characters/player/Character1M_1_idle_0.png";

// Create player Sprite object

const player = new Sprite({
  position: {
    x: 200,
    y: 200,
  },
  image: playerImage,
});

// After loading, render level
levelImage.onload = () => {
  ctx.drawImage(levelImage, 0, 0);
};

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
function animate() {
  window.requestAnimationFrame(animate);
  console.log("animate");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Rerender the level
  ctx.drawImage(levelImage, 0, 0);
  // Render the player
  player.draw(ctx);
  ctx.drawImage(playerImage, player.position.x, player.position.y);
  // Render the boundaries
  boundaries.forEach((boundary) => boundary.draw(ctx));

  if (keys.ArrowUp) player.position.y -= 1;
  else if (keys.ArrowDown) player.position.y += 1;
  else if (keys.ArrowLeft) player.position.x -= 1;
  else if (keys.ArrowRight) player.position.x += 1;
}
console.log("get ready");
console.log(collisions);
animate();

// Player controls

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp = true;
      break;
    case "ArrowDown":
      keys.ArrowDown = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft = true;
      break;
    case "ArrowRight":
      keys.ArrowRight = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp = false;
      break;
    case "ArrowDown":
      keys.ArrowDown = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft = false;
      break;
    case "ArrowRight":
      keys.ArrowRight = false;
      break;
  }
});
