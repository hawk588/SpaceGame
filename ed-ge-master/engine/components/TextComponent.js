import Base from "../Base.js"

export default class TextComponent extends Base.Component{
    text;
    font;
    fill;
    drawLevel;

    constructor(text, font, fill, drawLevel = 1){
        super();
        this.text = text;
        this.font = font;
        this.fill = fill;
        this.drawLevel = drawLevel;
    }
    draw(ctx, drawLevel = 1){
        if(this.drawLevel == drawLevel)
        {
            ctx.save();
            ctx.fillStyle = this.fill;
            ctx.font = this.font;
            ctx.fillText(this.text,0,0);
            ctx.restore();
        }    
    }
    update(){

    }
}