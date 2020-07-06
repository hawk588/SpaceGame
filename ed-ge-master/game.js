import Engine from "./engine/Engine.js"
import Scenes from "./game/Scenes.js"
import SceneManager from "./game/SceneManager.js"



let sceneOne = new Scenes.SceneOne();
let sceneTwo = new Scenes.SceneTwo();
let sceneTwoB = new Scenes.SceneTwoB();
let sceneStrategyScene = new Scenes.StrategyScene();
let startScene = new Scenes.StartScene();
let collisionScene = new Scenes.CollisionScene();
let shipTestScene = new Scenes.ShipTestScene();
let winScene = new Scenes.winScene();
let loseScene = new Scenes.loseScene();
let showScene = new Scenes.showScene();

SceneManager.addScene(sceneOne);
SceneManager.addScene(sceneTwo);
SceneManager.addScene(sceneTwoB);
SceneManager.addScene(sceneStrategyScene);
SceneManager.addScene(startScene);
SceneManager.addScene(collisionScene);
SceneManager.addScene(shipTestScene);
SceneManager.addScene(winScene);
SceneManager.addScene(loseScene);
SceneManager.addScene(showScene);
SceneManager.currentScene = "StartScene";


//Setup event handling
document.body.addEventListener('keydown', keydown);
document.body.addEventListener('keyup', keyup);
document.body.addEventListener('keypress', keypress);
document.body.addEventListener('mousedown', mousedown);
document.body.addEventListener('mouseup', mouseup);

let Input = Engine.Base.Input;

function keydown(event) {
    if (Input.keys[event.key] != true)
        Input.down[event.key] = true;
    Input.keys[event.key] = true;
}

function keyup(event) {
    if (Input.keys[event.key] != false)
        Input.up[event.key] = true;
    Input.keys[event.key] = false;
}

function mousedown(event) {
    if (Input.mouseButtons[event.button] != true)
    {
        Input.mouseButtonsDown[event.button] = true;
        //console.log(event.button);
        //console.log(typeof event.button);
        //console.log(Input.mouseButtonsDown);
        Input.mouseX = event.clientX;
        Input.mouseY = event.clientY;
    }    
    Input.mouseButtons[event.button] = true;
}

function mouseup(event) {
    if (Input.mouseButtons[event.button] != false)
        Input.mouseButtonsUp[event.button] = true;
    Input.mouseButtons[event.button] = false;
}

function keypress(event) {
    //console.log(`Modifier keys: Control: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}, Meta Key: ${event.metaKey}`);
}

//Keep our canvas full screen
//from https://blog.codepen.io/2013/07/29/full-screen-canvas/

var can = document.getElementById("canv");

function resizeCanvas() {
  can.style.width = window.innerWidth + "px";
  setTimeout(function() {
    can.style.height = window.innerHeight + "px";
  }, 0);
  can.width = window.innerWidth;
  can.height = window.innerHeight;
};

// Webkit/Blink will fire this on load, but Gecko doesn't.
window.onresize = resizeCanvas;

// So we fire it manually...
resizeCanvas();



let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
    SceneManager.start();
    setInterval(gameLoop, 33);
}

function gameLoop() {
    Input.swapUpDownArrays();
    update();
    draw(ctx);
}

function update() {
    SceneManager.currentScene.update(Engine.Components.Collider, Engine.Components.CollisionHelper);
}

function draw(ctx) {
    for(let i = 0; i < 4; i++)
    {
        SceneManager.currentScene.draw(ctx, canv.width, canv.height, i);
    }    
}

main();

