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

export default class ShipTestScene extends Engine.Base.Scene{
  constructor(){
    super("ShipTestScene");
    let napster = new Napster();

    this.addChildren(napster);
    let frigate1 = new Frigate(100, 650);
    let frigate2 = new Frigate(175, 575);
    let frigate3 = new Frigate(250, 500);
    let frigate4 = new Frigate(400, 500);
    let frigate5 = new Frigate(475, 575);
    let frigate6 = new Frigate(550, 650);
    let cruiser1 = new Cruiser(175, 650);
    let cruiser2 = new Cruiser(250, 575);
    let cruiser3 = new Cruiser(400, 575);
    let cruiser4 = new Cruiser(475, 650);
    let dreadnought = new Dreadnought(325, 650);
    let battleShip = new BattleShip(325, 475);
    this.addChildren(frigate1);
    this.addChildren(frigate2);
    this.addChildren(frigate3);
    this.addChildren(frigate4);
    this.addChildren(frigate6);
    this.addChildren(frigate5);
    this.addChildren(cruiser1);
    this.addChildren(cruiser2);
    this.addChildren(cruiser4);
    this.addChildren(cruiser3);
    this.addChildren(dreadnought);
    this.addChildren(battleShip);

    let frigate7 = new AIFrigate(100, 75);
    let frigate8 = new AIFrigate(175, 150);
    let frigate9 = new AIFrigate(250, 225);
    let frigate10 = new AIFrigate(400, 225);
    let frigate11 = new AIFrigate(475, 150);
    let frigate12 = new AIFrigate(550, 75);
    let cruiser5 = new AICruiser(175, 75);
    let cruiser6 = new AICruiser(250, 150);
    let cruiser7 = new AICruiser(400, 150);
    let cruiser8 = new AICruiser(475, 75);
    let dreadnought1 = new AIDreadnought(325, 75);
    dreadnought1.rotation = -Math.PI;
    let battleShip1 = new AIBattleShip(325, 250);
    this.addChildren(frigate7);
    this.addChildren(frigate8);
    this.addChildren(frigate9);
    this.addChildren(frigate10);
    this.addChildren(frigate11);
    this.addChildren(frigate12);
    this.addChildren(cruiser5);
    this.addChildren(cruiser6);
    this.addChildren(cruiser7);
    this.addChildren(cruiser8);
    this.addChildren(dreadnought1);
    this.addChildren(battleShip1);
    
    let napsterBehavior = napster.getComponent(NapsterBehavior);
    napsterBehavior.peons.push(frigate1);
    napsterBehavior.peons.push(frigate2);
    napsterBehavior.peons.push(frigate3);
    napsterBehavior.peons.push(frigate4);
    napsterBehavior.peons.push(frigate5);
    napsterBehavior.peons.push(frigate6);
    napsterBehavior.peons.push(cruiser1);
    napsterBehavior.peons.push(cruiser2);
    napsterBehavior.peons.push(cruiser3);
    napsterBehavior.peons.push(cruiser4);
    napsterBehavior.peons.push(dreadnought);
    napsterBehavior.peons.push(battleShip);

    let manager = new GameObject(0,0);
    manager.addComponent(new AIManager());
    this.addChildren(manager);

    let gameSceneListener = new GameBehaviors.GameSceneListener(this.children);
    this.children.push(gameSceneListener);

    


    
    
  }

  reboot()
  {
    this.children = [];
    
    let napster = new Napster();

    this.addChildren(napster);
    let frigate1 = new Frigate(100, 650);
    let frigate2 = new Frigate(175, 575);
    let frigate3 = new Frigate(250, 500);
    let frigate4 = new Frigate(400, 500);
    let frigate5 = new Frigate(475, 575);
    let frigate6 = new Frigate(550, 650);
    let cruiser1 = new Cruiser(175, 650);
    let cruiser2 = new Cruiser(250, 575);
    let cruiser3 = new Cruiser(400, 575);
    let cruiser4 = new Cruiser(475, 650);
    let dreadnought = new Dreadnought(325, 650);
    let battleShip = new BattleShip(325, 475);
    this.addChildren(frigate1);
    this.addChildren(frigate2);
    this.addChildren(frigate3);
    this.addChildren(frigate4);
    this.addChildren(frigate6);
    this.addChildren(frigate5);
    this.addChildren(cruiser1);
    this.addChildren(cruiser2);
    this.addChildren(cruiser4);
    this.addChildren(cruiser3);
    this.addChildren(dreadnought);
    this.addChildren(battleShip);

    let frigate7 = new AIFrigate(100, 75);
    let frigate8 = new AIFrigate(175, 150);
    let frigate9 = new AIFrigate(250, 225);
    let frigate10 = new AIFrigate(400, 225);
    let frigate11 = new AIFrigate(475, 150);
    let frigate12 = new AIFrigate(550, 75);
    let cruiser5 = new AICruiser(175, 75);
    let cruiser6 = new AICruiser(250, 150);
    let cruiser7 = new AICruiser(400, 150);
    let cruiser8 = new AICruiser(475, 75);
    let dreadnought1 = new AIDreadnought(325, 75);
    dreadnought1.rotation = -Math.PI;
    let battleShip1 = new AIBattleShip(325, 250);
    this.addChildren(frigate7);
    this.addChildren(frigate8);
    this.addChildren(frigate9);
    this.addChildren(frigate10);
    this.addChildren(frigate11);
    this.addChildren(frigate12);
    this.addChildren(cruiser5);
    this.addChildren(cruiser6);
    this.addChildren(cruiser7);
    this.addChildren(cruiser8);
    this.addChildren(dreadnought1);
    this.addChildren(battleShip1);
    
    let napsterBehavior = napster.getComponent(NapsterBehavior);
    napsterBehavior.peons.push(frigate1);
    napsterBehavior.peons.push(frigate2);
    napsterBehavior.peons.push(frigate3);
    napsterBehavior.peons.push(frigate4);
    napsterBehavior.peons.push(frigate5);
    napsterBehavior.peons.push(frigate6);
    napsterBehavior.peons.push(cruiser1);
    napsterBehavior.peons.push(cruiser2);
    napsterBehavior.peons.push(cruiser3);
    napsterBehavior.peons.push(cruiser4);
    napsterBehavior.peons.push(dreadnought);
    napsterBehavior.peons.push(battleShip);

    let manager = new GameObject(0,0);
    manager.addComponent(new AIManager());
    this.addChildren(manager);

    let gameSceneListener = new GameBehaviors.GameSceneListener(this.children);
    this.children.push(gameSceneListener);

    this.start();
  }
}