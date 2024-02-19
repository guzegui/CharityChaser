import Sprite from "./Sprite.js";
import Position from "./Position.js";
export class Pedestrian extends Sprite {
  constructor(position, image) {
    super(position, image);
  }
  walk(x, y){
    this.position.x += x;
    this.position.y += y;
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

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pedestrian.move();
  pedestrian.draw(ctx);
}

animate();
*/