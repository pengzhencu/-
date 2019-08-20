let fruit = {
    x : [],
    y : [],
    aneNo : [],
    age : [],
    speed : [],
    orange : new Image(),
    blue : new Image(),
    num : 30,
    alive : [],
    type : [],
    init : function(){
        for(let i = 0;i<this.num;i++){
            this.alive[i] = false;
            this.aneNo[i] = 0;
            this.x[i] = 0;
            this.y[i] = 0;
            this.speed[i] = Math.random()*0.017 + 0.003;
            this.type[i] = "";
        }
        this.orange.src = "./image/fruit.png";
        this.blue.src = "./image/blue.png";
    },
    born : function(index){
        this.aneNo[index] = Math.floor(Math.random()*ane.num);
        this.age[index] = 0;
        this.alive[index] = true;
        let ran = Math.random();
        if(ran < 0.2){
            this.type[index] = "blue";
        }else{
            this.type[index] = "orange";
        }
    },
    draw : function(){
        let pic;
        ctx2.save();
        for(let i = 0;i<this.num;i++){
           if(this.alive[i]){
                if(this.type[i] == "blue"){
                     pic = this.blue;
                }else{
                     pic = this.orange;
                }
                if(this.age[i]<=14){
                    this.x[i] = ane.headx[this.aneNo[i]];
                    this.y[i] = ane.heady[this.aneNo[i]];
                    this.age[i] += this.speed[i] * deltaTime;
                }
                else{
                    this.y[i] -= this.speed[i]*5*deltaTime;
                }
                ctx2.drawImage(pic,this.x[i]-this.age[i]*0.5,this.y[i]-this.age[i]*0.5,this.age[i],this.age[i]);
                if(this.y[i]<10){
                    this.alive[i] = false;
                }
           }
        }
        ctx2.restore();
    },
    dead : function(index){
        this.alive[index] = false;
    }
}
function fruitMonitor(){
    let num = 0;
    for(let i = 0;i < fruit.num;i++){
        if(fruit.alive[i]){
            num++;
        }
    }
    if(num < 15){
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(let i = 0;i < fruit.num; i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}