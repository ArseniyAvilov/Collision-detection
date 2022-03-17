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

    // contains(point) {
    //     return (point.x >= this.x &&
    //         point.x < this.x + this.w &&
    //         point.y >= this.y &&
    //         point.y < this.y + this.h)
    // }

    // normalize(vec2){
    //     const x = vec2[0];
    //     const y = vec2[1];
    //     const model = Math.sqrt(x * x + y * y);
 
    //     return [x / model, y / model];
    // }

    // dot(vec2A, vec2B){
    //     return vec2A[0] * vec2B[0] + vec2A[1] * vec2B[1];
    // }

    // edgeDirection(p1, p2, isNormlize = true){

    //     const x = p2[0] - p1[0];
    //     const y = p2[1] - p1[1];
 
    //     if (isNormlize) {
    //         return this.normalize([x, y]);
    //     }
    //     return [x, y];
    // }

    // orthogonal(vec, isNormlize = true){
 
    //     const x = vec[0];
    //     const y = vec[1];

    //     if (isNormlize) {
    //         this.normalize([y, -x])
    //     }
    //     return [y, -x];
    // }

    // verticesToEdges(vec){
    //     let toEdge = [];
    //     for(let i=0; i<vec.lenght; i++){
    //         toEdge.push(this.edgeDirection(vec[i], vec[i+1]%vec.lenght))
    //     }
    //     return toEdge;
    // }

    // project(vec, axis){
    //     let dots = [];
    //     for(let i=0; i<vec.lenght; i++){
    //         dots.push(this.dot(vec[i], axis))
    //     }

    //     return [min(dots), max(dots)]
    // }

    // overlap(projection1, projection2){
    //     return min(projection1) <= max(projection2) ||
    //         min(projection2) <= max(projection1)

    // }

    // separatingAxisTheorem(vertices_a, vertices_b){
    //     let edges = this.verticesToEdges(vertices_a) + this.verticesToEdges(vertices_b)
    //     let axes = []
    //     for(let i=0; i< edges.lenght; i++){
    //         axes.push(this.normalize(edges[i]))
    //     }

    //     for(let i=0; i< axes.length; i++){
    //         const projection_a = this.project(vertices_a, axis) 
    //         const projection_b = this.project(vertices_b, axis)

    //         const overlapping = this.overlap(projection_a, projection_b)

    //         if(!overlapping) return false
    //     }
    //     return true
    // }

    aabb(){
        const position = this.getPosition();
        if (this.n === 3){
            let b = Math.sqrt(Math.pow(this.len, 2) - Math.pow(this.len/2, 2))/2;
            let center = [position[0][0], position[0][1]+b];
            return [center, b];
        }
        else if(this.n === 6){
            let center = [position[5][0]+this.len, position[5][1]];
            return [center, this.len];
        }
    }

    intersects(shape) {
        let position = this.getPosition()
        console.log(shape.type)

        if (shape.type === "circle"){
            const aabb = this.aabb()
            return Math.sqrt(Math.pow(aabb[0][0].x - shape.x, 2) +
            Math.pow(aabb[0][1].y - shape.y, 2)) < aabb[1] + shape.radius
        }else {//if (shape.type === "polygon"){
            console.log(this.separatingAxisTheorem(position, shape.getPosition()))
            return this.separatingAxisTheorem(position, shape.getPosition())
        }

    }
}