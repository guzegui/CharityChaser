export class Character {
    constructor(imageSrc, posX, posY, speed) {
      this.image = new Image();
      this.image.src = imageSrc;

      // if it isn´t a plaposYer, have it spawn from edges or doors
      this.posX = posX;
      this.posY = posY;
      this.speed = speed;
    }

    move(direction) {
        switch (direction) {
          case 'up':
            this.posY -= this.speed;
            break;
          case 'down':
            this.posY += this.speed;
            break;
          case 'left':
            this.posX -= this.speed;
            break;
          case 'right':
            this.posX += this.speed;
            break;
        }
      }
  
    draw(ctposX) {
      ctposX.drawImage(this.image, this.posX, this.posY);
    }
  }
  
  //export default Character;