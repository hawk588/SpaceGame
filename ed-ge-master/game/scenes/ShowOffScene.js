import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import Behaviors from "../GameBehaviors.js"
import GameBehaviors from "../GameBehaviors.js";
import CountDownTimer from "../behaviors/CountDownTimer.js";
import GameObject from "../../engine/base/GameObject.js";
import CollisionDot from "../prefabs/CollisionDot.js";
import CollisionCircle from "../prefabs/CollisionCircle.js";
import Frigate from "../prefabs/Frigate.js";
import Napster from "../prefabs/Napster.js"
import NapsterBehavior from "../behaviors/NapsterBehavior.js";
import Cruiser from "../prefabs/Cruiser.js";
import AICruiser from "../prefabs/AICruiser.js";
import Dreadnought from "../prefabs/Dreanought.js";
import BattleShip from "../prefabs/BattleShip.js";
import AIFrigate from "../prefabs/AIFrigate.js";
import AIDreadnought from "../prefabs/AIDreadnought.js";
import AIBattleShip from "../prefabs/AIBattleShip.js";
import AIManager from "../behaviors/AIManager.js";

export default class ShowOffScene extends Engine.Base.Scene{
  constructor(){
    super("ShowOffScene");
    let napster = new Napster();

    this.addChildren(napster);
    
    let cruiser1 = new Cruiser(175, 650);
    
    this.addChildren(cruiser1);
    

    let frigate7 = new AIFrigate(100, 75);
    
    this.addChildren(frigate7);
    
    
    let napsterBehavior = napster.getComponent(NapsterBehavior);
    
    napsterBehavior.peons.push(cruiser1);

    let gameSceneListener = new GameBehaviors.GameSceneListener(this.children);
    this.children.push(gameSceneListener);

    let manager = new GameObject(0,0);
    manager.addComponent(new AIManager());
    this.addChildren(manager);

    


    
    
  }

  reboot()
  {
    this.children = [];
    
    let napster = new Napster();

    this.addChildren(napster);
    
    let cruiser1 = new Cruiser(175, 650);
    
    this.addChildren(cruiser1);
    

    let frigate7 = new AIFrigate(100, 75);
    
    this.addChildren(frigate7);
    
    
    let napsterBehavior = napster.getComponent(NapsterBehavior);
    
    napsterBehavior.peons.push(cruiser1);

    let gameSceneListener = new GameBehaviors.GameSceneListener(this.children);
    this.children.push(gameSceneListener);

    let manager = new GameObject(0,0);
    manager.addComponent(new AIManager());
    this.addChildren(manager);

    this.start();
  }
}