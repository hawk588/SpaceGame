import CircleCollider from "./CircleCollider.js"
import PointCollider from "./PointCollider.js"
import RectangleCollider from "./RectangleCollider.js";
import ArcCollider from "./ArcCollider.js";

export default class CollisionHelper{
   
        static inCollision(one, two){
            if(one.collider instanceof CircleCollider && two.collider instanceof PointCollider){
                let distance = one.gameObject.location.distance(two.gameObject.location);
                
                if(distance < one.collider.radius)
                    return true;
                return false;
            }
            else if(one.collider instanceof PointCollider && two.collider instanceof CircleCollider)
            {
                return this.inCollision(two, one);
            }
            else if(one.collider instanceof RectangleCollider && two.collider instanceof PointCollider)
            {
                let centerX = one.gameObject.x;
                let centerY = one.gameObject.y;
                let height = one.collider.height/2;
                let width = one.collider.width/2;
                let rotation = one.gameObject.rotation;
                let corners = this.points(centerX, centerY, height, width, rotation);
                
                let side1 = this.lineToPoint(corners[0][0], corners[1][0], corners[0][1], corners[1][1], two.gameObject.x, two.gameObject.y);
                let side2 = this.lineToPoint(corners[1][0], corners[2][0], corners[1][1], corners[2][1], two.gameObject.x, two.gameObject.y);
                let side3 = this.lineToPoint(corners[2][0], corners[3][0], corners[2][1], corners[3][1], two.gameObject.x, two.gameObject.y);
                let side4 = this.lineToPoint(corners[3][0], corners[0][0], corners[3][1], corners[0][1], two.gameObject.x, two.gameObject.y);
                
                if(side1 == 0 || side2 == 0 || side3 == 0 || side4 == 0)
                {
                    
                    return true;
                }
                else
                {
                    let oppCorner1 = this.lineToPoint(corners[0][0], corners[1][0], corners[0][1], corners[1][1], corners[2][0], corners[2][1]);
                    let oppCorner2 = this.lineToPoint(corners[1][0], corners[2][0], corners[1][1], corners[2][1], corners[3][0], corners[3][1]);
                    let oppCorner3 = this.lineToPoint(corners[2][0], corners[3][0], corners[2][1], corners[3][1], corners[0][0], corners[0][1]);
                    let oppCorner4 = this.lineToPoint(corners[3][0], corners[0][0], corners[3][1], corners[0][1], corners[1][0], corners[1][1]);
                    
                    if(this.relativeToZero(side1, oppCorner1) && this.relativeToZero(side2, oppCorner2) && this.relativeToZero(side3, oppCorner3) && this.relativeToZero(side4, oppCorner4))
                    {
                        
                        return true;
                    }
                    else{
                        
                        return false;
                    }
                }
                
            }
            else if(one.collider instanceof PointCollider && two.collider instanceof RectangleCollider)
            {
                return this.inCollision(two, one);
            }
            else if(one.collider instanceof ArcCollider && two.collider instanceof RectangleCollider)
            {
                return this.inCollision(two, one);
            }
            else if(one.collider instanceof RectangleCollider && two.collider instanceof ArcCollider && one.gameObject.player != two.gameObject.player)
            {
                let centerX = one.gameObject.x;
                let centerY = one.gameObject.y;
                let height = one.collider.height/2;
                let width = one.collider.width/2;
                let rotation = one.gameObject.rotation;
                let radius = two.collider.radius;
                let rotation2 = two.gameObject.rotation;
                rotation2 = this.convertAngleNeg(rotation2);

                if(centerX == two.gameObject.x && centerY == two.gameObject.y)
                {
                    return false;
                }
                let corners = this.points(centerX, centerY, height, width, rotation);

                let check1 = this.distanceCheck(two.gameObject.x, corners[0][0], two.gameObject.y, corners[0][1], radius);
                let check2 = this.distanceCheck(two.gameObject.x, corners[1][0], two.gameObject.y, corners[1][1], radius);
                let check3 = this.distanceCheck(two.gameObject.x, corners[2][0], two.gameObject.y, corners[2][1], radius);
                let check4 = this.distanceCheck(two.gameObject.x, corners[3][0], two.gameObject.y, corners[3][1], radius);
                let check5 = this.distanceCheck(two.gameObject.x, one.gameObject.x, two.gameObject.y, one.gameObject.y);

                /*let recLine1 = this.pointsToLine(corners[0][0], corners[1][0], corners[0][1], corners[1][1]);
                let recLine2 = this.pointsToLine(corners[1][0], corners[2][0], corners[1][1], corners[2][1]);
                let recLine3 = this.pointsToLine(corners[2][0], corners[3][0], corners[2][1], corners[3][1]);
                let recLine4 = this.pointsToLine(corners[3][0], corners[0][0], corners[3][1], corners[0][1]);
                let cirLine1, cirLine2;
                if(isFinite(recLine2[2]))
                {
                    cirLine1 = [recLine2[0], recLine2[1], two.gameObject.y - (recLine2[0] / recLine2[1]) * two.gameObject.x];
                }
                else
                {
                    cirLine1 = [recLine2[0], recLine2[1], Number.POSITIVE_INFINITY];
                }   
                if(isFinite(recLine1[2]))
                {
                    cirLine2 = [recLine1[0], recLine1[1], two.gameObject.y - (recLine1[0] / recLine1[1]) * two.gameObject.x];
                } 
                else
                {
                    cirLine2 = [recLine1[0], recLine1[1], Number.POSITIVE_INFINITY];
                }   

                let collision11 = this.intersectPoint(recLine1[0], cirLine1[0], recLine1[1], cirLine1[1], recLine1[2], cirLine1[2]);
                let collision22 = this.intersectPoint(recLine2[0], cirLine2[0], recLine2[1], cirLine2[1], recLine2[2], cirLine2[2]);
                let collision31 = this.intersectPoint(recLine3[0], cirLine1[0], recLine3[1], cirLine1[1], recLine3[2], cirLine1[2]);
                let collision42 = this.intersectPoint(recLine4[0], cirLine2[0], recLine4[1], cirLine2[1], recLine4[2], cirLine2[2]);

                let check1 = /*this.betweenPoints(corners[0][0], corners[1][0], corners[0][1], corners[1][1], collision11[0], collision11[1]) && this.distanceCheck(two.gameObject.x, collision11[0], two.gameObject.y, collision11[1], radius);
                let check2 = /*this.betweenPoints(corners[1][0], corners[2][0], corners[1][1], corners[2][1], collision22[0], collision22[1]) && this.distanceCheck(two.gameObject.x, collision22[0], two.gameObject.y, collision22[1], radius);
                let check3 = /*this.betweenPoints(corners[2][0], corners[3][0], corners[2][1], corners[3][1], collision31[0], collision31[1]) && this.distanceCheck(two.gameObject.x, collision31[0], two.gameObject.y, collision31[1], radius);
                let check4 = /*this.betweenPoints(corners[3][0], corners[0][0], corners[3][1], corners[0][1], collision42[0], collision42[1]) && this.distanceCheck(two.gameObject.x, collision42[0], two.gameObject.y, collision42[1], radius);*/

                if(check1 || check2 || check3 || check4 || check5)
                {
                    //let dx = originX - targetX;
                    //let dy = originY - targetY;
                    let tan1 = Math.atan2(corners[0][1] - two.gameObject.y , corners[0][0] - two.gameObject.x) + Math.PI / 2;
                    let startAngle = rotation2 + two.collider.beginningAngle;
                    let endAngle = rotation2 + two.collider.endingAngle;
                    startAngle = this.configureArcAngle(startAngle, endAngle);
                    let angle1 = this.processAngle(tan1, startAngle, endAngle);


                    if(angle1 < startAngle || angle1 > endAngle)
                    {
                        check1 = false;
                    }
                    else
                    {
                        check1 = true;
                    }
                    let tan2 = Math.atan2(corners[1][1] - two.gameObject.y , corners[1][0] - two.gameObject.x) + Math.PI / 2;
                    let angle2 =  this.processAngle(tan2, startAngle, endAngle);
                    if(angle2 < startAngle || angle2 > endAngle)
                    {
                        check2 = false;
                    }
                    else{
                        check2 = true;
                    }
                    let tan3 = Math.atan2(corners[2][1] - two.gameObject.y , corners[2][0] - two.gameObject.x) + Math.PI / 2;
                    let angle3 =  this.processAngle(tan3, startAngle, endAngle);
                    if(angle3 < startAngle || angle3 > endAngle)
                    {
                        check3 = false;
                    }
                    else
                    {
                        check3 = true;
                    }
                    let tan4 = Math.atan2(corners[3][1] - two.gameObject.y , corners[3][0] - two.gameObject.x) + Math.PI / 2;
                    let angle4 =  this.processAngle(tan4, startAngle, endAngle);
                    if(angle4 < startAngle || angle4 > endAngle)
                    {
                        check4 = false;
                    }
                    else
                    {
                        check4 = true;
                    }

                    let tan5 = Math.atan2(one.gameObject.y - two.gameObject.y , one.gameObject.x - two.gameObject.x) - Math.PI / 2;
                    let angle5 =  this.processAngle(tan5, startAngle, endAngle);
                    if(angle5 < startAngle || angle5 > endAngle)
                    {
                        check5 = false;
                    }
                    else
                    {
                        check5 = true;
                    }


                    
                    if(check1 || check3 || check2 || check4 || check5)
                    {
                    //console.log("Collision");
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }


            }
            
        }

        static points(centerX, centerY, height, width, rotation)
        {
            let corners = [];
            corners[0] = this.rotate(centerX, centerY, centerX + width, centerY + height, rotation);
            corners[1] = this.rotate(centerX, centerY, centerX + width, centerY - height, rotation);
            corners[2] = this.rotate(centerX, centerY, centerX - width, centerY - height, rotation);
            corners[3] = this.rotate(centerX, centerY, centerX - width, centerY + height, rotation);
            for(let i = 0; i < corners.length; i++)
            {
                Math.round(corners[i][0]);
                Math.round(corners[i][1]);
            }
            return corners;
        }

        static rotate(cx, cy, x, y, rotation)
        {
            let tempX = x - cx;
            let tempY = y - cy;

                // now apply rotation
            let rotatedX = tempX*Math.cos(rotation) - tempY*Math.sin(rotation);
            let rotatedY = tempX*Math.sin(rotation) + tempY*Math.cos(rotation);

            // translate back
            return [rotatedX + cx, rotatedY + cy];
        }
    
        static lineToPoint(x1, x2, y1, y2, px, py)
        {
            return ((x2 - x1) * (py - y1) - (y2 - y1) * (px - x1));
        }

        static relativeToZero(num1, num2)
        {
            if((num1 > 0 && num2 > 0) || (num1 < 0 && num2 < 0))
            {
                return true;
            }
            else{
                return false;
            }
        }

        static pointsToLine(x1, x2, y1, y2)
        {
            let slopeY = y2 - y1;
            let slopeX = x2 - x1;
            

            let intercept = y1 - (slopeY / slopeX) * x1;
            if(slopeX == 0)
            {
                slopeX = x1;
            }

            return [slopeY, slopeX, intercept];
        }

        static intersectPoint(sy1, sy2, sx1, sx2, intercept1, intercept2)
        {
            let x,y;
            if(!isFinite(intercept1))
            {
                if(!isFinite(intercept2))
                {
                    return [NaN, NaN];
                }
                x = sx1;
                y = (sy2 / sx2) * x + intercept2;
            } 
            else if(!isFinite(intercept2))   
            {
                x = sx2;
                y = (sy1 / sx1) * x + intercept1;
            }
            else
            {
                x = (intercept2 - intercept1) / ((sy1 / sx1) - (sy2 / sx2));
                y = (sy1 / sx1) * x + intercept1;
            }
            return [x, y];
        }

        static betweenPoints(lx1, lx2, ly1, ly2, px, py)
        {
            if(lx1 > lx2)
            {
                if(px > lx1 || px < lx2)
                {
                    return false;
                }
                else if(ly1 > ly2)
                {
                    if(ly > ly1 || ly < ly2)
                    {
                        return false;
                    }
                }
                else{
                    if(ly < ly1 || ly > ly2)
                    {
                        return false;
                    }
                }
                return true;
            }
            else
            {
                if(px < lx1 || px > lx2)
                {
                    return false;
                }
                else if(ly1 > ly2)
                {
                    if(ly > ly1 || ly < ly2)
                    {
                        return false;
                    }
                }
                else{
                    if(ly < ly1 || ly > ly2)
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        static distanceCheck(x1, x2, y1, y2, distance)
        {
            if(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) < Math.pow(distance, 2))
            {
                return true;
            }
            else{
                return false;
            }
        }

        static convertAngleNeg(angle)
        {
            if(angle > Math.PI)
            {
                return - Math.PI * 2 + angle;
            }
            else
            {
                return angle;
            }
        }

        static convertAnglePos(angle)
        {
            angle += Math.PI * 2;
            angle %= Math.PI * 2;
            return angle;
        }

        static processAtan2(oneX, twoX, slope)
        {
            if(oneX > twoX)
            {
                slope += Math.PI;
            }
            return slope;
        }

        static configureArcAngle(start, end)
        {
            if(start >= end)
            {
                if((start % Math.PI * 2) < end)
                {
                    return (start % Math.PI * 2);
                }
                else
                {
                    return (start % Math.PI * 2) - (Math.PI * 2);
                }
            }
            return start;
        }

        static processAngle(angle, start, end)
        {
            if(angle < start || angle > end)
            {
                angle += Math.PI * 2;
                if(angle >= start && angle <= end)
                {
                    return angle;
                }
                angle -= Math.PI * 4;
                if(angle >= start && angle <= end)
                {
                    return angle;
                }
            }
            return angle;
            
        }
}    