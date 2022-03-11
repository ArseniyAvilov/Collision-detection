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
        context.fillStyle = "#FFCC00";
        let position = this.getPosition();
        context.beginPath();
        context.moveTo(position[0][0], position[0][1]);
        for(let i=1; i<this.n; i++){  
            context.lineTo(position[i][0], position[i][1]);
        }
        context.closePath();    
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