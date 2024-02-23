import Sprite from "./Sprite.js";
import Position from "./Position.js";
import Boundary from "./Boundary.js";

export class Pedestrian extends Sprite {
  constructor(position, image, speed, id) {
    super(position, image, speed);
    this.setPath();
    this.pathNum = 0;
    this.position = this.path[0];
    this.targetPosition = this.path[1];
    this.hasCollided = false;
    this.id = id;
  }
  move() {
    if (this.position.isSamePositions(this.targetPosition)) {
      this.setNextPositionsinPath();
    }

    let diff = this.position.diffPositions(this.targetPosition);

    if (diff.x > 0) {
      this.position.x += this.speed;
    } else if (diff.x < 0) {
      this.position.x -= this.speed;
    }

    if (diff.y > 0) {
      this.position.y += this.speed;
    } else if (diff.y < 0) {
      this.position.y -= this.speed;
    }
  }

  // Load paths into path array and return a random one
  setPath(path) {
    let pathArray = this.setPathArray();
    this.path = pathArray[Math.floor(Math.random() * pathArray.length)];
  }

  setNextPositionsinPath() {
    this.position = this.targetPosition;
    this.pathNum++;
    this.targetPosition = this.path[this.pathNum];
  }

  isLastPosition(){
    return this.pathNum === this.path.length - 1;
  }

  setPathArray() {
    // test path1
    const path1 = [
      new Position(500, 100),
      new Position(200, 100),
      new Position(200, 200),
      new Position(100, 200),
      new Position(100, 100),
    ];

    // test path2
    const path2 = [
      new Position(700, 300),
      new Position(100, 300),
      new Position(200, 300),
      new Position(200, 100),
      new Position(100, 100),
    ];
    // test path3
    const path3 = [
      new Position(200, 500),
      new Position(100, 500),
      new Position(200, 500),
      new Position(200, 100),
      new Position(100, 100),
    ];
    // test path4
    const path4 = [
      new Position(300, 100),
      new Position(400, 100),
      new Position(400, 200),
      new Position(300, 200),
      new Position(300, 100),
    ];

    // test path5
    const path5 = [
      new Position(300, 300),
      new Position(400, 300),
      new Position(400, 400),
      new Position(300, 400),
      new Position(300, 300),
    ];

    // test path6
    const path6 = [
      new Position(500, 100),
      new Position(600, 100),
      new Position(600, 200),
      new Position(500, 200),
      new Position(500, 100),
    ];

    // test path7
    const path7 = [
      new Position(500, 300),
      new Position(600, 300),
      new Position(600, 400),
      new Position(500, 400),
      new Position(500, 300),
    ];

    // test path8
    const path8 = [
      new Position(700, 100),
      new Position(800, 100),
      new Position(800, 200),
      new Position(700, 200),
      new Position(700, 100),
    ];

    // test path9
    const path9 = [
      new Position(700, 300),
      new Position(800, 300),
      new Position(800, 400),
      new Position(700, 400),
      new Position(700, 300),
    ];

    // test path10
    const path10 = [
      new Position(900, 100),
      new Position(1000, 100),
      new Position(1000, 200),
      new Position(900, 200),
      new Position(900, 100),
    ];

    // test path11
    const path11 = [
      new Position(900, 300),
      new Position(1000, 300),
      new Position(1000, 400),
      new Position(900, 400),
      new Position(900, 300),
    ];

    // test path12
    const path12 = [
      new Position(1100, 100),
      new Position(1200, 100),
      new Position(1200, 200),
      new Position(1100, 200),
      new Position(1100, 100),
    ];

    // test path13
    const path13 = [
      new Position(1100, 300),
      new Position(1200, 300),
      new Position(1200, 400),
      new Position(1100, 400),
      new Position(1100, 300),
    ];

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

/*
class Pedestrian {
  constructor({ position, path }) {
    this.position = position;
    this.path = path;
    this.currentStep = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
  }

  move() {
    if (this.currentStep < this.path.length - 1) {
      this.currentStep++;
    } else {
      this.currentStep = 0;
    }
    this.position = this.path[this.currentStep];
  }
}

const path = [
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 200, y: 200 },
  { x: 100, y: 200 },
  { x: 100, y: 100 },
];

const pedestrian = new Pedestrian({
  position: path[0],
  path: path,
});

function gameLoop() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pedestrian.move();
  pedestrian.draw(ctx);
}

gameLoop();
*/
