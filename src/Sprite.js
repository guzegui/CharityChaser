export class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

export default Sprite;
