import Character from "./Character.js";

export class Player extends Character {
    constructor(imageSrc, posX, posY, speed) {
      super(imageSrc, posX, posY, speed);
    }

}

export default Player;