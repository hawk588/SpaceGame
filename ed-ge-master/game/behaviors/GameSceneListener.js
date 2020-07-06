import Engine from "../../engine/Engine.js"
import SceneManager from "./../SceneManager.js"

export default class GameSceneListener extends Engine.Base.Behavior {
    
    objects;
    hasPlayer1;
    hasPlayer2;


    constructor(objects)
    {
        super();
        this.objects = objects;
    }
    
    start() {

    }
    update() {
        
        this.hasPlayer1 = false;
        this.hasPlayer2 = false;

        for(let i = 0; i < this.objects.length; i++)
        {
            if(!this.hasPlayer1 && this.objects[i].player == 1)
            {
                this.hasPlayer1 = true;
            }
            if(!this.hasPlayer2 && this.objects[i].player == 2)
            {
                this.hasPlayer2 = true;
            }
        }
        if(!this.hasPlayer1)
        {
            SceneManager.currentScene = "LoseScene";
        }
        if(!this.hasPlayer2)
        {
            SceneManager.currentScene = "WinScene";
        }

    }
}