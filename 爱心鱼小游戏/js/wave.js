let wave = {
    x : [],
    y : [],
    r : [],
    alive : [],
    num : 10,
    init : function(){
        for(let i=0;i<this.num;i++){
            this.alive[i] = false;
        }
    },
    draw : function(){
        ctx1.save();
        ctx1.lineWidth = 2;
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "white";
        for(let i=0;i<this.num;i++){
            if(this.alive[i] == true){
                this.r[i] += deltaTime * 0.05;
                if(this.r[i] > 50){
                    this.alive[i] = false;
                    break;
                }
                let alpha = 1 - this.r[i] / 50;
                ctx1.beginPath();
                ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2,false);
                ctx1.closePath();
                ctx1.strokeStyle = "rgba(255,255,255,"+alpha+")";
                ctx1.stroke();
            }
        }
        ctx1.restore();
    },
    born : function(x,y){
        for(let i=0;i<this.num;i++){
            if(this.alive[i] == false){
                this.alive[i] = true;
                this.r[i] = 20;
                this.x[i] = x;
                this.y[i] = y;
                return;
            }
        }
    }
}