let halo = {
    x : [],
    y : [],
    r : [],
    alive : [],
    num : 5,
    init : function(){
        for(let i = 0 ; i < this.num; i++){
            this.alive[i] = false;
        }
    },
    draw : function(){
        ctx1.save();
        ctx1.lineWidth = 2;
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "rgba(203,91,0,1)";
        for(let i=0;i<this.num;i++){
            if(this.alive[i] == true){
                this.r[i] += deltaTime * 0.1;
                if(this.r[i] > 100){
                    this.alive[i] = false;
                    break;
                }
                let alpha = 1 - this.r[i] / 100;
                ctx1.beginPath();
                ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2,false);
                ctx1.closePath();
                ctx1.strokeStyle = "rgba(203,91,0,"+alpha+")";
                ctx1.stroke();
            }
        }
        ctx1.restore();
    },
    born : function(x , y){
        for(let i=0;i<this.num;i++){
            if(this.alive[i] == false){
                this.alive[i] = true ;
                this.x[i] = x;
                this.y[i] = y;
                this.r[i] = 10;
                return;
            }
        }
    }
}