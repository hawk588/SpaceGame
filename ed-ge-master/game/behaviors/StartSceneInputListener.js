import Engine from "../../engine/Engine.js"
import SceneManager from "./../SceneManager.js"
import Scenes from "./../Scenes.js";
import Scene from "../../engine/base/Scene.js";
import TextComponent from "../../engine/components/TextComponent.js";

export default class StartSceneInputListener extends Engine.Base.Behavior {
    
    napster;
    
    constructor(napster)
    {
        super();
        this.napster = napster;

    }
    
    start() {

    }
    update() {

        if(this.napster.selected)
        {  
            if(this.napster.selected.getComponent(TextComponent).text == "Demo")
            {
                SceneManager.currentScene = "ShowOffScene";
                SceneManager.currentScene.reboot();
                this.napster.selected = false;
            }
            else
            {
                

                SceneManager.currentScene = "ShipTestScene";
                SceneManager.currentScene.reboot();
                this.napster.selected = false;
            }    
        }

    }
}