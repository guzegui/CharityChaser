import Boundary from "./Boundary.js";

export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Return a new Position object with the difference
  diffPositions(position) {
    return new Position(position.x - this.x, position.y - this.y);
  }
  isSamePositions(position) {
    return this.x === position.x && this.y === position.y;
  }

  addPositions(position) {
    return new Position(this.x + position.x, this.y + position.y);
  }

  //Return true if the position is one x or one y from this
  isNextTo(player, pedestrian, pixelOffset) {
    let boundary = new Boundary(
      new Position(pedestrian.x, pedestrian.y),
      pixelOffset
    );

    let collision = boundary.isCollision(
      player,
      pedestrian,
      pixelOffset,
      pixelOffset
    );

    return collision;
    /*let xDiffPos = new Position(pixelOffset, 0);
    let yDiffPos = new Position(0, pixelOffset);
    let xDiffNeg = new Position(pixelOffset*-1, 0);
    let yDiffNeg = new Position(0, pixelOffset*-1);
*/

    /*
      return (
        Math.abs(this.x - positionToCheck.x) <= pixelOffset + this.width &&
        Math.abs(this.y - positionToCheck.y) <= pixelOffset + this.height
      );

*/

    /*
          return (
            Math.abs(this.x - position.x) <= 1 ||
            Math.abs(this.y - position.y) <= 1
          );
    (
      Math.abs(this.x - position.x) <= pixelOffset + this.width &&
      Math.abs(this.y - position.y) <= pixelOffset + this.height
    )
    */
  }
}

export default Position;
