export class Boundary {
  constructor({ position }) {
    this.position = position;
    // Dimensions are the level pixel size
    this.width = 16;
    this.height = 16;
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(255, 0, 0, 0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  isCollision(player, obstacle, xOffset, yOffset) {
    return (
      player.position.x + player.width >= obstacle.position.x + xOffset &&
      player.position.x <= obstacle.position.x + xOffset + obstacle.width &&
      player.position.y + player.height >= obstacle.position.y + yOffset &&
      player.position.y <= obstacle.position.y + yOffset + obstacle.height
    );
  }
  checkAllCollisions(keyPressed, boundaries, character, isMoving) {
    let nextBoundary;

    //const boundariesShallowCopy = [...boundaries];

    for (let i = 0; i < boundaries.length; i++) {
        nextBoundary = (boundaries[i]);
      switch (keyPressed) {
        case "ArrowUp":
          //nextBoundary.position.y += 1;
          if (this.isCollision(character, nextBoundary, 0, 1)) {
            isMoving = false;
        }
        break;

        case "ArrowDown":
          //nextBoundary.position.y -= 1;
          if (this.isCollision(character, nextBoundary, 0, -1)) {
            isMoving = false;
        }
        break;
        case "ArrowLeft":
          //nextBoundary.position.x += 1;
          if (this.isCollision(character, nextBoundary, 1, 0)) {
            isMoving = false;
        }
        break;
        case "ArrowRight":
          //nextBoundary.position.x -= 1;
          if (this.isCollision(character, nextBoundary, -1, 0)) {
            isMoving = false;
        }
        break;
        //   default:
        //     break;
      }

    }
    return isMoving;
  }
}

export default Boundary;
