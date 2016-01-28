var FPS=60
var flag=0;
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
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
var p1={
  x:Math.floor(Math.random()*331)+350,
  y:Math.floor(Math.random()*681),
  direction:{x:-1,y:0},
  attack:15,
  critical:1.2,
  shot:1,
  absorb:0,
  armor:100,
  hp:100,
  retort:0
};
var p2={
  x:Math.floor(Math.random()*331),
  y:Math.floor(Math.random()*681),
  direction:{x:1,y:0},
  attack:15,
  critical:1.2,
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
function p1bullet(){
  this.x=p1.x+7;
  this.y=p1.y+7;
  this.direction=p1.direction;
}
function p2bullet(){
  this.x=p2.x+7;
  this.y=p2.y+7;
  this.direction=p2.direction;
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
function IsCollidedToWalls(x,y,width,height){
  for(var i=0;i<walls.length;i++){
    if(IsCollidedMovingPointToSurfaceOrSurfaceToSurface(walls[i].x,walls[i].y,walls[i].width,walls[i].height,x,y,width,height)){
      return true;
    }
  }
  return false;
}
document.onkeydown=function(){
  var keycode=event.which||event.keyCode;
  if(keycode==37){
    p1.x=p1.x-(65/FPS);
  }
  if(keycode==38){
    p1.y=p1.y-(65/FPS);
  }
  if(keycode==39){
    p1.x=p1.x+(65/FPS);
  }
  if(keycode==40){
    p1.y=p1.y+(65/FPS);
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
    while(IsCollidedToWalls(p1.x,p1.y,20,20)){
      p1.x=Math.floor(Math.random()*331)+350;
      p1.y=Math.floor(Math.random()*681);
    }
    while(IsCollidedToWalls(p2.x,p2.y,20,20)){
      p2.x=Math.floor(Math.random()*331);
      p2.y=Math.floor(Math.random()*681);
    }
    flag=1;
  }
  if(flag==1){
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
  }
}
setInterval(draw,1000/FPS);
