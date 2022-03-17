export default class Circle {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.radius = r
        this.speed = {x: 0, y: 0}
        this.type = "circle"
        this.status = 3
    }

    setSpeed(x, y){
        this.speed.x = x
        this.speed.y = y
    }

    collision(){
        this.setSpeed(-(this.speed.x), -(this.speed.y))
        
        //this.status -= 1
    }

    draw(context){

        if (this.status > 0) {
            if(this.status === 3) context.fillStyle = "#FFCC00";
            else if (this.status === 2) context.fillStyle = "#FFA500";
            else if (this.status === 1) context.fillStyle = "#CFFC00";
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            context.stroke();
            context.fill();
        }
    }

    update(){
        if (this.x+this.radius >= window.innerWidth || this.x - this.radius <= 0 || this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0){ 
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

    intersects(shape) {

        if (shape.type === "circle"){
            return Math.sqrt(Math.pow(this.x - shape.x, 2) +
            Math.pow(this.y - shape.y, 2)) < this.radius + shape.radius
        }
         else if (shape.type === "polygon"){
          
        }
    }
}