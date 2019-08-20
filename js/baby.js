let baby = {
    x : 0,
    y : 0,
    angle : 0,
    babyTail : [],
    babyEye : [],
    babyBody : [],
    tailTime : 0,
    tailCount : 0,
    eyeTime : 0,
    eyeCount : 0,
    eyeInterval : 0,
    bodyTime : 0,
    bodyCount : 0,
    init : function(){
        this.tailTime = 0;
        this.tailCount = 0;
        this.eyeCount = 0;
        this.eyeTime = 0;
        this.eyeInterval = 1000;
        this.bodyCount = 0;
        this.bodyTime = 0
        this.x = canWidth*0.5 - 50;
        this.y = canHeight*0.5 +50;
        this.angle = 0;
        for(let i=0;i<8;i++){
            this.babyTail[i] = new Image();
            this.babyTail[i].src = "./image/babyTail"+i+".png";
        }
        for(let i = 0 ; i < 2 ; i++){
            this.babyEye[i] = new Image();
            this.babyEye[i].src = "./image/babyEye" + i+".png"; 
        }

        for(let i = 0;i<20;i++){
            this.babyBody[i] = new Image();
            this.babyBody[i].src = "./image/babyFade" + i + ".png";
        }
    },
    draw : function(){
        this.x = lerpDistance(mom.x,this.x,0.99);
        this.y = lerpDistance(mom.y,this.y,0.99);

        let deltaY = this.y - mom.y;
        let deltaX = this.x - mom.x;
        let angle = Math.atan2(deltaY,deltaX);
        this.angle = lerpAngle(angle,this.angle,0.6)

        this.tailTime += deltaTime;
        if(this.tailTime > 50){
            this.tailCount = (this.tailCount + 1) % 8 ;
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

        this.bodyTime += deltaTime;
        if(this.bodyTime > 300){
            this.bodyCount = this.bodyCount + 1;
            this.bodyTime %= 300;
            if(this.bodyCount > 19){
                this.bodyCount = 19;
                data.gameOver = true;
            }
        }


        ctx1.save();
        ctx1.translate(this.x,this.y);
        ctx1.rotate(this.angle);
        ctx1.drawImage(this.babyTail[this.tailCount],-this.babyTail[this.tailCount].width*0.5+25,-this.babyTail[this.tailCount].height*0.5);
        ctx1.drawImage(this.babyBody[this.bodyCount],-this.babyBody[this.bodyCount].width*0.5,-this.babyBody[this.bodyCount].height*0.5);
        ctx1.drawImage(this.babyEye[this.eyeCount],-this.babyEye[this.eyeCount].width*0.5,-this.babyEye[this.eyeCount].height*0.5);
        ctx1.restore();
    },
}

function momBabyCollision(){
   if(data.fruitNum > 0){
        let l =  calLength2(mom.x,mom.y,baby.x,baby.y);
        if(l < 900){
            baby.bodyCount = 0;
            mom.bodyCount = 0;
            data.addStore();
            halo.born(baby.x,baby.y);
        }
   }
}