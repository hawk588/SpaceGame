import Base from "../../engine/Base.js"
import TileBehavior from "./TileBehavior.js";
import CollisionHelper from "../../engine/components/CollisionHelper.js";
import GameObject from "../../engine/base/GameObject.js";
import PointCollider from "../../engine/components/PointCollider.js";
import Input from "../../engine/base/Input.js";
import Collider from "../../engine/components/Collider.js";
import SelectBehavior from "../../game/behaviors/SelectBehavior.js"

export default class NapsterBehavior extends Base.Behavior {
    peons = []
    selected = 0;
    start() {
        //this.peons = [];
    }
    update() {
        if(Input.mouseButtons[0])
        {
            if(!this.select(Input.mouseX, Input.mouseY) && this.selected)
            {
                //this.selected.selected = true;
            }
        }
    }
    select(x, y) {
        let point = new GameObject(x, y);
        let pointCollide = new PointCollider();
        point.addComponent(pointCollide);
        let that = this;
        this.peons.filter(i => i.getComponent).forEach(function(i) {
            let collisions = [];
            let collider = i.getComponent(Collider);
            collisions[0] = {collider:collider, gameObject:i};
            collisions[1] = {collider:pointCollide, gameObject:point};

            if(CollisionHelper.inCollision(collisions[0], collisions[1]))
            {
                
                if(that.selected)
                {
                    that.selected.selected = false;
                }   
                i.getComponent(SelectBehavior).selected = true;
                that.selected = i.getComponent(SelectBehavior);
                return true;
            }
        })
        return false;
    }
}