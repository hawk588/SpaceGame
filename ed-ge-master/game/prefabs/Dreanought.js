import Components from "../../engine/Components.js"
import Base from "../../engine/Base.js"
import FiringArcBehavior from "../../game/behaviors/FiringArcBehavior.js";
import SelectBehavior from "../../game/behaviors/SelectBehavior.js";
import ShipMovementBehavior from "../../game/behaviors/ShipMovementBehavior.js";


export default class Dreadnought extends Base.GameObject {
  constructor(x, y) {
    super(x, y, 1);
    let rectangleComponent = new Components.RectangleComponent(30, 80, "red", "blue");
    let rectangleCollider = new Components.RectangleCollider(30, 80);
    let arcComponent = new Components.ArcComponent(500, "rgba(255, 192, 203, 0)", "blue", - Math.PI / 24, Math.PI / 24);
    let firingArcBehavior = new FiringArcBehavior();
    let selectBehavior = new SelectBehavior();
    let shipMovementBehavior = new ShipMovementBehavior(1, .01);
    let arcCollider = new Components.ArcCollider(500, - Math.PI / 24, Math.PI / 24);
    let health = new Components.HealthAndDamage(200, 30, 80, 200, 100, 20, 20);
    this.addComponent(rectangleComponent);
    this.addComponent(arcComponent);
    this.addComponent(firingArcBehavior);
    this.addComponent(selectBehavior);
    this.addComponent(shipMovementBehavior);
    this.addComponent(rectangleCollider);
    this.addComponent(arcCollider);
    this.addComponent(health);

  }

}