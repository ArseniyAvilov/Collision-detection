export default class Rectangle {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
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
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    draw(context){
        context.fillStyle = "rgb(0, 0, 200)"
        context.fillRect(this.x, this.y, this.w, this.h)
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