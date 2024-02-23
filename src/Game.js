import Sprite from "./Sprite.js";
import collisions from "./collisions.js";
import Boundary from "./Boundary.js";
import Player from "./Player.js";
import Pedestrian from "./Pedestrian.js";
import Position from "./Position.js";
import startLetterGuessingGame from "./letterGuessing.js";

// DOM elements
const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");
canvas.width = 800; // 50 rows
canvas.height = 400; // 25 columns
const leftSide = document.getElementById("left-side");
const rightSide = document.getElementById("right-side");

export class Game {
  constructor() {
    this.canvas = canvas;
    this.ctx = ctx;
    this.leftSide = leftSide;
    this.rightSide = rightSide;
    this.boundaries = this.initBoundaries();
    this.loadLevelImages();
    this.loadPlayerImage();
    // how to initiate player?????????????
    this.player = null;
    this.pedestrians = null;
    this.timer = 60;
    this.score = 0;
    this.highScore = 0;

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
    this.levelImage.src = "../assets/level1.png"; //800 * 400

    // Load foreground as an image
    this.foregroundImage = new Image();
    this.foregroundImage.src = "../assets/foreground.png";

    this.levelImage.onload = () => {
      // Image is fully loaded, you can use it now
    };

    this.foregroundImage.onload = () => {
      // Image is fully loaded, you can use it now
    };
    /*
    // Store images in Game object
    this.levelImage = levelImage;
    this.foregroundImage = foregroundImage;
    */
  }

  loadPlayerImage() {
    // Load player as an image
    const playerImage = new Image();
    // playerImage.src = "../assets/characters/player/Character1M_1_idle_0.png"; //64*64px
    playerImage.src =
      "../assets/characters/player/Character1M_1_idle_0_SMALL.png"; //30PX

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
      "../assets/characters/pedestrians/Character1F_1_idle_0.png",
      "../assets/characters/pedestrians/Character1F_2_idle_0.png",
      "../assets/characters/pedestrians/Character1F_3_idle_0.png",
      "../assets/characters/pedestrians/Character2M_2_idle_0.png",
      "../assets/characters/pedestrians/Character2M_3_idle_0.png",
      "../assets/characters/pedestrians/Character3M_3_idle_0.png",
    ];

    // Initialize pedestrian array
    const pedestrians = [];

    for (let i = 0; i < numPedestrians; i++) {
      let pedestrianImage = new Image();
      pedestrianImage.src =
        pedestrianSrc[Math.floor(Math.random() * pedestrianSrc.length)];
      pedestrians.push(
        new Pedestrian(
          new Position(
            Math.floor(Math.random() * canvas.width),
            Math.floor(Math.random() * canvas.height)
          ),
          pedestrianImage,
          0.5,
          i
        )
      );
    }

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
    /*
    this.levelImage.onload = () => {
    };
    */
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
    this.pedestrians.forEach((pedestrian, index) => {
      if (!pedestrian.isLastPosition()) {
        pedestrian.move();
      } else {
        // Remove the pedestrian from the array
        this.pedestrians.splice(index, 1);
      }
    });
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

    /*
    let pedestrianCollisionId = pedestrians.some((pedestrian) => {
      if (this.player.position.isNextTo(this.player, pedestrian, this.player.width)) {
        //pedestrian.hasCollided = true;
        //pedestrianCollisionId = pedestrian.id;
        return pedestrian.id;
      }
    });
    */
  }

  gameLoop() {
    // Store the exact frame id to pause and resume animations
    const animationId = window.requestAnimationFrame(() => this.gameLoop());
    //this.renderGameElements();
    
    this.updateTimer();
    this.renderGameElements();
    /*
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Rerender the level
      ctx.drawImage(this.levelImage, 0, 0);
      // Render the boundaries
      this.boundaries.forEach((boundary) => {
        boundary.draw(ctx);
      });
      // Render the player
      this.player.draw(ctx);
      // Render the foreground
      ctx.drawImage(this.foregroundImage, 0, 0);
    
      // Render the pedestrians
      this.pedestrians.forEach((pedestrian) => {
        pedestrian.draw(ctx);
      });
      */

    this.moveAllPedestrians();

    let pedestrianCollisionId = null;

    pedestrianCollisionId = this.whichPedestrianCollidedWithPlayer();

    let isPlayerMoving = true;


   
    // If the player has collided with a new pedestrian
    if (!this.player.hasAlreadyCollidedWith(pedestrianCollisionId)) {
      console.log("collisionnnnnnnnnn");
      this.player.addCollision(pedestrianCollisionId);
      window.cancelAnimationFrame(animationId);
      startLetterGuessingGame(this);
    }

    //let isPlayerMoving = true;

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

    
  }
}

export default Game;
/*
 */
