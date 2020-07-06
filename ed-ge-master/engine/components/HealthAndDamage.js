import Base from "../Base.js"
import RectangleComponent from "./RectangleComponent.js";
import RectangleCollider from "./RectangleCollider.js";
import ArcCollider from "./ArcCollider.js";
import Collider from "./Collider.js";


export default class HealthAndDamage extends Base.Component{
    
    health;
    maxHealth;
    squares;
    squaresDamaged;
    width;
    height;
    drawLevel;
    damage;
    fireRate;
    fireRateTracker;
    fireTime;
    fireTimeTracker;
    beamWidth;
    targets;
    maxTargets;
    targetGoal;
    hitBy;
    hitByDelay;
    aiming;

    constructor(health, width, height, damage, fireRate, fireTime, beamWidth, maxTargets = 1){
        super();
        this.health = health;
        this.maxHealth = health;
        this.squaresDamaged = 0;
        this.width = width;
        this.height = height;
        this.squares = new Array(this.width/5 * this.height/5).fill(0);
        this.drawLevel = 2;
        this.damage = damage;
        this.fireRate = fireRate;
        this.fireRateTracker = 0;
        this.fireTime = fireTime;
        this.fireTimeTracker = 0;
        this.beamWidth = beamWidth;
        this.targets = [];
        this.maxTargets = maxTargets;
        this.hitBy = [];
    }
    draw(ctx, drawLevel = 3){
        if(drawLevel == 1 && this.fireTimeTracker != 0)
        {
            for(let i = 0; i < this.targets.length; i++)
            {
                this.drawLaser(ctx, this.targets[i]);
            }
            this.targets = [];
        }
        if(this.drawLevel == drawLevel)
        {   
            ctx.save();
            let y0 = -(this.height / ((this.height - this.width) / 10));
            for(let i = 0; i < this.squares.length; i++)
            {
                if(this.squares[i] == 1)
                {
                    ctx.fillStyle = "Black";
                    let y = (i % (this.height / 5)) * 5 - (this.height / 2);
                    let x = (i / (this.height / 5)) * 5 - (.1 * (y - y0))- (this.width / 2)
                    
                    ctx.fillRect( x , y, 5, 5);
                }
            }
            
            
            ctx.restore();
        }    
    }
    update(){
        let size = this.squares.length;
        let squaresSupposedDamaged = Math.floor(((1 - (this.health / this.maxHealth)) * size) / 2);
        this.hitBy = this.hitByDelay;
        this.hitByDelay = [];
        if(this.fireRateTracker == 0 && this.targets.length > 0)
        {
            this.fireTimeTracker = this.fireTime;
            this.fireRateTracker = -1;
            this.aiming = [];        
            
            for(let i = 0; i < this.targets.length; i++)
            {
                this.targets[i].health -= this.damage;
                this.aiming.push(this.targets[i]);
            }    
           
        }
        else if(this.fireRateTracker == 0)
        {
            this.aiming = [];
        } 
        if(squaresSupposedDamaged > this.squaresDamaged)
        {
            this.damageSquares(squaresSupposedDamaged - this.squaresDamaged);
            this.squaresDamaged = squaresSupposedDamaged;
        }
        else if(squaresSupposedDamaged < this.squaresDamaged)
        {
            this.repairSquare(this.squaresDamaged - squaresSupposedDamaged);
            this.squaresDamaged = squaresSupposedDamaged;
        }
        if(this.health <= 0)
        {
            this.death();
        }
        if(this.fireTimeTracker > 0)
        {
            this.fireTimeTracker--;
        }
        else if(this.fireTimeTracker == 0 && this.fireRateTracker < 0)
        {
            this.fireRateTracker = this.fireRate;
        }
        else if(this.fireRateTracker != 0)
        {
            this.fireRateTracker--;
        }


    }

    damageSquares(num)
    {
        if(this.squaresDamaged + num >= this.squares.length / 2)
        {
            return false;
        }
        for(let i = 0; i < num; i)
        {
            let square = Math.round(Math.random() * this.squares.length);
            if(this.squares[square] == 0)
            {
                this.squares[square] = 1;
                i++;
            }
        }
    }

    repairSquare(num)
    {
        let numRepaired = 0;
        for(let i = 0; i < num; i++)
        {
            if(this.squares[i] == 1)
            {
                this.squares[i] == 0;
                numRepaired++;
            }
            if(numRepaired >= num)
            {
                break;
            }
        }
    }

    onCollisionStay(enemy)
    {
        if(enemy.collider instanceof RectangleCollider)
        {
            let health = enemy.gameObject.getComponent(HealthAndDamage)
            if(health)
            {
                if(enemy.gameObject == this.targetGoal)
                {
                    this.targets = [this.targetGoal.getComponent(HealthAndDamage)];
                    health.hitByDelay.push(this);
                }
                else if(this.targets.length < this.maxTargets)
                {
                    this.targets.push(health);
                    health.hitByDelay.push(this);
                }
                    
            }
        }    
    }

    death()
    {
        let index = this.gameObject.parent.children.indexOf(this.gameObject);
        this.gameObject.parent.children.splice(index, 1);
    }

    setTarget(enemy)
    {
        this.targetGoal = enemy;
    }

    drawLaser(ctx, target)
    {
        //console.log("draw");
        let aim = target.gameObject;
        /*let slopeX = aim.x - this.gameObject.x;
        let slopeY = aim.y - this.gameObject.y;
        let distance = this.beamWidth / 2;
        ctx.save();
        ctx.beginPath();
        let angle = Math.atan2(slopeY, slopeX) + Math.PI / 2;
        let beamX = Math.cos(angle) * distance;
        let beamY = Math.sin(angle) * distance;
        ctx.moveTo(beamX, beamY);
        ctx.lineTo(aim.x - this.gameObject.x + beamX, aim.y - this.gameObject.y  + beamY);
        ctx.lineTo(aim.x - this.gameObject.x - beamX, aim.y - this.gameObject.y  - beamY);
        ctx.lineTo(-beamX, -beamY);
        ctx.lineTo(beamX, beamY);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.restore();*/
        ctx.save();
        let rotation = this.gameObject.rotation;
        ctx.rotate(-rotation);
        //this.gameObject.rotate(-rotation);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineWidth = this.beamWidth;
        let x = aim.x - this.gameObject.x;
        let y = aim.y - this.gameObject.y;
        ctx.lineTo(x, y);
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.restore();
        //this.gameObject.rotate(rotation);

        
    }
}