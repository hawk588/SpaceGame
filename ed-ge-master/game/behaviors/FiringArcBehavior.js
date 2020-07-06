import Base from "../../engine/Base.js"
import SelectBehavior from "./SelectBehavior.js";
import  Components from "../../engine/Components.js"

export default class RectangleBehavior extends Base.Behavior{
    start(){
        this.gameObject.rotation = 0;
    }
    update(){
        if(this.gameObject.getComponent(SelectBehavior).selected)
        {
            //this.gameObject.components.filter(i => i instanceof Components.ArcComponent).style.opacity = "0";
        }
        else
        {
            //this.gameObject.components.filter(i => i instanceof Components.ArcComponent).style.opacity = "0";
        }
    }
}