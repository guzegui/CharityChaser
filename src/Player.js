import Sprite from "./Sprite.js";
import Position from "./Position.js";
import Boundary from "./Boundary.js";

export class Player extends Sprite {
  constructor(position, image, speed) {
    super(position, image, speed);
    this.hasCollidedWith = [];
  }

  addCollision(pedestrianId) {
    this.hasCollidedWith.push(pedestrianId);
  }

  hasAlreadyCollidedWith(pedestrianId) {
    return pedestrianId == null
      ? true
      : this.hasCollidedWith.includes(pedestrianId);
  }
}

export default Player;
