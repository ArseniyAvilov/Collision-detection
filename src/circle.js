export default class Circle {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
        this.speed = {x: 0, y: 0}
    }

    setSpeed(x, y){
        this.speed.x = x
        this.speed.y = y
    }

    get left() {
        return this.x
    }

    get right() {
        return this.x + this.r
    }

    get top() {
        return this.r
    }

    get bottom() {
        return this.y + this.r
    }

    draw(context){
        context.fillStyle = "#FFCC00";
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        context.stroke();
        context.fill();
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

    intersects(rect) {
        return (this.x < rect.x + rect.w)
            && (rect.x < this.x + this.w)
            && (this.y < rect.y + rect.h)
            && (rect.y < this.y + this.w)
    }
}