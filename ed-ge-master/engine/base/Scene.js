import NameableParent from "./NamableParent.js"



export default class Scene extends NameableParent {

    constructor(name) {
        super(name);

    }

    start()
    {
        console.log("Scene");
        this.children.filter(i => i.start).forEach(i => i.start());
    }

    addChildren(child)
    {
        this.children.push(child);
        child.parent = this;
    }

    draw(ctx, width, height, drawLevel) {
        if(drawLevel == 0)
        {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height)
        }    

        this.children.filter(i => i.draw).forEach(i => i.draw(ctx, drawLevel));

    }
    update(collidableType, collisionHelper) {
        this.children.filter(i => i.update).forEach(i => i.update());

        //Add collision behavior
        let collidableChildren = [];
        this.getCollidable(this.children, collidableChildren, collidableType);
        
        for(let i = 0; i < collidableChildren.length; i++){
            for(let j = i + 1; j < collidableChildren.length; j++){
                if(collisionHelper.inCollision(collidableChildren[i], collidableChildren[j]))
                {
                    let gameObjectOne = collidableChildren[i].gameObject;
                    let gameObjectTwo = collidableChildren[j].gameObject;

                    //Now loop over all the behaviors too see if any are listening for collision events
                    for(let i = 0; i < gameObjectOne.components.length; i++){
                        let component = gameObjectOne.components[i];
                        if(component.onCollisionStay)
                            component.onCollisionStay(collidableChildren[j]);
                    }
                    for(let j = 0; j < gameObjectTwo.components.length; j++){
                        let component = gameObjectTwo.components[j];
                        if(component.onCollisionStay)
                            component.onCollisionStay(collidableChildren[i]);
                    }
                   
                }
            }
        }
    }
    getCollidable(children, collidableChildren, type) {

        
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            try {
                
                let collidableComponent = child.getColliders(type);
                if (collidableComponent) {
                    for(let i  = 0; i < collidableComponent.length; i++)
                    {
                        collidableChildren.push({collider:collidableComponent[i], gameObject:child});
                    }    
                }
            } catch (e) { 
                let x = 1;//no-op
            }
            try{
                for (let j = 0; j < child.children.length; j++) {
                    this.getCollidable(child.children[j], collidableChildren);
                }
            }    
            catch(e) {
                let x = 1;
            }        
            }
        }
        //console.log(collidableChildren);
    }
