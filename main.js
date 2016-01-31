var FPS=60;
var clock=0;
var p1absorbmarktime=0;
var p1criticalmarktime=0;
var p1retortmarktime=0;
var p2absorbmarktime=0;
var p2criticalmarktime=0;
var p2retortmarktime=0;
var p1bulletspliceflag=0;
var p2bulletspliceflag=0;
var choosing=0;
var counter=0;
var flag=0;
var p1key=0;
var p2key=0;
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var bg=document.createElement("img");
bg.src="images/bg.png";
var p1u=document.createElement("img");
p1u.src="images/u/p1planeu.png";
var p1d=document.createElement("img");
p1d.src="images/d/p1planed.png";
var p1l=document.createElement("img");
p1l.src="images/l/p1planel.png";
var p1r=document.createElement("img");
p1r.src="images/r/p1planer.png";
var p2u=document.createElement("img");
p2u.src="images/u/p2planeu.png";
var p2d=document.createElement("img");
p2d.src="images/d/p2planed.png";
var p2l=document.createElement("img");
p2l.src="images/l/p2planel.png";
var p2r=document.createElement("img");
p2r.src="images/r/p2planer.png";
var p1bullet=document.createElement("img");
p1bullet.src="images/p1bullet.png";
var p2bullet=document.createElement("img");
p2bullet.src="images/p2bullet.png";
var wall=document.createElement("img");
wall.src="images/wall.png";
var absorb=document.createElement("img");
absorb.src="images/absorb.png";
var attack=document.createElement("img");
attack.src="images/attack.png";
var bullet=document.createElement("img");
bullet.src="images/bullet.png";
var critical=document.createElement("img");
critical.src="images/critical.png";
var hp=document.createElement("img");
hp.src="images/hp.png";
var retort=document.createElement("img");
retort.src="images/retort.png";
var shot=document.createElement("img");
shot.src="images/shot.png";
var bulletline=document.createElement("img");
bulletline.src="images/bulletline.png";
var absorbmark=document.createElement("img");
absorbmark.src="images/absorbmark.png";
var criticalmark=document.createElement("img");
criticalmark.src="images/criticalmark.png";
var retortmark=document.createElement("img");
retortmark.src="images/retortmark.png";
var walls=[];
var p1bullets=[];
var p2bullets=[];
var upgrades=[];
var p1={
  x:Math.floor(Math.random()*311)+350,
  y:Math.floor(Math.random()*641)+20,
  direction:{x:-1,y:0},
  movedirection:{x:0,y:0},
  Attack:10,
  Critical:0.2,
  Shot:0.5,
  Absorb:0,
  Hp:100,
  Fightinghp:100,
  Retort:0,
  Bullet:5,
  Fightingbullet:5
};
var p2={
  x:Math.floor(Math.random()*311)+20,
  y:Math.floor(Math.random()*641)+20,
  direction:{x:1,y:0},
  movedirection:{x:0,y:0},
  Attack:10,
  Critical:0.2,
  Shot:0.5,
  Absorb:0,
  Hp:100,
  Fightinghp:100,
  Retort:0,
  Bullet:5,
  Fightingbullet:5
};
function Wall(){
  this.x=Math.floor(Math.random()*671);
  this.y=Math.floor(Math.random()*671);
  this.width=Math.floor(Math.random()*31)+30;
  this.height=Math.floor(Math.random()*31)+30;
}
function FindAbsolutevValue(a){
  if(a>=0){
    return a;
  }
  if(a<0){
    return (-1*a);
  }
}
function P1bullet(){
  this.x=p1.x+7;
  this.y=p1.y+7;
  this.direction=p1.direction;
  this.move=function(){
    if(IsCollidedMovingPointToSurfaceOrSurfaceToSurface(p2.x,p2.y,20,20,this.x,this.y,6,6)||
    IsCollidedMovingPointToSurfaceOrSurfaceToSurface(p2.x,p2.y,20,20,
      this.x-(((500/FPS)-3)*FindAbsolutevValue(this.direction.x)),
      this.y-(((500/FPS)-3)*FindAbsolutevValue(this.direction.y)),
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.x))+6,
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.y))+6)
    ){
      var p2cost=p1.Attack;
      var p1cost=0;
      var heal=0;
      if(Math.floor(Math.random()*4)==0){
        p2cost=p2cost+(p1.Attack*p1.Critical);
        p1criticalmarktime=FPS;
      }
      if(Math.floor(Math.random()*4)==0){
        heal=p2cost*p1.Absorb;
        p1absorbmarktime=FPS;
      }
      if(Math.floor(Math.random()*4)==0){
        p1cost=p2cost*p2.Retort;
        p2retortmarktime=FPS;
      }
      p2.Fightinghp=p2.Fightinghp-p2cost;
      p1.Fightinghp=p1.Fightinghp-(p1cost-heal);
      if(p1.Fightinghp>p1.Hp){
        p1.Fightinghp=p1.Hp;
      }
      p1bulletspliceflag=1;
    }else if(IsCollidedToWallsMovingPointOrSurface(this.x,this.y,6,6)||
    IsCollidedToWallsMovingPointOrSurface(
      this.x-(((500/FPS)-3)*FindAbsolutevValue(this.direction.x)),
      this.y-(((500/FPS)-3)*FindAbsolutevValue(this.direction.y)),
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.x))+6,
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.y))+6)||
    this.x<20||this.x>674||this.y<20||this.y>674){
      p1bulletspliceflag=1;
    }else{
      this.x=this.x+(1000*this.direction.x/FPS);
      this.y=this.y+(1000*this.direction.y/FPS);
    }
  };
}
function P2bullet(){
  this.x=p2.x+7;
  this.y=p2.y+7;
  this.direction=p2.direction;
  this.move=function(){
    if(IsCollidedMovingPointToSurfaceOrSurfaceToSurface(p1.x,p1.y,20,20,this.x,this.y,6,6)||
    IsCollidedMovingPointToSurfaceOrSurfaceToSurface(p1.x,p1.y,20,20,
      this.x-(((500/FPS)-3)*FindAbsolutevValue(this.direction.x)),
      this.y-(((500/FPS)-3)*FindAbsolutevValue(this.direction.y)),
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.x))+6,
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.y))+6)
    ){
      var p1cost=p2.Attack;
      var p2cost=0;
      var heal=0;
      if(Math.floor(Math.random()*4)==0){
        p1cost=p1cost+(p2.Attack*p2.Critical);
        p2criticalmarktime=FPS;
      }
      if(Math.floor(Math.random()*4)==0){
        heal=p1cost*p2.Absorb;
        p2absorbmarktimetime=FPS;
      }
      if(Math.floor(Math.random()*4)==0){
        p2cost=p1cost*p1.Retort;
        p1retortmarktime=FPS;
      }
      p1.Fightinghp=p1.Fightinghp-p1cost;
      p2.Fightinghp=p2.Fightinghp-(p2cost-heal);
      if(p2.Fightinghp>p2.Hp){
        p2.Fightinghp=p2.Hp;
      }
      p2bulletspliceflag=1;
    }else if(IsCollidedToWallsMovingPointOrSurface(this.x,this.y,6,6)||
    IsCollidedToWallsMovingPointOrSurface(
      this.x-(((500/FPS)-3)*FindAbsolutevValue(this.direction.x)),
      this.y-(((500/FPS)-3)*FindAbsolutevValue(this.direction.y)),
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.x))+6,
      (((1000/FPS)-6)*FindAbsolutevValue(this.direction.y))+6)||
    this.x<20||this.x>674||this.y<20||this.y>674){
      p2bulletspliceflag=1;
    }else{
      this.x=this.x+(1000*this.direction.x/FPS);
      this.y=this.y+(1000*this.direction.y/FPS);
    }
  };
}
function Upgrade(){
  var randommath=Math.floor(Math.random()*31);
  if(randommath==30){
    this.item=bullet;
  }
  if(randommath==29){
    this.item=shot;
  }
  if(randommath==28||randommath==27||randommath==26){
    this.item=absorb;
  }
  if(randommath==25||randommath==24||randommath==23){
    this.item=critical;
  }
  if(randommath==22||randommath==21||randommath==20){
    this.item=retort;
  }
  if(randommath==19||randommath==18||randommath==17||randommath==16||randommath==15||randommath==14||randommath==13||randommath==12||randommath==11||randommath==10){
    this.item=attack;
  }
  if(randommath==9||randommath==8||randommath==7||randommath==6||randommath==5||randommath==4||randommath==3||randommath==2||randommath==1||randommath==0){
    this.item=hp;
  }
  this.x=25+((counter%3)*225);
  this.y=100+((counter-(counter%3))*100);
}
function IsCollidedMovingPointToPointOrPointToSurface(x,y,targetx,targety,targetwidth,targetheight){
  if(x>=targetx&&
    x<=targetx+targetwidth&&
    y>=targety&&
    y<=targety+targetheight){
    return true;
  }else{
    return false;
  }
}
function IsCollidedMovingPointToSurfaceOrSurfaceToSurface(x,y,width,height,targetx,targety,targetwidth,targetheight){
  if(IsCollidedMovingPointToPointOrPointToSurface(x,y,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(x+width,y,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(x,y+height,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(x+width,y+height,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx,targety,x,y,width,height)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx+targetwidth,targety,x,y,width,height)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx,targety+targetheight,x,y,width,height)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx+targetwidth,targety+targetheight,x,y,width,height)
    ){
    return true;
  }else{
    return false;
  }
}
function IsCollidedToWallsMovingPointOrSurface(x,y,width,height){
  for(var i=0;i<walls.length;i++){
    if(IsCollidedMovingPointToSurfaceOrSurfaceToSurface(walls[i].x,walls[i].y,walls[i].width,walls[i].height,x,y,width,height)){
      return true;
    }
  }
  return false;
}
document.onkeydown=function(){
  var keycode=event.which||event.keyCode;
  if(flag==1){
  if(keycode==100){
    p1.direction={x:-1,y:0};
  }
  if(keycode==104){
    p1.direction={x:0,y:-1};
  }
  if(keycode==102){
    p1.direction={x:1,y:0};
  }
  if(keycode==101){
    p1.direction={x:0,y:1};
  }
  if(keycode==70){
    p2.direction={x:-1,y:0};
  }
  if(keycode==84){
    p2.direction={x:0,y:-1};
  }
  if(keycode==72){
    p2.direction={x:1,y:0};
  }
  if(keycode==71){
    p2.direction={x:0,y:1};
  }
  if(keycode==37){
    p1key=37;
    p1.movedirection={x:-1,y:0};
  }
  if(keycode==38){
    p1key=38;
    p1.movedirection={x:0,y:-1};
  }
  if(keycode==39){
    p1key=39;
    p1.movedirection={x:1,y:0};
  }
  if(keycode==40){
    p1key=40;
    p1.movedirection={x:0,y:1};
  }
  if(keycode==65){
    p2key=65;
    p2.movedirection={x:-1,y:0};
  }
  if(keycode==87){
    p2key=87;
    p2.movedirection={x:0,y:-1};
  }
  if(keycode==68){
    p2key=68;
    p2.movedirection={x:1,y:0};
  }
  if(keycode==83){
    p2key=83;
    p2.movedirection={x:0,y:1};
  }
  }
};
document.onkeydown=function(){
  var keycode=event.which||event.keyCode;
  if(flag==1){
    if(keycode==96&&p1.Fightingbullet>0){
      var s=function(){
        var newbullet=new P1bullet();
        p1bullets.push(newbullet);
      }
      for(var i=0;i<p1.Shot;i++){
        setTimeout(s,500);
      }
      p1.Fightingbullet=p1.Fightingbullet-1;
    }
    if(keycode==86&&p2.Fightingbullet>0){
      var s=function(){
        var newbullet=new P2bullet();
        p2bullets.push(newbullet);
      }
      for(var i=0;i<p2.Shot;i++){
        setTimeout(s,500);
      }
      p2.Fightingbullet=p2.Fightingbullet-1;
    }
  }
}
document.onkeyup=function(){
  var keycode=event.which||event.keyCode;
  if((keycode==37||keycode==38||keycode==39||keycode==40)&&p1key==keycode){
    p1.movedirection={x:0,y:0};
  }
  if((keycode==65||keycode==87||keycode==68||keycode==83)&&p2key==keycode){
    p2.movedirection={x:0,y:0};
  }
};
var cursor={
  x:0,
  y:0
};
document.onmousemove=function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
};
document.onclick=function(event){
  if(flag==3){
    for(var i=0;i<upgrades.length;i++){
      if(IsCollidedMovingPointToPointOrPointToSurface(cursor.x,cursor.y,upgrades[i].x,upgrades[i].y,200,200)){
        if(choosing==1){
          if(upgrades[i].item==absorb){
            p1.Absorb=p1.Absorb+0.2;
          }
          if(upgrades[i].item==attack){
            p1.Attack=p1.Attack+10;
          }
          if(upgrades[i].item==bullet){
            p1.Bullet=p1.Bullet+1;
          }
          if(upgrades[i].item==critical){
            p1.Critical=p1.Critical+0.2;
          }
          if(upgrades[i].item==hp){
            p1.Hp=p1.Hp+100;
          }
          if(upgrades[i].item==retort){
            p1.Retort=p1.Retort+0.2;
          }
          if(upgrades[i].item==shot){
            p1.Shot=p1.Shot+1;
            p1.Attack=(p1.Attack/p1.Shot)+5;
          }
        }
        if(choosing==2){
          if(upgrades[i].item==absorb){
            p2.Absorb=p2.Absorb+0.2;
          }
          if(upgrades[i].item==attack){
            p2.Attack=p2.Attack+10;
          }
          if(upgrades[i].item==bullet){
            p2.Bullet=p2.Bullet+1;
          }
          if(upgrades[i].item==critical){
            p2.Critical=p2.Critical+0.2;
          }
          if(upgrades[i].item==hp){
            p2.Hp=p2.Hp+100;
          }
          if(upgrades[i].item==retort){
            p2.Retort=p2.Retort+0.2;
          }
          if(upgrades[i].item==shot){
            p2.Shot=p2.Shot+1;
            p2.Attack=(p2.Attack/p2.Shot)+5;
          }
        }
        upgrades[i].item=bg;
      }
    }
  }
};
function draw(){
  if(flag==0){
    walls.splice(0,walls.length);
    var newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    newwall=new Wall();
    walls.push(newwall);
    while(IsCollidedToWallsMovingPointOrSurface(p1.x,p1.y,20,20)){
      p1.x=Math.floor(Math.random()*311)+350;
      p1.y=Math.floor(Math.random()*641)+20;
    }
    while(IsCollidedToWallsMovingPointOrSurface(p2.x,p2.y,20,20)){
      p2.x=Math.floor(Math.random()*311)+20;
      p2.y=Math.floor(Math.random()*641)+20;
    }
    p1.Fightinghp=p1.Hp;
    p2.Fightinghp=p2.Hp;
    p1.Fightingbullet=p1.Bullet;
    p2.Fightingbullet=p2.Bullet;
    flag=1;
  }
  if(flag==1){
    clock=clock+1;
    ctx.drawImage(bg,0,0,700,700);
    for(var i=0;i<p1bullets.length;i++){
      p1bullets[i].move();
      if(p1bulletspliceflag==1){
        p1bullets.splice(i,1);
        p1bulletspliceflag=0;
      }else{
        ctx.drawImage(p1bullet,p1bullets[i].x,p1bullets[i].y,6,6);
      }
    }
    for(var i=0;i<p2bullets.length;i++){
      p2bullets[i].move();
      if(p2bulletspliceflag==1){
        p2bullets.splice(i,1);
        p2bulletspliceflag=0;
      }else{
        ctx.drawImage(p2bullet,p2bullets[i].x,p2bullets[i].y,6,6);
      }
    }
    for(var i=0;i<walls.length;i++){
    ctx.drawImage(wall,walls[i].x,walls[i].y,walls[i].width,walls[i].height);
    }
    if(p1.direction.y==-1){
      ctx.drawImage(p1u,p1.x,p1.y,20,20);
    }
    if(p1.direction.y==1){
      ctx.drawImage(p1d,p1.x,p1.y,20,20);
    }
    if(p1.direction.x==-1){
      ctx.drawImage(p1l,p1.x,p1.y,20,20);
    }
    if(p1.direction.x==1){
      ctx.drawImage(p1r,p1.x,p1.y,20,20);
    }
    if(p2.direction.y==-1){
      ctx.drawImage(p2u,p2.x,p2.y,20,20);
    }
    if(p2.direction.y==1){
      ctx.drawImage(p2d,p2.x,p2.y,20,20);
    }
    if(p2.direction.x==-1){
      ctx.drawImage(p2l,p2.x,p2.y,20,20);
    }
    if(p2.direction.x==1){
      ctx.drawImage(p2r,p2.x,p2.y,20,20);
    }
    p1.x=p1.x+(p1.movedirection.x*300/FPS);
    if(IsCollidedToWallsMovingPointOrSurface(p1.x,p1.y,20,20)||
    IsCollidedToWallsMovingPointOrSurface(p1.x-((150/FPS)-10),p1.y,300/FPS,20)||
    p1.x<20||p1.x>660){
      p1.x=p1.x-(p1.movedirection.x*300/FPS);
    }
    p1.y=p1.y+(p1.movedirection.y*300/FPS);
    if(IsCollidedToWallsMovingPointOrSurface(p1.x,p1.y,20,20)||
    IsCollidedToWallsMovingPointOrSurface(p1.x,p1.y-((150/FPS)-10),20,300/FPS)||
    p1.y<20||p1.y>660){
      p1.y=p1.y-(p1.movedirection.y*300/FPS);
    }
    p2.x=p2.x+(p2.movedirection.x*300/FPS);
    if(IsCollidedToWallsMovingPointOrSurface(p2.x,p2.y,20,20)||
    IsCollidedToWallsMovingPointOrSurface(p2.x-((150/FPS)-10),p2.y,300/FPS,20)||
    p2.x<20||p2.x>660){
      p2.x=p2.x-(p2.movedirection.x*300/FPS);
    }
    p2.y=p2.y+(p2.movedirection.y*300/FPS);
    if(IsCollidedToWallsMovingPointOrSurface(p2.x,p2.y,20,20)||
    IsCollidedToWallsMovingPointOrSurface(p2.x,p2.y-((150/FPS)-10),20,300/FPS)||
    p2.y<20||p2.y>660){
      p2.y=p2.y-(p2.movedirection.y*300/FPS);
    }
    ctx.drawImage(p1bullet,690,700-(700*p1.Fightinghp/p1.Hp),10,700*p1.Fightinghp/p1.Hp);
    ctx.drawImage(p2bullet,0,700-(700*p2.Fightinghp/p2.Hp),10,700*p2.Fightinghp/p2.Hp);
    if(clock%(FPS*3/2)==0||clock%(FPS*3/2)==0.5){
      if(p1.Fightingbullet<p1.Bullet){
        p1.Fightingbullet=p1.Fightingbullet+1;
      }
      if(p2.Fightingbullet<p2.Bullet){
        p2.Fightingbullet=p2.Fightingbullet+1;
      }
    }
    ctx.drawImage(bulletline,680,700-(700*p1.Fightingbullet/p1.Bullet),10,700*p1.Fightingbullet/p1.Bullet);
    ctx.drawImage(bulletline,10,700-(700*p2.Fightingbullet/p2.Bullet),10,700*p2.Fightingbullet/p2.Bullet);
    if(p1criticalmarktime>0){
      ctx.drawImage(criticalmark,660,0,20,20);
      p1criticalmarktime=p1criticalmarktime-1;
    }
    if(p1absorbmarktime>0){
      ctx.drawImage(absorbmark,640,0,20,20);
      p1absorbmarktime=p1absorbmarktime-1;
    }
    if(p1retortmarktime>0){
      ctx.drawImage(retortmark,620,0,20,20);
      p1retortmarktime=p1retortmarktime-1;
    }
    if(p2criticalmarktime>0){
      ctx.drawImage(criticalmark,20,0,20,20);
      p2criticalmarktime=p2criticalmarktime-1;
    }
    if(p2absorbmarktime>0){
      ctx.drawImage(absorbmark,40,0,20,20);
      p2absorbmarktime=p2absorbmarktime-1;
    }
    if(p2retortmarktime>0){
      ctx.drawImage(retortmark,60,0,20,20);
      p2retortmarktime=p2retortmarktime-1;
    }
    if(p1.Fightinghp<=0){
      choosing=2;
      flag=2;
    }
    if(p2.Fightinghp<=0){
      choosing=1;
      flag=2;
    }
  }
  if(flag==2){
    upgrades.splice(0,upgrades.length);
    counter=0;
    var newupgrade=new Upgrade();
    upgrades.push(newupgrade);
    counter=counter+1;
    var newupgrade=new Upgrade();
    upgrades.push(newupgrade);
    counter=counter+1;
    var newupgrade=new Upgrade();
    upgrades.push(newupgrade);
    counter=counter+1;
    var newupgrade=new Upgrade();
    upgrades.push(newupgrade);
    counter=counter+1;
    var newupgrade=new Upgrade();
    upgrades.push(newupgrade);
    counter=counter+1;
    var newupgrade=new Upgrade();
    upgrades.push(newupgrade);
    flag=3;
  }
  if(flag==3){
    ctx.drawImage(bg,0,0,700,700);
    for(var i=0;i<upgrades.length;i++){
      ctx.drawImage(upgrades[i].item,upgrades[i].x,upgrades[i].y,200,200);
    }
    if(choosing==1){
      ctx.drawImage(p1l,660,340,20,20);
    }
    if(choosing==2){
      ctx.drawImage(p2r,20,340,20,20);
    }
    if(upgrades[1].item==bg&&upgrades[2].item==bg&&upgrades[3].item==bg&&upgrades[4].item==bg&&upgrades[5].item==bg&&upgrades[6].item==bg){
      flag=0;
    }
  }
}
setInterval(draw,1000/FPS);
