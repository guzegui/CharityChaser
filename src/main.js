//import Level1 from "./Level1";
//
import Sprite from "./Sprite.js";
import collisions from "./collisions.js";
import Boundary from "./Boundary.js";

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");
canvas.width = 800; // 50 rows
canvas.height = 400; // 25 columns

// Iterate through collisions array and create a new 2d array of 50 elements (map width) per row
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, i + 50));
}

// Create canvas objects for collision detection

const boundaries = [];

// Iterate through every row and column
collisionsMap.forEach((row, index) => {
  row.forEach((element, column) => {
    // If element is not a zero, create a new Boundary object in boundaries array
    if (element === 1037) {
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

// Load level as an image
const levelImage = new Image();
levelImage.src = "../assets/level1.png"; //800 * 400

// Load foreground as an image

const foregroundImage = new Image();
foregroundImage.src = "../assets/foreground.png";

// Load player as an image
const playerImage = new Image();
// playerImage.src = "../assets/characters/player/Character1M_1_idle_0.png"; //64*64px
playerImage.src = "../assets/characters/player/Character1M_1_idle_0_SMALL.png"; //30PX

// Create player Sprite object

const player = new Sprite({
  position: {
    x: 200,
    y: 200,
  },
  image: playerImage,
});

// After loading, render level
// levelImage.onload = () => {
//   ctx.drawImage(levelImage, 0, 0);
// };

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
  // Render the boundaries
  boundaries.forEach((boundary) => {
    boundary.draw(ctx);
  });
  // Render the player
  player.draw(ctx);
  // Render the foreground
  ctx.drawImage(foregroundImage, 0, 0);

  let isMoving = true;

  if (keys.ArrowUp) {
    isMoving = boundaries[0].checkAllCollisions(
      "ArrowUp",
      boundaries,
      player,
      isMoving
    );
    if (isMoving) player.position.y -= 1;
  } else if (keys.ArrowDown) {
    isMoving = boundaries[0].checkAllCollisions(
      "ArrowDown",
      boundaries,
      player,
      isMoving
    );
    if (isMoving) player.position.y += 1;
  } else if (keys.ArrowLeft) {
    isMoving = boundaries[0].checkAllCollisions(
      "ArrowLeft",
      boundaries,
      player,
      isMoving
    );
    if (isMoving) player.position.x -= 1;
  } else if (keys.ArrowRight) {
    isMoving = boundaries[0].checkAllCollisions(
      "ArrowRight",
      boundaries,
      player,
      isMoving
    );
    if (isMoving) player.position.x += 1;
  }
}

console.log("get ready");
console.log(collisions);
animate();

// Player controls

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      keys.ArrowUp = true;
      break;
    case "s":
      keys.ArrowDown = true;
      break;
    case "a":
      keys.ArrowLeft = true;
      break;
    case "d":
      keys.ArrowRight = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.ArrowUp = false;
      break;
    case "s":
      keys.ArrowDown = false;
      break;
    case "a":
      keys.ArrowLeft = false;
      break;
    case "d":
      keys.ArrowRight = false;
      break;
  }
});
