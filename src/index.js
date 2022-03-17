import Rectangle from "./rectangle";
import Polygon from "./polygon";
import Circle from "./circle";

const canvas = document.getElementById("cnvs");

const gameState = {};

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
    gameState.rects.forEach((figure)=>{
        figure.draw(context)
    })
}

function update(tick) {
    gameState.rects.forEach((figure)=>{
        figure.update()
    })
}

function collisionDetection(numTicks){
    //console.log(gameState.rects.tickLength)
   // for(let i=0; i<2; i++)
     //   for(let j=i+1; j<2; j++){
            //gameState.rects[i].collision()
           // console.log(gameState.rects[0])
            if (gameState.rects[0].intersects(gameState.rects[1])){
                console.log(gameState.rects.tickLength)
                gameState.rects[0].collision()
                gameState.rects[1].collision()
            }
        
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }

    
    queueUpdates(numTicks)   
    draw(tFrame)
    collisionDetection(numTicks)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    gameState.rects = []
   // const rectangle = new Rectangle(50,98, 30, 30)
   // rectangle.setSpeed(5, 5)
  //  gameState.rects.push(rectangle)
    //const rectangle1 = new Polygon(-67,10, 4, 30)
   // rectangle1.setSpeed(.5, .5)
  // gameState.rects.push(rectangle1)
    
    const rectangle2 = new Polygon(20,25, 6, 30)
    rectangle2.setSpeed(5, 5)
    gameState.rects.push(rectangle2)

    // const rectangle3 = new Circle(100,100, 30)
    // rectangle3.setSpeed(3, 3)
    // gameState.rects.push(rectangle3)

    const rectangle4 = new Polygon(500,500, 6, 30)//Circle(500,500, 30)
    rectangle4.setSpeed(-3, -3)
    gameState.rects.push(rectangle4)
}

setup();
run();
