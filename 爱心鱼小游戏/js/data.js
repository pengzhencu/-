let data = {
    fruitNum : 0,
    blue : 1,
    score : 0,
    gameOver : false,
    alpha : 0,
    reset : function(){
        this.fruitNum = 0;
        this.blue = 1;
    },
    draw : function(){
        ctx1.save();
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "white";
        ctx1.fillText("Score : "+ this.score,canWidth *0.5,canHeight -50);
        if(this.gameOver){
            this.alpha += deltaTime*0.0005;
            if(this.alpha > 1){
                this.alpha = 1;
            }
            ctx1.fillStyle = "rgb(255,255,255," + this.alpha +")";
            ctx1.fillText("Game Over" ,canWidth*0.5,canHeight*0.5);
        }
        ctx1.restore();
    },
    addStore : function(){
        this.score += this.fruitNum*100*this.blue;
        this.reset();
    },
    init : function(){
        this.alpha = 0;
        this.fruitNum = 0;
        this.blue = 1;
        this.score = 0;
        this.gameOver = false;
        ctx1.font = "20px Verdana";
        ctx1.textAlign = "center";
        ctx1.fillStyle = "white";
    }
}