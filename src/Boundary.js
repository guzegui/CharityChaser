export class Boundary {
  constructor({ position }) {
    this.position = position;
    // Dimensions are the level pixel size
    this.width = 16;
    this.height = 16;
  }
  draw(ctx) {
    /*
        console.log("Drawing boundary at:", this.position);
        console.log("Canvas context:", ctx);
        console.log("Canvas size:", ctx.canvas.width, ctx.canvas.height);
        console.log("Fill style:", ctx.fillStyle);
        */
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  boundaryCollision(character) {
    return (
      character.position.x + character.width >= this.position.x &&
      character.position.x <= this.position.x + this.width &&
      character.position.y + character.height >= this.position.y &&
      character.position.y <= this.position.y + this.height
    );
  }
}

export default Boundary;
