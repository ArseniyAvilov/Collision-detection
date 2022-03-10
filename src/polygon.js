export default class Polygon {
    constructor(x, y, n, len) {
        this.x = x
        this.y = y
        this.n = n
        this.len = len
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

    getPosition(){
        let position = [[this.x, this.y]];
        let r = 0.5;
        let phi = (2*Math.PI) / this.n;
        for(let i=0; i<this.n-1;i++){
            position.push([position[i][0]+this.len*Math.cos(phi*i), position[i][1]+this.len*Math.sin(phi*i)]);}
        return position;
    }

    draw(context){
        context.fillStyle = "rgb(0, 0, 200)"
        let position = this.getPosition()
        console.log(position)
        position.push(position[0])
        for(let i=0; i<this.n; i++){
            context.moveTo(position[i][0], position[i][1]);
            context.lineTo(position[i+1][0], position[i+1][1]);
            
            context.stroke();
            
        }
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