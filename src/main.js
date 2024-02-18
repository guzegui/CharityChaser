//import Level1 from "./Level1";
//
import Sprite from "./Sprite.js";

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

// Load level as an image
const levelImage = new Image();
levelImage.src = "../assets/level1_BIG.png";

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
  player.draw(ctx);
  ctx.drawImage(playerImage, player.position.x, player.position.y);


  if (keys.ArrowUp) player.position.y -= 3;
  else if (keys.ArrowDown) player.position.y += 3;
  else if (keys.ArrowLeft) player.position.x -= 3;
  else if (keys.ArrowRight) player.position.x += 3;
}
console.log("get ready");
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
