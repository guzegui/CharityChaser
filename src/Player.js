import Sprite from './Sprite.js';
import Position from './Position.js';
import Boundary from './Boundary.js';

export class Player extends Sprite {
    constructor(position, image, speed) {
      super(position, image, speed);
    }

}

export default Player;