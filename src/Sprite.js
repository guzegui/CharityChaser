export class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
    // frames?? frames = { max: 0}
    this.image.onload = () => {
      this.width = this.image.width
      this.height = this.image.height
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

export default Sprite;
