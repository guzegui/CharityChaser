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
}

export default Position;
