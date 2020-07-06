import Engine from "../../engine/Engine.js"
import Base from "../../engine/Base.js"
import RectangleBehavior from "./RectangleBehavior.js";
import  Components from "../../engine/Components.js"


export default class SelectBehavior extends Base.Behavior{
    selected = false;
    
    start(){
        
    }
    update(){
        let component = this.gameObject.getComponent(Components.RectangleComponent);
        let arcs = this.gameObject.getComponents(Components.ArcComponent);
        if(this.selected){
            component.fill = "pink";
            for(let i = 0; i < arcs.length; i++)
            {
                arcs[i].fill = "rgba(255, 192, 203, 1)"
            }
        }
        else{
            component.fill = "red";
            for(let i = 0; i < arcs.length; i++)
            {
                arcs[i].fill = "rgba(255, 192, 203, 0)"
            }
        }
        
    }
}