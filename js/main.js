let can1,can2,ctx1,ctx2;
let lastTime,deltaTime;
let bgPic = new Image();
let canWidth ,canHeight;
let mouseX,mouseY;
document.body.onload = game;
function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
function init(){
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext("2d");

    can1.addEventListener('mousemove',onMouseMove,false);

    bgPic.src = "./image/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;
    ane.init();
    fruit.init();
    mom.init();
    data.init();
    mouseX = canWidth*0.5;
    mouseY = canHeight*0.5;
    baby.init();
    wave.init();
    halo.init();
}
function gameloop(){
    window.requestAnimationFrame(gameloop);
    let now = Date.now();
    deltaTime = now - lastTime;
    if(deltaTime > 40){
        deltaTime = 40;
    }
    lastTime = now;
    drawBackGround();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();
    if(data.gameOver == false){
        momFruitsCollision();
        momBabyCollision();
    }
    data.draw();
    wave.draw();
    halo.draw();
}
function onMouseMove(e){
    if(data.gameOver == false){
        if(e.offSetX || e.layerX){
            mouseX = e.offSetX == undefined ? e.layerX : e.offSetX;
            mouseY = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}