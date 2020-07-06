import Engine from "../../engine/Engine.js"
import Base from "../../engine/Base.js"
import RectangleBehavior from "./RectangleBehavior.js";
import SelectBehavior from "./SelectBehavior.js";
import Input from "../../engine/base/Input.js";


export default class ShipMovementBehavior extends Base.Behavior{
    //selected = false;
    targetX;
    targetY;
    targetRotation;
    movement = 5;
    rotationRate = .03;
    slopeX = 0;
    slopeY = 0;
    sameClick = false;
    sameClick2 = false;
    aimX;
    aimY;
    turnOffAiming = false;

    constructor(speed, rotationRate)
    {
        super();
        this.movement = speed;
        this.rotationRate = rotationRate;

    }
    start(){
        this.targetX = this.gameObject.x;
        this.targetY = this.gameObject.y;
        this.targetRotation = this.gameObject.rotation;
        
        console.log("Ship");
        
    }
    update(){

        if(this.gameObject.getComponent(SelectBehavior).selected)
        {
            
            if(Input.mouseButtons[0] && !this.sameClick)
            {
                this.targetX = Input.mouseX;
                this.targetY = Input.mouseY;
                this.gameObject.getComponent(SelectBehavior).selected = false;
                this.slopeY = this.targetY - this.gameObject.y;
                this.slopeX = this.targetX - this.gameObject.x;
                if(this.targetX < this.gameObject.x)
                {
                    this.targetRotation = Math.atan(this.slopeY / this.slopeX) - Math.PI / 2;
                }
                else{
                    this.targetRotation = Math.atan(this.slopeY / this.slopeX) + Math.PI / 2;
                }
                this.targetRotation %= (Math.PI * 2);
                if(this.targetRotation > Math.PI + this.gameObject.rotation)
                {
                    this.targetRotation = -(Math.PI * 2) + this.targetRotation;

                }
                else if(this.targetRotation < -Math.PI + this.gameObject.rotation)
                {
                    this.targetRotation = (Math.PI * 2) + this.targetRotation;
                }    
                this.sameClick = true;
    
            }
            else if(Input.mouseButtons[2])
            {
                this.aimX = Input.mouseX;
                this.aimY = Input.mouseY;
                this.targetX = this.gameObject.x;
                this.targetY = this.gameObject.y;
                this.slopeY = this.aimY - this.gameObject.y;
                this.slopeX = this.aimX - this.gameObject.x;
                if(this.aimX < this.gameObject.x)
                {
                    this.targetRotation = Math.atan(this.slopeY / this.slopeX) - Math.PI / 2;
                }
                else{
                    this.targetRotation = Math.atan(this.slopeY / this.slopeX) + Math.PI / 2;
                }
                this.targetRotation %= (Math.PI * 2);
                if(this.targetRotation > Math.PI + this.gameObject.rotation)
                {
                    this.targetRotation = -(Math.PI * 2) + this.targetRotation;

                }
                else if(this.targetRotation < -Math.PI + this.gameObject.rotation)
                {
                    this.targetRotation = (Math.PI * 2) + this.targetRotation;
                }
                this.turnOffAiming = true;    
            }
            else if(!Input.mouseButtons[0])
            {
                this.sameClick = false;
            }
            if(this.turnOffAiming && !Input.mouseButtons[2])
            {
                this.gameObject.getComponent(SelectBehavior).selected = false;
                this.turnOffAiming = false;
            }
        }
        else
        {
            this.sameClick = true;
        }
        this.slopeY = this.targetY - this.gameObject.y;
        this.slopeX = this.targetX - this.gameObject.x;
        

        
        
        
        if(this.gameObject.rotation != this.targetRotation)
        {
            this.gameObject.rotation = this.gameObject.rotation % (Math.PI * 2);
            this.targetRotation = this.targetRotation % (Math. PI * 2);
            if(this.gameObject.rotation > this.targetRotation){
                if(this.gameObject.rotation - this.targetRotation < this.rotationRate)
                {
                    this.gameObject.rotation = this.targetRotation;
                }
                else{
                    this.gameObject.rotation -= this.rotationRate;
                }
            
        }
            else{
                if(this.targetRotation - this.gameObject.rotation < this.rotationRate)
                {
                    this.gameObject.rotation = this.targetRotation;
                }
                else{
                    this.gameObject.rotation += this.rotationRate;
                }
            
            }
        }    
        //Rotate
        //if(this.targetX >= this.gameObject.x)
        //{
            //this.targetRotation += Math.PI;
            
        //}
        //this.targetRotation -= Math.PI / 2;

        //Move
        else if(this.targetX != this.gameObject.x && this.gameObject.y != this.targetY)
        {
            let distance = Math.sqrt(this.slopeX * this.slopeX + this.slopeY * this.slopeY);
            
            if(distance < this.movement)
            {
                this.gameObject.x = this.targetX;
                this.gameObject.y = this.targetY;
            }
            else{
                this.gameObject.x += (this.movement / distance) * this.slopeX;
                this.gameObject.y += (this.movement / distance) * this.slopeY;
            }
        }   
        
    }
}