import Components from "../../engine/Components.js"
import Base from "../../engine/Base.js"
import FiringArcBehavior from "../../game/behaviors/FiringArcBehavior.js";
import SelectBehavior from "../../game/behaviors/SelectBehavior.js";
import ShipMovementBehavior from "../../game/behaviors/ShipMovementBehavior.js";


export default class BattleShip extends Base.GameObject {
  constructor(x, y) {
    super(x, y, 1);
    let rectangleComponent = new Components.RectangleComponent(50, 70, "red", "blue");
    let rectangleCollider = new Components.RectangleCollider(50, 70);
    let arcComponent = new Components.ArcComponent(150, "rgba(255, 192, 203, 0)", "blue", 0, Math.PI * 2);
    let firingArcBehavior = new FiringArcBehavior();
    let selectBehavior = new SelectBehavior();
    let shipMovementBehavior = new ShipMovementBehavior(2, .05);
    let arcCollider = new Components.ArcCollider(150, 0, Math.PI * 2);
    let health = new Components.HealthAndDamage(1000, 50, 70, 10, 15, 5, 4, 3);
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