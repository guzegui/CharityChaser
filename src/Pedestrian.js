import Sprite from "./Sprite.js";
export class Pedestrian extends Sprite {
  constructor({ position, velocity, image }) {
    super({ position, velocity, image });
  }
}

export default Pedestrian;
