import Components from "../../engine/Components.js"
import Base from "../../engine/Base.js"
import FiringArcBehavior from "../../game/behaviors/FiringArcBehavior.js";
import SelectBehavior from "../../game/behaviors/SelectBehavior.js";
import ShipMovementBehavior from "../../game/behaviors/ShipMovementBehavior.js";


export default class Frigate extends Base.GameObject {
  constructor(x, y) {
    super(x, y, 1);
    let rectangleComponent = new Components.RectangleComponent(20, 40, "red", "blue");
    let rectangleCollider = new Components.RectangleCollider(20, 40);
    let arcComponent = new Components.ArcComponent(100, "rgba(255, 192, 203, 0)", "blue", Math.PI/3, 2 * Math.PI/3);
    let arcComponent2 = new Components.ArcComponent(100, "rgba(255, 192, 203, 0)", "blue", 4 * Math.PI/3, 5 * Math.PI/3);
    let firingArcBehavior = new FiringArcBehavior();
    let selectBehavior = new SelectBehavior();
    let shipMovementBehavior = new ShipMovementBehavior(10, .1);
    let arcCollider = new Components.ArcCollider(100,  Math.PI/3, 2 * Math.PI/3);
    let arcCollider2 = new Components.ArcCollider(100, 4 * Math.PI/3, 5 * Math.PI/3);
    let health = new Components.HealthAndDamage(300, 20, 40, 5, 10, 5, 2);
    this.addComponent(rectangleComponent);
    this.addComponent(arcComponent);
    this.addComponent(arcComponent2);
    this.addComponent(firingArcBehavior);
    this.addComponent(selectBehavior);
    this.addComponent(shipMovementBehavior);
    this.addComponent(rectangleCollider);
    this.addComponent(arcCollider);
    this.addComponent(arcCollider2);
    this.addComponent(health);

  }

}