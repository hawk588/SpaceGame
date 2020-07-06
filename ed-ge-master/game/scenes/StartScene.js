import Engine from "../../engine/Engine.js"
import Components from "../../engine/Components.js";
import GameObjects from "../GameObjects.js"
import GameBehaviors from "../GameBehaviors.js";
import textNapster from "../prefabs/textNapster.js";
import textNapsterBehavior from "../behaviors/textNapsterBehavior.js";


export default class StartScene extends Engine.Base.Scene {
  constructor() {
    super("StartScene");

    let startTextOne = new GameObjects.Text(250, 100, "40pt Times", "yellow");
    startTextOne.getComponent(Engine.Components.TextComponent).text = "Space Game";
    this.children.push(startTextOne); 

    let startTextTwo = new GameObjects.Text(350, 200, "30pt Times", "yellow");
    startTextTwo.getComponent(Engine.Components.TextComponent).text = "Start";
    this.children.push(startTextTwo);
     
    let rectangleCollider = new Components.RectangleCollider(200, 50);
    startTextTwo.addComponent(rectangleCollider); 

    let startTextThree = new GameObjects.Text(340, 300, "30pt Times", "yellow");
    startTextThree.getComponent(Engine.Components.TextComponent).text = "Demo";
    this.children.push(startTextThree);
     
    let rectangleCollider2 = new Components.RectangleCollider(200, 50);
    startTextThree.addComponent(rectangleCollider2); 

    let napster = new textNapster();
    let napsterBehavior = napster.getComponent(textNapsterBehavior);
    napsterBehavior.peons.push(startTextTwo);
    napsterBehavior.peons.push(startTextThree);
    this.addChildren(napster);
    
    let startSceneInputListener = new GameBehaviors.StartSceneInputListener(napsterBehavior);
    this.children.push(startSceneInputListener);


  }
}