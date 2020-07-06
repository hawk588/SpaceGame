import Engine from "../../engine/Engine.js"
import Components from "../../engine/Components.js";
import GameObjects from "../GameObjects.js"
import GameBehaviors from "../GameBehaviors.js";
import textNapster from "../prefabs/textNapster.js";
import textNapsterBehavior from "../behaviors/textNapsterBehavior.js";


export default class WinScene extends Engine.Base.Scene {
  constructor() {
    super("WinScene");

    let startTextOne = new GameObjects.Text(100, 100, "40pt Times", "yellow");
    startTextOne.getComponent(Engine.Components.TextComponent).text = "You Killed All of the Enemy Ships!";
    this.children.push(startTextOne); 

    let startTextTwo = new GameObjects.Text(350, 200, "30pt Times", "yellow");
    startTextTwo.getComponent(Engine.Components.TextComponent).text = "Play Again?";
    this.children.push(startTextTwo);
     
    let rectangleCollider = new Components.RectangleCollider(400, 50);
    startTextTwo.addComponent(rectangleCollider); 

    let napster = new textNapster();
    let napsterBehavior = napster.getComponent(textNapsterBehavior);
    napsterBehavior.peons.push(startTextTwo);
    this.addChildren(napster);
    
    let startSceneInputListener = new GameBehaviors.StartSceneInputListener(napsterBehavior);
    this.children.push(startSceneInputListener);


  }
}