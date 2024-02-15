class Character {
    constructor(imageSrc, initialX, initialY, speed) {
      this.image = new Image();
      this.image.src = imageSrc;

      // if it isn´t a player, have it spawn from edges or doors
      this.x = initialX;
      this.y = initialY;
      this.speed = speed;
    }
  
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y);
    }
  }
  
  export default Character;