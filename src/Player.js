import Sprite from './Sprite.js';
export class Player extends Sprite {
    constructor({ position, velocity, image }) {
      super({ position, velocity, image });
    }

}

export default Player;