export default class Rectangle {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.speed = {x: 0, y: 0}
        this.type = 'rect'
    }

    setSpeed(x, y){

        this.speed.x = x
        this.speed.y = y
    }
    get left() {
        return this.x
    }

    get right() {
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    draw(context){
        context.fillStyle = "#FFCC00";
        context.fillRect(this.x, this.y, this.w, this.h)
        context.strokeRect(this.x, this.y, this.w, this.h)
    }

    update(){
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
        if (shape.type === 'rect'){
        return (this.x < shape.x + shape.w)
            && (shape.x < this.x + this.w)
            && (this.y < shape.y + shape.h)
            && (shape.y < this.y + this.w)
        }
        else if (shape.type === 'circle'){
            let closestPoint = {x, y};

            if(shape.x < this.x) closestPoint.x = this.x;
            else if (shape.x > this.right()) closestPoint.x = this.right();
            else closestPoint.x = shape.x;

            if(shape.y < this.y) closestPoint.y = this.y;
            else if( shape.y < this.left()) closestPoint.y = this.left();
            else closestPoint.y = shape.y;

            const distance = Math.sqrt(Math.pow(closestPoint.x - shape.x, 2) + Math.pow(closestPoint.y - shape.y, 2));

            if(distance < shape.radius) return true;
            else return false ;
        }
    }
}