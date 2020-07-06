import Components from "../../engine/Components.js"
import Base from "../../engine/Base.js"
import FiringArcBehavior from "../behaviors/FiringArcBehavior.js";
import SelectBehavior from "../behaviors/SelectBehavior.js";
import ShipMovementBehavior from "../behaviors/ShipMovementBehavior.js";
import AIShipMovementBehavior from "../behaviors/AIShipMovementBehavior.js";


export default class AIBattleShip extends Base.GameObject {
  constructor(x, y) {
    super(x, y, 2);
    let rectangleComponent = new Components.RectangleComponent(50, 70, "blue", "blue");
    let rectangleCollider = new Components.RectangleCollider(50, 70);
    //let arcComponent = new Components.ArcComponent(250, "pink", "blue", Math.PI/3, 2 * Math.PI/3);
    //let arcComponent2 = new Components.ArcComponent(250, "pink", "blue", 4 * Math.PI/3, 5 * Math.PI/3);
    //let firingArcBehavior = new FiringArcBehavior();
    //let selectBehavior = new SelectBehavior();
    let shipMovementBehavior = new AIShipMovementBehavior(2, .05);
    let arcCollider = new Components.ArcCollider(150, 0, Math.PI * 2);
    let health = new Components.HealthAndDamage(1000, 50, 70, 10, 15, 5, 4, 3);
    this.addComponent(rectangleComponent);
    //this.addComponent(arcComponent);
    //this.addComponent(arcComponent2);
    //this.addComponent(firingArcBehavior);
    //this.addComponent(selectBehavior);
    this.addComponent(shipMovementBehavior);
    this.addComponent(rectangleCollider);
    this.addComponent(arcCollider);
    this.addComponent(health);
    this.rotation = (- Math.PI);

  }

}