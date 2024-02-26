import Sprite from "./Sprite.js";
import Position from "./Position.js";
import Boundary from "./Boundary.js";

const PIXEL_SIZE = 16;
const MAX_RIGHT = 50;
const MAX_LEFT = -2;
const MAX_UP = -2;
const MAX_DOWN = 25;

export class Pedestrian extends Sprite {
  constructor(position, image, speed, id) {
    super(position, image, speed); // Call the super constructor with the appropriate arguments
    this.speed = speed;
    this.setPath();
    this.position = new Position(this.path[0].x, this.path[0].y); // Create a deep copy of the first position in the path
    this.pathNum = 0;
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
    if (this.isLastPosition()) return;
    this.setDiffXandY();
    this.move();
  }

  setDiffXandY() {
    let diff = this.position.diffPositions(this.path[this.pathNum + 1]);
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
    return this.position.isSamePositions(this.path[this.path.length - 1]);
  }

  // Set paths in rows, multiply by pixel size and return an array of paths
  setPathArray() {
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

    const fromTop = [];
    fromTop.push(path1, path2, path3);

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

    const fromLeftTop = [];
    fromLeftTop.push(path4, path5, path6);

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

    const fromLeftBottom = [];
    fromLeftBottom.push(path7, path8);

    /*const PIXEL_SIZE = 16;
const MAX_RIGHT = 50;
const MAX_LEFT = -2;
const MAX_UP = -2;
const MAX_DOWN = 25;*/

    const path9 = [
      new Position(20, MAX_DOWN),
      new Position(20, 7),
      new Position(MAX_LEFT, 7),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path10 = [new Position(20, MAX_DOWN), new Position(20, 4)].map(
      (position) => position.multiplyPositions(PIXEL_SIZE)
    );

    const fromBottom = [];
    fromBottom.push(path9, path10);

    const path11 = [new Position(MAX_RIGHT, 22), new Position(39, MAX_UP)].map(
      (position) => position.multiplyPositions(PIXEL_SIZE)
    );

    const path12 = [
      new Position(MAX_RIGHT, 6),
      new Position(39, 6),
      new Position(MAX_LEFT, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path13 = [
      new Position(MAX_RIGHT, 6),
      new Position(39, 6),
      new Position(27, 6),
      new Position(MAX_UP, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const path14 = [
      new Position(MAX_RIGHT, 6),
      new Position(39, 6),
      new Position(27, 6),
      new Position(MAX_DOWN, 6),
    ].map((position) => position.multiplyPositions(PIXEL_SIZE));

    const fromRight = [];
    fromRight.push(path11, path12, path13, path14);

  
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
      path13,
      path14
    );
    //pathArray.push(fromBottom, fromLeftBottom, fromLeftTop, fromRight, fromTop);
    return pathArray;
  }

  addDelay(pedestrianArray) {
    /*
    let pedestriansWithSameStartingPositions =
      this.findDuplicateStartingPositions(pedestrianArray);

    pedestriansWithSameStartingPositions.sort((a, b) => {
      if (a.position.x < b.position.x) {
        return -1;
      } else if (a.position.x > b.position.x) {
        return 1;
      } else {
        // If the x values are equal, compare the y values
        if (a.position.y < b.position.y) {
          return -1;
        } else if (a.position.y > b.position.y) {
          return 1;
        } else {
          // If both x and y values are equal, keep the original order
          return 0;
        }
      }
    });
*/
    let extraCoordinates = 200;
    let factor = 4;

    for (let i = 0; i < pedestrianArray.length - 1; i++) {
      /*if (
        pedestrianArray[i].path[0].isSamePositions(
          pedestrianArray[i + 1].path[0]
        )
      ) {
        
      }
 + i * factor


      */
      if (i != 0) {
        switch (true) {
          case pedestrianArray[i + 1].path[0].x / PIXEL_SIZE === MAX_RIGHT:
            console.log("pedestrianArray[i+1].position is at MAX_RIGHT");
            pedestrianArray[i + 1].path[0].x += extraCoordinates * i;
            break;
          case pedestrianArray[i + 1].path[0].x / PIXEL_SIZE === MAX_LEFT:
            console.log("pedestrianArray[i+1].position is at MAX_LEFT");
            pedestrianArray[i + 1].path[0].x -= extraCoordinates * i;
            break;
          case pedestrianArray[i + 1].path[0].y / PIXEL_SIZE === MAX_UP:
            console.log("pedestrianArray[i+1].position is at MAX_UP");
            pedestrianArray[i + 1].path[0].y -= extraCoordinates * i;
            break;
          case pedestrianArray[i + 1].path[0].y / PIXEL_SIZE === MAX_DOWN:
            console.log("pedestrianArray[i+1].position is at MAX_DOWN");
            pedestrianArray[i + 1].path[0].y += extraCoordinates * i;
            break;
          default:
            console.log(
              "pedestrianArray[i+1].position is not at any of the maximum values"
            );
            break;
        }
        pedestrianArray[i + 1].position = new Position(
          pedestrianArray[i + 1].path[0].x,
          pedestrianArray[i + 1].path[0].y
        );
      }
    }

    pedestrianArray.forEach((pedestrian) => {
      pedestrian.setDiffXandY();
    });
  }

  /*isSamePositions(position) {
    return this.x === position.x && this.y === position.y;
*/

  /* 
    
    const pedestriansWithSamePathId = pedestrianArray.filter(
      (pedestrian, index, pedestrianArray) =>
        pedestrianArray.indexOf(pedestrian.pathId) !== index
    );

    pedestriansWithSamePathId.sort((a, b) => a.pathId - b.pathId);

    let extraCoordinates = 300;

    for (let i = 0; i < pedestriansWithSamePathId.length-1; i++) {
      if (
        pedestriansWithSamePathId[i].pathId ===
        pedestriansWithSamePathId[i + 1].pathId
      ) {
        switch (true) {
          case pedestriansWithSamePathId[i + 1].path[0].x / PIXEL_SIZE ===
            MAX_RIGHT:
            console.log(
              "pedestriansWithSamePathId[i+1].position is at MAX_RIGHT"
            );
            pedestriansWithSamePathId[i + 1].path[0].x +=
              extraCoordinates + i * 1.5;
            break;
          case pedestriansWithSamePathId[i + 1].path[0].x / PIXEL_SIZE ===
            MAX_LEFT:
            console.log(
              "pedestriansWithSamePathId[i+1].position is at MAX_LEFT"
            );
            pedestriansWithSamePathId[i + 1].path[0].x -=
              extraCoordinates + i * 1.5;
            break;
          case pedestriansWithSamePathId[i + 1].path[0].y / PIXEL_SIZE ===
            MAX_UP:
            console.log("pedestriansWithSamePathId[i+1].position is at MAX_UP");
            pedestriansWithSamePathId[i + 1].path[0].y -=
              extraCoordinates + i * 1.5;
            break;
          case pedestriansWithSamePathId[i + 1].path[0].y / PIXEL_SIZE ===
            MAX_DOWN:
            console.log(
              "pedestriansWithSamePathId[i+1].position is at MAX_DOWN"
            );
            pedestriansWithSamePathId[i + 1].path[0].y +=
              extraCoordinates + i * 1.5;
            break;
          default:
            console.log(
              "pedestriansWithSamePathId[i+1].position is not at any of the maximum values"
            );
            break;
        }
        pedestriansWithSamePathId[i + 1].position = new Position(
          pedestriansWithSamePathId[i + 1].path[0].x,
          pedestriansWithSamePathId[i + 1].path[0].y
        );
      }
    }


    */

  findDuplicateStartingPositions(pedestrianArray) {
    return pedestrianArray.filter((pedestrian, index, pedestrianArray) => {
      return pedestrianArray.some(
        (p, i) =>
          i !== index &&
          p.position.x === pedestrian.position.x &&
          p.position.y === pedestrian.position.y
      );
    });
  }

  addOnXorYAxis(paths, xOrY, pixels) {
    if (xOrY === "x") {
      paths.forEach((path) => {
        path.forEach((position) => {
          if (position.x != MAX_LEFT || position.x != MAX_RIGHT) position.x += pixels * PIXEL_SIZE;
        });
      });
    } else if (xOrY === "y") {
      paths.forEach((path) => {
        path.forEach((position) => {
          if (position.y != MAX_UP || position.y != MAX_DOWN)
          position.y += pixels * PIXEL_SIZE;
        });
      });
    }
  }
}

export default Pedestrian;
