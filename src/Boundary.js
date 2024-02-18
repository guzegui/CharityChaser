export class Boundary {
    constructor({position}){
        this.position = position;
        // Dimensions are the level pixel size
        this.width = 16;
        this.height = 16;
    }
    draw(ctx){
        /*
        console.log("Drawing boundary at:", this.position);
        console.log("Canvas context:", ctx);
        console.log("Canvas size:", ctx.canvas.width, ctx.canvas.height);
        console.log("Fill style:", ctx.fillStyle);
        */
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default Boundary;