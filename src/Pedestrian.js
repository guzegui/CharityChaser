import Sprite from "./Sprite.js";
import Position from "./Position.js";
import Boundary from "./Boundary.js";

export class Pedestrian extends Sprite {
  constructor(position, image, speed, id) {
    super(position, image, speed); // Call the super constructor with the appropriate arguments
    this.speed = speed;
    this.setPath();
    this.position = new Position(this.path[0].x, this.path[0].y); // Create a deep copy of the first position in the path
    this.pathNum = 0;
    this.setDiffXandY();
    this.hasCollided = false;
    this.id = id;
  }
  move() {
    if (this.xDiff == 0 && this.yDiff == 0) {
      this.setNextPositionsinPath();
    } else {
      if (this.xDiff != 0) {
        // if this.xDiff is a positive number then subtract, otherwise add it
        if (this.xDiff > 0) {
          this.position.x += this.speed;
          this.xDiff -= this.speed;
        } else {
          this.position.x -= this.speed;
          this.xDiff += this.speed;
        }
      }

      if (this.yDiff != 0) {
        // if this.xDiff is a positive number then subtract, otherwise add it
        if (this.yDiff > 0) {
          this.position.y += this.speed;
          this.yDiff -= this.speed;
        } else {
          this.position.y -= this.speed;
          this.yDiff += this.speed;
        }
      }
    }
  }

  // Load paths into path array and return a random one
  setNextPositionsinPath() {
    this.pathNum++;
    if (this.isLastPosition()) return
    this.setDiffXandY();
    this.move();
  }

  setDiffXandY() {
    let diff = this.path[this.pathNum].diffPositions(
      this.path[this.pathNum + 1]
    );
    this.xDiff = diff.x;
    this.yDiff = diff.y;
  }
  setPath(path) {
    let pathArray = this.setPathArray();
    let pathIndex = Math.floor(Math.random() * pathArray.length);
    this.path = pathArray[pathIndex];
    this.pathId = pathIndex;
  }

  isLastPosition() {
    return this.pathNum === this.path.length - 1;
  }

  // Set paths in rows, multiply by pixel size and return an array of paths
  setPathArray() {
    const PIXEL_SIZE = 16;
    const MAX_RIGHT = 50;
    const MAX_LEFT = -2;
    const MAX_UP = -2;
    const MAX_DOWN = 25;

    // In Tiled program, coordinate 0,0 starts at top-left corner
    const path1 = [new Position(11, MAX_UP), new Position(11, MAX_DOWN)].map(
      (position) => position.multiplyPositions(PIXEL_SIZE)
    );

    const path2 = [
      new Position(11, MAX_UP),
      new Position(11, 6),
      new Position(MAX_RIGHT, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path3 = [
      new Position(11, MAX_UP),
      new Position(11, 6),
      new Position(MAX_LEFT, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path4 = [
      new Position(MAX_LEFT, 6),
      new Position(15, 6),
      new Position(15, MAX_UP),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path5 = [
      new Position(MAX_LEFT, 6),
      new Position(15, 6),
      new Position(15, MAX_DOWN),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path6 = [new Position(MAX_LEFT, 6), new Position(MAX_RIGHT, 6)].map(
      (position) => position.multiplyPositions(PIXEL_SIZE)
    );

    const path7 = [
      new Position(MAX_LEFT, 18),
      new Position(16, 18),
      new Position(16, MAX_UP),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path8 = [
      new Position(MAX_LEFT, 18),
      new Position(16, 18),
      new Position(16, 6),
      new Position(MAX_RIGHT, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path9 = [
      new Position(20, 20),
      new Position(20, 7),
      new Position(MAX_LEFT, 7),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path10 = [new Position(20, 20), new Position(20, 4)].map(
      (position) => position.multiplyPositions(PIXEL_SIZE)
    );

    const path11 = [new Position(39, 22), new Position(39, MAX_UP)].map(
      (position) => position.multiplyPositions(PIXEL_SIZE)
    );

    const path12 = [
      new Position(39, 22),
      new Position(39, 6),
      new Position(MAX_LEFT, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path13 = [
      new Position(39, 22),
      new Position(39, 6),
      new Position(27, 6),
      new Position(MAX_UP, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path14 = [
      new Position(39, 22),
      new Position(39, 6),
      new Position(27, 6),
      new Position(MAX_DOWN, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    let pathArray = [];
    pathArray.push(
      path1,
      path2,
      path3,
      path4,
      path5,
      path6,
      path7,
      path8,
      path9,
      path10,
      path11,
      path12,
      path13
    );
    return pathArray;
  }
}

export default Pedestrian;

