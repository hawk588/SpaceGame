import Base from "../Base.js"

export default class RectangleComponent extends Base.Component{
    width;
    height;
    fill;
    stroke;
    drawLevel;
    constructor(width, height, fill, stroke, drawLevel = 2){
        super();
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.drawLevel = drawLevel;
    }
    draw(ctx, drawLevel = 2){
        if(this.drawLevel == drawLevel)
        {
            ctx.save();
            ctx.translate(-this.width/2, -this.height/2);
            ctx.fillStyle = this.fill;
            ctx.strokeStyle = this.stroke;
            //ctx.stroke();
            ctx.fillRect(0,0, this.width, this.height);
            ctx.strokeRect(0, 0, this.width, this.height);
            ctx.restore();
        }    
    }
    update(){

    }
}