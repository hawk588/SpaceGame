import Base from "../../engine/Base.js"
import TileBehavior from "./TileBehavior.js";
import CollisionHelper from "../../engine/components/CollisionHelper.js";
import GameObject from "../../engine/base/GameObject.js";
import PointCollider from "../../engine/components/PointCollider.js";
import Input from "../../engine/base/Input.js";
import Collider from "../../engine/components/Collider.js";
import SelectBehavior from "../../game/behaviors/SelectBehavior.js"
import TextComponent from "../../engine/components/TextComponent.js";

export default class textNapsterBehavior extends Base.Behavior {
    peons = []
    selected = false;
    start() {
        //this.peons = [];
    }
    update() {
        if(Input.mouseButtons[0])
        {
            this.select(Input.mouseX, Input.mouseY)
        }
        else
        {
            this.mouseOver(Input.mouseX, Input.mouseY)
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
                that.selected = collisions[0].gameObject;           
            }
        })
        return false;
    }

    mouseOver(x, y)
    {
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
                collisions[0].gameObject.getComponent(TextComponent).color = "cyan";           
            }
        })
    }
}