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

  //Return true if the position is one pixelOffset from "this"
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
  }
}

export default Position;
