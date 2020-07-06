import NameableParent from "./NamableParent.js"
import Point from "./Point.js";
//import Collider from "../../engine/components/Collider.js"


export default class GameObject extends NameableParent {
    x; y;
    scaleX;
    scaleY;
    rotation;
    components = [];
    drawLevel;
    parent;
    player;

    get location(){
            return new Point(this.x,this.y);
        }
    

    constructor(x = 0, y = 0, player = 0, scaleX = 1, scaleY = 1, rotation = 0) {
        super();
        [this.x, this.y, this.player, this.scaleX, this.scaleY, this.rotation] = [x, y, player, scaleX, scaleY, rotation];
    }

    start()
    {
        this.components.filter(i => i.start).forEach(i => i.start());
    }
    addComponent(component) {
        this.components.push(component);
        component.gameObject = this;
    }
    draw(ctx, drawLevel) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.rotate(this.rotation);

            this.components.filter(i => i.draw).forEach(i => i.draw(ctx, drawLevel));
            //Now draw all the children
            this.children.filter(i=>i.draw).forEach(i => i.draw(ctx, drawLevel))

            ctx.restore();    
    }


    update() {
        this.components.filter(i => i.update).forEach(i => i.update());

        //Now update all the children
        this.children.forEach(i => i.update());
    }
    getComponent(type) {
        let component = this.components.find(i => i instanceof type);
        if (component) return component;
        throw "Error, couldn't find type " + type;
    }

    getComponents(type)
    {
        let components = this.components.filter(i => i instanceof type)
        if(components) return components;
        throw "Error, couldn't find colliders";
    }

    getColliders(type)
    {
        let colliders = this.components.filter(i => i instanceof type)
        if(colliders) return colliders;
        throw "Error, couldn't find colliders";
        
        
    }
}