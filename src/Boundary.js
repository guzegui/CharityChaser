import Position from "./Position.js";

export class Boundary {
  constructor(position, pixelSize) {
    this.position = position;
    
    // Dimensions are the level pixel size
    this.width = pixelSize;
    this.height = pixelSize;
  }
  
  draw(ctx) {
    ctx.fillStyle = "rgba(255, 0, 0, 0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // Add an offset so that sprites do not overlap
  isCollision(player, obstacle, xOffset, yOffset) {
    return (
      player.position.x + player.width >= obstacle.position.x + xOffset &&
      player.position.x <= obstacle.position.x + xOffset + obstacle.width &&
      player.position.y + player.height >= obstacle.position.y + yOffset &&
      player.position.y <= obstacle.position.y + yOffset + obstacle.height
    );
  }
  
  // Checks for all collisions between all boundaries, the player and a specific pedestrian
  checkAllCollisions(keyPressed, boundaries, character, isMoving) {
    let nextBoundary;
    for (let i = 0; i < boundaries.length; i++) {
      nextBoundary = boundaries[i];
      switch (keyPressed) {
        case "ArrowUp":
          if (this.isCollision(character, nextBoundary, 0, 1)) {
            isMoving = false;
          }
          break;

        case "ArrowDown":
          if (this.isCollision(character, nextBoundary, 0, -1)) {
            isMoving = false;
          }
          break;
        case "ArrowLeft":
          if (this.isCollision(character, nextBoundary, 1, 0)) {
            isMoving = false;
          }
          break;
        case "ArrowRight":
          if (this.isCollision(character, nextBoundary, -1, 0)) {
            isMoving = false;
          }
          break;
      }
    }
    return isMoving;
  }
}

export default Boundary;
