import Base from "../../engine/Base.js"
import TileBehavior from "./TileBehavior.js";
import CollisionHelper from "../../engine/components/CollisionHelper.js";
import GameObject from "../../engine/base/GameObject.js";
import PointCollider from "../../engine/components/PointCollider.js";
import Input from "../../engine/base/Input.js";
import Collider from "../../engine/components/Collider.js";
import SelectBehavior from "../../game/behaviors/SelectBehavior.js"
import Prefabs from "../../game/GameObjects.js";
import Behaviors from "../../game/GameBehaviors.js";
import Components from "../../engine/Components.js";

export default class AIManager extends Base.Behavior {
    peons = []
    playerUnits = []
    selected = 0;
    exposedUnits = [];
    numUnits = 0;
    updateCounter = 0;
    frigateTargetValue = 1;
    cruiserTargetValue = 2;
    DreadnoughtTargetValue = 4;
    battleShipTargetValue = 3;
    notBusy = [];
    assist = [];
    oldAssist = [];
    enemies = [];
    oldEnemies = [];
    enemiesTimer = [];
    marshalled = false;
    marshallPrep = false;



    start() {
        this.numUnits = this.gameObject.parent.children.length;
        for(let i = 0; i < this.numUnits; i++)
        {
            if(this.gameObject.parent.children[i] instanceof Prefabs.AICruiser || this.gameObject.parent.children[i] instanceof Prefabs.AIFrigate ||  this.gameObject.parent.children[i] instanceof Prefabs.AIDreadnought || this.gameObject.parent.children[i] instanceof Prefabs.AIBattleShip)
            {
                this.peons.push(this.gameObject.parent.children[i]);
            }
            else if(this.gameObject.parent.children[i] instanceof Prefabs.Cruiser || this.gameObject.parent.children[i] instanceof Prefabs.Frigate ||  this.gameObject.parent.children[i] instanceof Prefabs.Dreadnought || this.gameObject.parent.children[i] instanceof Prefabs.BattleShip)
            {
                this.playerUnits.push(this.gameObject.parent.children[i]);
            }
        }
    }
    update() {
        this.notBusy = [];
        this.oldAssist = this.assist;
        this.assist = [];
        this.oldEnemies = this.enemies;
        this.enemies = [];
        if(this.numUnits != this.gameObject.parent.children.length)
        {
            this.updateUnitCount();
        }
        if(this.playerUnits.length == 0)
        {
            this.updateCounter = 1;
        }
        if(this.updateCounter == 0)
        {
            for(let i = 0; i < this.peons.length; i++)
            {
                //this.currentTargets(this.peons[i]);
                this.findExposed(this.peons[i], this.playerUnits);
            }
            for(let i = 0; i < this.peons.length; i++)
            {
                let badBoys = this.beingHit(this.peons[i])
                if(badBoys.length > 0)
                {
                    this.assist.push(this.peons[i]);
                }
            }
            for(let i = 0; i < this.playerUnits.length; i++)
            {
                let health = this.playerUnits[i].getComponent(Components.HealthAndDamage)
                for(let j = 0; j < health.aiming.length; j++)
                {
                    this.enemies.push(health.aiming[j]);
                }    
            }
            if(this.assist.length != this.oldAssist.length && this.oldEnemies.length != this.enemies.length)
            {
                if(this.assist.length > 0)
                {
                        let score = 0;
                        let index = 0;
                        let highestTarget;
                        for(let j = 0; j < this.assist.length; j++)
                        {
                            let badBoys = this.beingHit(this.assist[j]);
                            let newScore = 0;
                            let newHighest = 0;
                            let highest = 0;
                            let highIndex = 0;
                            for(let k = 0; k < badBoys.length; k++)
                            {
                                newHighest = this.getValue(badBoys[k].gameObject);
                                newScore += newHighest;
                                if(newHighest > highest)
                                {
                                    highest = newHighest;
                                    highIndex = k;
                                }
                            }
                            if(newScore > score)
                            {
                                score = newScore;
                                index = j;
                                highestTarget = badBoys[highIndex].gameObject;
                            }
                        }
                        for(let i = 0; i < this.notBusy.length; i++)
                        {
                            this.seekOut(this.notBusy[i], highestTarget);
                        }
                        
                }
            }
            else
            {
                
                    this.marshallPrep = false;
                    let newScore = 0;
                    let newHighest = 0;
                    let highest = 0;
                    let highIndex = 0;
                    for(let k = 0; k < this.playerUnits.length; k++)
                    {
                        newHighest = this.getValue(this.playerUnits[k]);
                        if(newHighest > highest)
                        {
                            highest = newHighest;
                            highIndex = k;
                        }
                    }
                    
                    for(let i = 0; i < this.notBusy.length; i++)
                    {
                        this.seekOut(this.notBusy[i], this.playerUnits[highIndex]);
                    }
                
                 
            }    
            for(let i = 0; i < this.peons.length; i++)
            {
                this.keepOnScreen(this.peons[i]);
            }
            this.updateCounter = 1;
        }
        this.updateCounter--;    
    }

    marshall(lazyBoyz)
    {
        let newScore = 0;
        let newHighest = 0;
        let highest = 0;
        let highIndex = 0;
        for(let k = 0; k < this.playerUnits.length; k++)
        {
            newHighest = this.getValue(this.playerUnits[k]);
            if(newHighest > highest)
            {
                highest = newHighest;
                highIndex = k;
            }
        }

        for(let i = 0; i < this.lazyBoyz.length; i++)
                    {
                        this.seekOutPrep(this.lazyBoyz[i], this.playerUnits[highIndex]);
                    }
    }    


    seekOut(agent, target)
    {
        let arc = agent.getComponent(Components.ArcCollider);
        let movement = agent.getComponent(Behaviors.AIShipMovementBehavior);
        if(movement.targetX == agent.x && movement.targetY == agent.y)
        {
            let point = this.generatePoint(agent, target, arc.radius);
            movement.targetX = point[0] + target.x;
            movement.targetY = point[1] + target.y;
        }    
        
    }

    seekOutPrep(agent, target)
    {
        let arc = agent.getComponent(Components.ArcCollider);
        let movement = agent.getComponent(Behaviors.AIShipMovementBehavior);
        if(movement.targetX == agent.x && movement.targetY == agent.y)
        {
            let point = this.generatePoint(agent, target, arc.radius);
            movement.setRotation(point[0], point[1]);
        }   
    }

    beingHit(agent)
    {
        let health = agent.getComponent(Components.HealthAndDamage);
        return health.hitBy;
    }

    keepOnScreen(agent)
    {
        let move = agent.getComponent(Behaviors.AIShipMovementBehavior)
        if(move.targetX < 0)
        {
            move.targetX = 0;
        }
        if(move.targetY < 0)
        {
            move.targetY = 0;
        }
        if(move.targetY > 800)
        {
            move.targetY = 800;
        }

    }
    
    currentTargets(agent)
    {
        if(agent.getComponent(Components.HealthAndDamage).targets.length > 0)
        {

        }
    }

    findSupport()
    {

    }

    findExposed(agent, playerUnits)
    {
        let arc = agent.getComponent(Components.ArcCollider);
        let movement = agent.getComponent(Behaviors.AIShipMovementBehavior);
        let index = -1;
        let value = 0;
        for(let i = 0 ; i < playerUnits.length; i++)
        {
            if(this.distance(agent, playerUnits[i]) <= Math.pow(arc.radius, 2))
            {
                let newValue = this.getValue(playerUnits[i])
                if(newValue > value)
                {
                    value = newValue;
                    index = i;
                }
                
            }
        }
        if(index > -1)
        {
            this.rotateToTarget(agent, playerUnits[index], agent.x, agent.y);
        }    
        else{
            this.notBusy.push(agent);
        }
    }

    getValue(type)
    {
        if(type instanceof Prefabs.Frigate)
        {
            return this.frigateTargetValue;
        }
        else if(type instanceof Prefabs.Cruiser)
        {
            return this.cruiserTargetValue;
        }
        else if(type instanceof Prefabs.BattleShip)
        {
            return this.battleShipTargetValue;
        }
        else if(type instanceof Prefabs.Dreadnought)
        {
            return this.DreadnoughtTargetValue;
        }
    }

    updateUnitCount()
    {
        this.numUnits = this.gameObject.parent.children.length;
        this.peons = [];
        this.playerUnits = [];
        for(let i = 0; i < this.numUnits; i++)
        {
            if(this.gameObject.parent.children[i] instanceof Prefabs.AICruiser || this.gameObject.parent.children[i] instanceof Prefabs.AIFrigate ||  this.gameObject.parent.children[i] instanceof Prefabs.AIDreadnought || this.gameObject.parent.children[i] instanceof Prefabs.AIBattleShip)
            {
                this.peons.push(this.gameObject.parent.children[i]);
            }
            else if(this.gameObject.parent.children[i] instanceof Prefabs.Cruiser || this.gameObject.parent.children[i] instanceof Prefabs.Frigate ||  this.gameObject.parent.children[i] instanceof Prefabs.Dreadnought || this.gameObject.parent.children[i] instanceof Prefabs.BattleShip)
            {
                this.playerUnits.push(this.gameObject.parent.children[i]);
            }
        }
    }

    target(agent, target)
    {
        let movement = agent.getComponent(Behaviors.AIShipMovementBehavior);
        let targetMove = target.getComponent(Behaviors.ShipMovementBehavior);
        let radius = agent.getComponent(Components.ArcCollider).radius;
        radius = radius * radius;
        //let distanceToTarget = Math.pow(agent.x - target.x, 2) + Math.pow(agent.y - target.y, 2);
        let proposedPoints = this.generatePoints(agent, target, radius);
        let lowestIndex = 0;
        let lowestValue = 999;
        let rectangle = agent.getComponent(Components.RectangleComponent);
        for(let i = 0; i < 3; i++)
        {
            let damage = this.canBeHit(proposedPoints[i][0], proposedPoints[i][1], rectangle.width, rectangle.height, this.playerUnits);
            if(this.damage < lowestValue)
            {
                lowestIndex = i;
            }
        }
        movement.targetX = proposedPoints[lowestIndex][0];
        movement.targetY = proposedPoints[lowestIndex][1];
        this.rotateToTarget(agent, target, movement.targetX, movement.targetY);
        
    }

    canBeHit(x, y, width, height, enemies)
    {
        let size = (width + height) / 2;
        let damage = 0;
        for(let i = 0; i < enemies.length; i++)
        {
            let range = Math.pow(enemies[i].getComponent(Components.ArcCollider).radius + size, 2);
            let distance = Math.pow(x - enemies[i].x, 2) + Math.pow(y - enemies[i].y, 2);
            if(distance <= range)
            {
                damage += enemies[i].getComponent(Components.HealthAndDamage).damage;
            }
        }
        return damage;
    }

    rotateToTarget(agent, target, targetX, targetY)
    {
        let arc = agent.getComponent(Components.ArcCollider);
        let idealAngle = (arc.beginningAngle + arc.endingAngle) / 2;
        let tan = Math.atan2(targetY - target.y , targetX - target.x) - Math.PI / 2;
        agent.getComponent(Behaviors.AIShipMovementBehavior).postTargetRotation = tan + idealAngle;
        agent.getComponent(Components.HealthAndDamage).setTarget(target);


    }

    generatePoint(agent, target, agentRadius)
    {
        let randomX = Math.round((Math.random() - .5) * 400);
        let randomY = Math.round((Math.random() - .5) * 400);
        if(target instanceof Prefabs.Frigate || target instanceof Prefabs.Cruiser)
        {
            let random = Math.random() - .5;
            let random2;
            if(random < 0)
            {
                random = -1;
                random2 = -1;
            }
            else
            {
                random = 0;
                random2 = 1;
            }
            
            let rotation = target.rotation + random * Math.PI + ((random2 * Math.PI/3) * Math.random());
            let closestX = agentRadius * Math.sin(rotation);
            let closestY = agentRadius * Math.cos(rotation);
            return [closestX, closestY];
        }
        else if(target instanceof Prefabs.Dreadnought)
        {
            let random = Math.random() - .5;
            if(random < 0)
            {
                random = -1;
            }
            else
            {
                random = 1;
            }
            
            let rotation = target.rotation + random * Math.PI * Math.random();
            let closestX = agentRadius * Math.sin(rotation);
            let closestY = agentRadius * Math.cos(rotation);
            return [closestX, closestY];
        }
        let tan = Math.atan2(agent.y + randomY - target.y , agent.x + randomX - target.x) - Math.PI / 2;
        let closestX = agentRadius * Math.sin(tan);
            let closestY = agentRadius * Math.cos(tan);
            return [closestX, closestY];
        

        
    }

    generatePoints(agent, target, agentRadius)
    {
        let tan = Math.atan2(agent.y - target.y , agent.x - target.x) - Math.PI / 2;
        let closestX = agentRadius * Math.sin(tan);
        let closestY = agentRadius * Math.cos(tan);

        let plusclosestX = agentRadius * Math.sin(tan + Math.PI / 3);
        let plusclosestY = agentRadius * Math.cos(tan + Math.PI / 3);

        let minusclosestX = agentRadius * Math.sin(tan - Math.PI / 3);
        let minusclosestY = agentRadius * Math.cos(tan - Math.PI / 3);

        return [[closestX, closestY], [plusclosestX, plusclosestY], [minusclosestX, minusclosestY]];

    }

    distance(unit1, unit2)
    {
        return Math.pow(unit1.x - unit2.x, 2) + Math.pow(unit1.y - unit2.y, 2);
    }
}