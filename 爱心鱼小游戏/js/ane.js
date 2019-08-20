let ane = {
    rootx : [],
    headx : [],
    heady : [],
    angle : 0,
    amp : [],
    sin : 0,
    num : 50,
    init : function(){
        for(let i=0;i<this.num;i++){
           this.rootx[i] = i*16 + Math.random()*20;
           this.headx[i] = this.rootx[i];
           this.heady[i] = canHeight -250 + Math.random()*50;
           this.amp[i] = Math.random()*30 + 50;
        }
    },
    draw : function(){
        this.angle += deltaTime * 0.0007;
        this.sin = Math.sin(this.angle);
        ctx2.save()
        ctx2.lineWidth = 20;
        ctx2.globalAlpha = 0.6;
        ctx2.lineCap = 'round';
        ctx2.strokeStyle = '#3b154e';
        for(let i = 0;i<this.num;i++){
            this.headx[i] = this.rootx[i]+this.sin*this.amp[i];
            ctx2.beginPath();
            ctx2.moveTo(this.rootx[i],canHeight);
            ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100 ,this.headx[i],this.heady[i]);
            ctx2.stroke();
            ctx2.closePath();
        }
        ctx2.restore()
    }
}
