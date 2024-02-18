export class Boundary {
    constructor(position){
        this.position = position;
        // Dimensions are the level pixel size
        this.width = 16;
        this.height = 16;
    }
    draw(ctx){
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default Boundary;