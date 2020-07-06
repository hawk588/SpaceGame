import Collider from "./Collider.js"


export default class ArcCollider extends Collider{
    constructor(radius, beginningAngle, endingAngle){
        super();
        this.radius = radius;
        this.beginningAngle = beginningAngle;
        this.endingAngle = endingAngle;
    }

}