var FPS=60;
var counter=0;
var p1bulletspliceflag=0;
var p2bulletspliceflag=0;
var p1shotdelay=0;
var p2shotdelay=0;
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
var armoru=document.createElement("img");
armoru.src="images/u/armoru.png";
var armord=document.createElement("img");
armord.src="images/d/armord.png";
var armorl=document.createElement("img");
armorl.src="images/l/armorl.png";
var armorr=document.createElement("img");
armorr.src="images/r/armorr.png";
var gunu=document.createElement("img");
gunu.src="images/u/gunu.png";
var gund=document.createElement("img");
gund.src="images/d/gund.png";
var gunl=document.createElement("img");
gunl.src="images/l/gunl.png";
var gunr=document.createElement("img");
gunr.src="images/r/gunr.png";
var item=document.createElement("img");
item.src="images/item.png";
var p1bullet=document.createElement("img");
p1bullet.src="images/p1bullet.png";
var p2bullet=document.createElement("img");
p2bullet.src="images/p2bullet.png";
var wall=document.createElement("img");
wall.src="images/wall.png";
var walls=[];
var p1bullets=[];
var p2bullets=[];
var p1={
  x:Math.floor(Math.random()*311)+350,
  y:Math.floor(Math.random()*641)+20,
  direction:{x:-1,y:0},
  movedirection:{x:0,y:0},
  attack:15,
  critical:0.2,
  shot:1,
  absorb:0,
  armor:100,
  hp:100,
  retort:0
};
var p2={
  x:Math.floor(Math.random()*311)+20,
  y:Math.floor(Math.random()*641)+20,
  direction:{x:1,y:0},
  movedirection:{x:0,y:0},
  attack:15,
  critical:0.2,
  shot:1,
  absorb:0,
  armor:100,
  hp:100,
  retort:0
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
      var p2cost=p1.attack;
      var p1cost=0;
      var heal=0;
      if(Math.floor(Math.random()*4)==0){
        p2cost=p2cost+(p1.attack*p1.critical);
      }
      if(Math.floor(Math.random()*4)==0){
        heal=p2cost*p1.absorb;
      }
      if(Math.floor(Math.random()*4)==0){
        p1cost=p2cost*p2.retort;
      }
      p2.hp=p2.hp-p2cost;
      p1.hp=p1.hp-(p1cost-heal);
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
      var p1cost=p2.attack;
      var p2cost=0;
      var heal=0;
      if(Math.floor(Math.random()*4)==0){
        p1cost=p1cost+(p2.attack*p2.critical);
      }
      if(Math.floor(Math.random()*4)==0){
        heal=p1cost*p2.absorb;
      }
      if(Math.floor(Math.random()*4)==0){
        p2cost=p1cost*p1.retort;
      }
      p1.hp=p1.hp-p1cost;
      p2.hp=p2.hp-(p2cost-heal);
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
  if(keycode==96){
    if(p1shotdelay<=0){
      var newbullet=new P1bullet();
      p1bullets.push(newbullet);
      p1shotdelay=FPS;
    }
  }
  if(keycode==86){
    if(p2shotdelay<=0){
      var newbullet=new P2bullet();
      p2bullets.push(newbullet);
      p2shotdelay=FPS;
    }
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
}
function draw(){
  if(flag==0){
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
    flag=1;
  }
  if(flag==1){
    ctx.drawImage(bg,0,0,700,700);
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
    p1shotdelay=p1shotdelay-1;
    p2shotdelay=p2shotdelay-1;
  }
}
setInterval(draw,1000/FPS);
