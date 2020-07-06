import Base from "../Base.js"
import RectangleComponent from "./RectangleComponent.js";


export default class ArcComponent extends Base.Component{
    radius;
    fill;
    stroke;
    startAngle;
    endAngle;
    drawLevel; 
    constructor(radius, fill, stroke, startAngle, endAngle, drawLevel = 0){
        super();
        this.radius = radius;
        this.fill = fill;
        this.stroke = stroke;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.drawLevel = drawLevel;
    }
    draw(ctx, drawLevel = 0){
        
        if(this.drawLevel == drawLevel)
        {   
            ctx.save();
            ctx.fillStyle = this.fill;
            ctx.strokeStyle = this.stroke;
            ctx.beginPath();
            ctx.arc(0,0,this.radius,this.startAngle - Math.PI / 2,this.endAngle - Math.PI / 2);
            ctx.lineTo(0,0);
            //ctx.stroke();
            ctx.fill();
            ctx.restore();
        }    
    }
    update(){

    }
}