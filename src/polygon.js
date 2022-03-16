export default class Polygon {
    constructor(x, y, n, len) {
        this.x = x
        this.y = y
        this.n = n
        this.len = len
        this.speed = {x: 0, y: 0}
        this.status = 3
        this.type == "polygon"
    }

    setSpeed(x, y){
        this.speed.x = x
        this.speed.y = y
    }

    collision(){   
        this.setSpeed(-(this.speed.x), -(this.speed.y))
        console.log("hjh")    
        //this.status -= 1
    }

    getPosition(){
        let position = [[this.x, this.y]];
        let phi = (2*Math.PI) / this.n;
        for(let i=0; i<this.n-1;i++){
            position.push([position[i][0]+this.len*Math.cos(phi*i), position[i][1]+this.len*Math.sin(phi*i)]);}
        return position;
    }

    draw(context){
        if (this.status > 0) {
            if(this.status === 3) context.fillStyle = "red";
            else if (this.status === 2) context.fillStyle = "blue";
            else if (this.status === 1) context.fillStyle = "green";
            let position = this.getPosition();
            this.checkWindow = position
            context.beginPath();
            context.moveTo(position[0][0], position[0][1]);
            for(let i=1; i<this.n; i++){  
                context.lineTo(position[i][0], position[i][1]);
            }
            context.closePath();    
            context.stroke();
            context.fill();
        }
    }

    checkBorder(position){
        let flag = false
        for(let i=0; i<this.n; i++){
            if (position[i][0] > window.innerWidth || position[i][0]< 0 || position[i][1] > window.innerHeight || position[i][1] < 0)
                flag = true
        }
        return flag
    }

    update(){
        
        if (this.checkBorder(this.getPosition())){ 
            //this.setSpeed(-(this.speed.x*Math.cos(Math.PI/3)), -(this.speed.y*Math.sin(Math.PI/3)))
            this.setSpeed(-(this.speed.x), -(this.speed.y))
            //this.status -= 1
        }
        this.x += this.speed.x
        this.y += this.speed.y
    }

    contains(point) {
        return (point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

    get2PointVec(p1, p2, isNormlize = true){

        const x = p2[0] - p1[1];
        const y = p2[0] - p1[1];
 
        if (isNormlize) {
            return this.normalize([x, y]);
        }
        return [x, y];
    }

    getSideNorml(vec2, isNormlize = true){
 
        const x = vec2[0];
        const y = vec2[1];
 
                 // вектор по часовой стрелке 
        //normal=(-y,x) || normal=(y,-x)
        if (isNormlize) {
            this.normalize([-y, x])
        }
        return [-y, x];
    }

    calcProj(axis, objPoints){
        let min = 0;
        let max = 0;
        for (let i = 0; i < this.n; i++) {
            const vec2 = [objPoints[i][0], objPoints[i][1]];
            const dot = this.dot(vec2, this.normalize(axis));
 
            if (min === 0 || max === 0) {
                min = max = dot;
            } else {
                min = (dot < min) ? dot : min;
                max = (dot > max) ? dot : max;
            }
 
        }
 
        return { min: min, max: max }
    }
    
    dot(vec2A, vec2B){
        return vec2A[0] * vec2B[0] + vec2A[1] * vec2B[1];
    }

    normalize(vec2){
        const x = vec2[0];
        const y = vec2[1];
        const model = Math.sqrt(x * x + y * y);
 
        return [x / model, y / model];
    }

    segDist(min1, max1, min2, max2){
        if (min1 < min2) {
            return min2 < max1 && max2 > min1;
        }
        else {
            return min1 < max2 && max1 > min2;
        }
    }

    intersects(shape) {
        let position = this.getPosition()

        if (shape.type === "circle"){
            for(let i=0; i<this.n; i++){
                let startPoint = position[i];
                let endPoint = (i != this.n - 1) ? position[i + 1] : position[0];
                let sideNorVec = this.get2PointVec(startPoint, endPoint, false);
                let dotNorVec = this.getSideNorml(sideNorVec, false);
                
                const data1 = this.calcProj(dotNorVec, position);
                const dot = this.dot([shape.x, shape.y], this.normalize(dotNorVec));
                //console.log(sideNorVec, dotNorVec)
                if (this.segDist(data1.min, data1.max, dot - shape.radius, dot + shape.radius)){
                    return true
                }
            }
            return false
        }else if (shape.type === "polygon"){
            for(let i=0; i<this.n; i++){
                let startPoint = position[i];
                let endPoint = (i != this.n - 1) ? position[i + 1] : position[0];
                let sideNorVec = this.get2PointVec(startPoint, endPoint, false);
                let dotNorVec = this.getSideNorml(sideNorVec, false);
                const data1 = this.calcProj(dotNorVec, position);
                const data2 = this.calcProj(dotNorVec, shape.getPosition());
                if (this.segDist(data1.min, data1.max, data2.min, data2.max)){
                    return true
                }
            }
            return false
        }

    }
}