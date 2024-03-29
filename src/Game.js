import Sprite from "./Sprite.js";
import collisions from "./collisions.js";
import Boundary from "./Boundary.js";
import Player from "./Player.js";
import Pedestrian from "./Pedestrian.js";
import Position from "./Position.js";
import startLetterGuessingGame from "./letterGuessing.js";

// DOM elements
const gameContainer = document.getElementById("game-container");
const gameEnd = document.getElementById("game-end");

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");
canvas.width = 800; // 50 rows
canvas.height = 400; // 25 columns
const leftSide = document.getElementById("left-side");
const rightSide = document.getElementById("right-side");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

export class Game {
  constructor() {
    this.canvas = canvas;
    this.ctx = ctx;
    this.leftSide = leftSide;
    this.rightSide = rightSide;
    this.boundaries = this.initBoundaries();
    this.loadLevelImages();
    this.loadPlayerImage();
    this.player = null;
    this.pedestrians = null;
    this.timer = 60;
    this.score = 0;
    this.isStartAgain = false;
    this.animationId = null;

    // Player movement controls
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
  }

  initBoundaries() {
    // Iterate through collisions array (in collisions.js, extracted from Level1Collisions.tmj)
    const collisionsMap = [];
    // Create a new 2d array of 50 elements (level width) per row
    for (let i = 0; i < collisions.length; i += 50) {
      collisionsMap.push(collisions.slice(i, i + 50));
    }

    // Create Boundary objects array for collision detection
    const boundaries = [];

    // Iterate through every row and column
    collisionsMap.forEach((row, index) => {
      row.forEach((element, column) => {
        // If element is a collision tile, create a new Boundary object in boundaries array
        if (element === 1037) {
          boundaries.push(
            new Boundary(new Position(column * 16, index * 16), 16)
          );
        }
      });
    });
    return boundaries;
  }

  loadLevelImages() {
    // Load level as an image
    this.levelImage = new Image();
    this.levelImage.src = "./assets/level1.png"; //800 * 400

    // Load foreground as an image
    this.foregroundImage = new Image();
    this.foregroundImage.src = "./assets/foreground.png";

    this.levelImage.onload = () => {
      // Image is fully loaded
    };

    this.foregroundImage.onload = () => {
      // Image is fully loaded
    };
  }

  loadPlayerImage() {
    // Load player as an image
    const playerImage = new Image();
    playerImage.src = "./assets/Character1M1idle0SMALL.png"; //30PX

    this.playerImage = playerImage;
  }

  createPlayer() {
    // Create player Sprite object
    const player = new Player(new Position(200, 200), this.playerImage, 1);

    return player;
  }

  initPedestrians(numPedestrians) {
    // Import pedestrian images as string array - 3 females and 2 males
    const pedestrianSrc = [
      "./assets/Character1F_1_idle_0.png",
      "./assets/Character1F_2_idle_0.png",
      "./assets/Character1F_3_idle_0.png",
      "./assets/Character2M_2_idle_0.png",
      "./assets/Character2M_3_idle_0.png",
      "./assets/Character3M_3_idle_0.png",
    ];

    // Initialize pedestrian array
    const pedestrians = [];

    for (let i = 0; i < numPedestrians; i++) {
      let pedestrianImage = new Image();
      pedestrianImage.src =
        pedestrianSrc[Math.floor(Math.random() * pedestrianSrc.length)];
      pedestrians.push(
        new Pedestrian(new Position(0, 0), pedestrianImage, 0.5, i)
      );
    }
    // Add extra pixels to ensure phased appearance
    pedestrians[0].addDelay(pedestrians);

    return pedestrians;
  }

  initTimer() {
    setInterval(() => {
      this.timer--;
    }, 1000);
  }

  updateTimer() {
    leftSide.innerHTML = `
    <div class="timer">
      Time: ${this.timer}
    </div>
    `;
  }

  renderGameElements() {
    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Render the level, boundaries, player and foreground

    ctx.drawImage(this.levelImage, 0, 0);

    this.boundaries.forEach((boundary) => {
      boundary.draw(ctx);
    });
    if (this.player == null) {
      this.player = this.createPlayer();
    }
    this.player.draw(ctx);
    ctx.drawImage(this.foregroundImage, 0, 0);

    if (this.pedestrians == null) {
      this.pedestrians = this.initPedestrians(20);
    }

    if (this.timer == null) {
      this.initTimer();
    }

    // Render the pedestrians
    this.pedestrians.forEach((pedestrian) => {
      pedestrian.draw(ctx);
    });
  }

  moveAllPedestrians() {
    // Move the pedestrians
    for (let i = 0; i < this.pedestrians.length; i++) {
      const pedestrian = this.pedestrians[i];
      if (!pedestrian.isLastPosition()) {
        pedestrian.move();
      } else {
        // Remove the pedestrian from the array
        this.pedestrians.splice(i, 1);
      }
    }
  }

  whichPedestrianCollidedWithPlayer() {
    // Check if the player is next to any pedestrian
    let collidedPedestrian = this.pedestrians.find((pedestrian) => {
      return this.player.position.isNextTo(
        this.player,
        pedestrian,
        this.player.width
      );
    });

    return collidedPedestrian == undefined ? null : collidedPedestrian.id;
  }

  initScore() {
    scoreElement.innerHTML = `Score: ${this.score}`;
  }

  gameLoop() {
    // Store the exact frame id to pause and resume animations
    if (!this.isStartAgain) {
      const animationId = window.requestAnimationFrame(
        this.gameLoop.bind(this)
      );
      this.animationId = animationId;
    } else {
      this.isStartAgain = false;
      this.restartGameLoop();
    }

    this.updateTimer();
    this.renderGameElements();

    this.moveAllPedestrians();

    let pedestrianCollisionId = null;

    pedestrianCollisionId = this.whichPedestrianCollidedWithPlayer();

    // If the player has collided with a new pedestrian
    if (!this.player.hasAlreadyCollidedWith(pedestrianCollisionId)) {
      this.player.addCollision(pedestrianCollisionId);
      window.cancelAnimationFrame(this.animationId);
      startLetterGuessingGame(this);
    }

    let isPlayerMoving = true;

    if (this.keys.ArrowUp) {
      isPlayerMoving = this.boundaries[0].checkAllCollisions(
        "ArrowUp",
        this.boundaries,
        this.player,
        isPlayerMoving
      );
      if (isPlayerMoving) this.player.position.y -= 1;
    } else if (this.keys.ArrowDown) {
      isPlayerMoving = this.boundaries[0].checkAllCollisions(
        "ArrowDown",
        this.boundaries,
        this.player,
        isPlayerMoving
      );
      if (isPlayerMoving) this.player.position.y += 1;
    } else if (this.keys.ArrowLeft) {
      isPlayerMoving = this.boundaries[0].checkAllCollisions(
        "ArrowLeft",
        this.boundaries,
        this.player,
        isPlayerMoving
      );
      if (isPlayerMoving) this.player.position.x -= 1;
    } else if (this.keys.ArrowRight) {
      isPlayerMoving = this.boundaries[0].checkAllCollisions(
        "ArrowRight",
        this.boundaries,
        this.player,
        isPlayerMoving
      );
      if (isPlayerMoving) this.player.position.x += 1;
    }
    if (this.isGameOver()) {
      window.cancelAnimationFrame(this.animationId);
      this.endScreen();
    }
  }

  restartGameLoop() {
    window.cancelAnimationFrame(this.animationId); // Stop the current animation
    this.gameLoop(); // Start the game loop again
  }

  // If pedestrians array is empty or timer is under 0, return true
  isGameOver() {
    if (this.pedestrians.length == 0 || this.timer <= 0) {
      return true;
    } else {
      return false;
    }
  }

  endScreen() {
    gameContainer.style.display = "none";
    gameEnd.style.display = "block";

    // Display the score
    const scoreElement = document.createElement("p");
    scoreElement.textContent = `Score: ${this.score}`;
    gameEnd.appendChild(scoreElement);

    // Display the number of pedestrians stopped
    const stoppedPedestriansElement = document.createElement("p");
    stoppedPedestriansElement.textContent = `You have stopped ${this.player.hasCollidedWith.length} pedestrians`;
    gameEnd.appendChild(stoppedPedestriansElement);

    // Update the restart button text
    restartButton.addEventListener("click", () => window.location.reload());
  }

  restartGame() {
    gameEnd.style.display = "none";
    gameContainer.style.display = "block";

    //Remove child elements after restart button//
    let nextSibling = restartButton.nextSibling;
    while (nextSibling) {
      gameEnd.removeChild(nextSibling);
      nextSibling = restartButton.nextSibling;
    }

    let lastHighScore = this.highScore;

    // Reset properties to their initial values
    this.score = 0;
    this.highScore = lastHighScore;
    this.player = null;
    this.pedestrians = null;
    this.isStartAgain = true;

    // Initialize the timer and score

    clearInterval(this.timerInterval); // Stop the timer
    this.timer = 60; // Set the timer to null
    this.initTimer();
    this.initScore();

    // Stop the previous game loop

    window.cancelAnimationFrame(this.animationId);

    // create a new Game object
    let game = new Game();

    // Start the game loop again
    game.gameLoop();
  }
}

export default Game;
