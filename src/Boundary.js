import Position from "./Position.js";

/**
 *
 *
 * @export
 * @class Boundary
 */
export class Boundary {
  constructor(position, pixelSize) {
    this.position = position;
    // Dimensions are the level pixel size
    this.width = pixelSize;
    this.height = pixelSize;
  }
  /**
   *
   *
   * @param {*} ctx
   * @memberof Boundary
   */
  draw(ctx) {
    ctx.fillStyle = "rgba(255, 0, 0, 0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  /**
   *
   *
   * @param {*} player
   * @param {*} obstacle
   * @param {*} xOffset
   * @param {*} yOffset
   * @return {*} 
   * @memberof Boundary
   */
  isCollision(player, obstacle, xOffset, yOffset) {
    return (
      player.position.x + player.width >= obstacle.position.x + xOffset &&
      player.position.x <= obstacle.position.x + xOffset + obstacle.width &&
      player.position.y + player.height >= obstacle.position.y + yOffset &&
      player.position.y <= obstacle.position.y + yOffset + obstacle.height
    );
  }
  /**
   *
   *
   * @param {*} keyPressed
   * @param {*} boundaries
   * @param {*} character
   * @param {*} isMoving
   * @return {*} 
   * @memberof Boundary
   */
  checkAllCollisions(keyPressed, boundaries, character, isMoving) {
    let nextBoundary;

    for (let i = 0; i < boundaries.length; i++) {
      nextBoundary = boundaries[i];
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
