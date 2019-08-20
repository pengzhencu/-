let mom = {
    x : 0,
    y : 0,
    angle : 0,
    tail : [],
    tailTime : 0,
    tailCount : 0,
    eye : [],
    eyeTime : 0,
    eyeCount : 0,
    eyeInterval : 0,
    bodyOrange : [],
    bodyBlue : [],
    bodyCount : 0,
    bodyTime : 0,
    init : function(){
        this.eyeInterval = 1000;
        this.eyeTime = 0;
        this.eyeCount = 0;
        this.tailTime = 0;
        this.tailCount = 0;
        this.x = canWidth*0.5;
        this.y = canHeight*0.5;
        this.angle = 0;
        for(let i=0;i<8;i++){
            this.tail[i] = new Image();
            this.tail[i].src = "./image/bigTail"+i+".png";
        }
        for(let i = 0 ;i<2;i++){
            this.eye[i] = new Image();
            this.eye[i].src = "./image/bigEye" + i+".png";
        }
        for(let i = 0;i<8;i++){
            this.bodyOrange[i] = new Image();
            this.bodyBlue[i] = new Image();
            this.bodyOrange[i].src = "./image/bigSwim"+i+".png";
            this.bodyBlue[i].src = "./image/bigSwimBlue"+i+".png";
        }
    },
    draw : function(){
        this.x = lerpDistance(mouseX,this.x,0.99);
        this.y = lerpDistance(mouseY,this.y,0.99);

        let deltaY = this.y - mouseY;
        let deltaX = this.x - mouseX;
        let angle = Math.atan2(deltaY,deltaX);
        this.angle = lerpAngle(angle,this.angle,0.6)

        this.tailTime += deltaTime;
        if(this.tailTime > 50){
            this.tailCount = (this.tailCount + 1)%8;
            this.tailTime %= 50;
        }

        this.eyeTime += deltaTime;
        if(this.eyeTime > this.eyeInterval){
            this.eyeCount = (this.eyeCount +1)%2;
            this.eyeTime %= this.eyeInterval;
            if(this.eyeCount == 0){
                this.eyeInterval = Math.random()*1500 + 2000;
            }else{
                this.eyeInterval = 200;
            }
        }

        ctx1.save();
        ctx1.translate(this.x,this.y);
        ctx1.rotate(this.angle);
        ctx1.drawImage(this.tail[this.tailCount],-this.tail[this.tailCount].width*0.5+30,-this.tail[this.tailCount].height*0.5);
        if(data.blue == 1){
            ctx1.drawImage(this.bodyOrange[this.bodyCount],-this.bodyOrange[this.bodyCount].width*0.5,-this.bodyOrange[this.bodyCount].height*0.5);
        }else{
            ctx1.drawImage(this.bodyBlue[this.bodyCount],-this.bodyBlue[this.bodyCount].width*0.5,-this.bodyBlue[this.bodyCount].height*0.5);
        }
        ctx1.drawImage(this.eye[this.eyeCount],-this.eye[this.eyeCount].width*0.5,-this.eye[this.eyeCount].height*0.5);
    
        ctx1.restore();
    }
}
function momFruitsCollision(){
    for(let i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
             let l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
             if(l < 900){
                 fruit.dead(i);
                 data.fruitNum++;
                 mom.bodyCount++;
                 if(mom.bodyCount > 7){
                     mom.bodyCount = 7;
                 }
                 if(fruit.type[i] == "blue"){
                     data.blue = 2;
                 }
                 wave.born(fruit.x[i],fruit.y[i]);
             }
        }
    }
}