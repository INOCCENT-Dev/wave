  window.onload = function() {
    const canvas = document.getElementById("mycanvas"); 
    const ctx = canvas.getContext("2d");
    const TIME_INTERVAL = 33; 
    const SPOT_NUMBER = 100;

    let spot1 = []; // wave 1 spots
    let spot2 = []; // wave 2 spots
    let spot3 = []; // wave 3 spots

    let color = ['rgba(255,100,165,0.5)','rgba(165,255,100,0.5)','rgba(100,165,255,0.5)'];


    for(let i = 0 ; i < SPOT_NUMBER; i ++){ // reset spot
      let x = (canvas.width / (SPOT_NUMBER-1)) * i;
      
      spot1[i] = new Spot(x,200,i);
      spot2[i] = new Spot(x,200,i+20);
      spot3[i] = new Spot(x,200,i+40);
    }

    window.onclick = function() {
      for(let i = 0; i < 3; i ++){
        color[i] = setColorAsRandom(50,255);
      }
    }
    
    setInterval(function(){
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      drawDraw(spot1,color[0]);
      drawDraw(spot2,color[1]);
      drawDraw(spot3,color[2]);
    },TIME_INTERVAL);

    function drawDraw(spot,color){ // draw wave function
      let gapY = spot[0].setGapY(SPOT_NUMBER);
      ctx.fillStyle= color;
      ctx.beginPath();
      ctx.moveTo(0,200);

      for(let i = 0 ; i < SPOT_NUMBER; i ++){  
        spot[i].setPosition(SPOT_NUMBER,gapY).wave().draw(ctx,i);
      }
      
      ctx.arc(300,200,300,0,Math.PI,false);
      ctx.fill();
    }
  };

  function setColorAsRandom(lmin,lmax){
    let R = Math.floor(lmin+Math.random()*(lmax - lmin));
    let G = Math.floor(lmin+Math.random()*(lmax - lmin));
    let B = Math.floor(lmin+Math.random()*(lmax - lmin));
    return 'rgba('+R+','+B+','+G+',0.5)'; 
  }

  function Spot(x,y,tmpX){
    this.x = x;
    this.y = y;
    this.tmpX = tmpX;
  }

  Spot.prototype = {
    draw: function(ctx){ // draw wave line
      ctx.lineTo(this.x,this.y);
      return this;
    },
    wave: function(){ // make wave 
      this.tmpX ++;
      return this;
    },
    setPosition: function(num,gap){ // set y position
      if(this.tmpX == 0){
        this.y = 200;
      }else{
        this.y = gap + Math.sin(Math.PI*2/num*this.tmpX) * 40;
      }
      return this;
    },
    setGapY: function(num){ 
      return 200 - Math.sin(Math.PI*2/num*this.tmpX) * 40;
    }
  };