var FPS=60
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var p1plane=document.createElement("img");
p1plane.src="images/p1plane.png";
var p2plane=document.createElement("img");
p2plane.src="images/p2plane.png";
var commonball=document.createElement("img");
commonball.src="images/commonball.png";
var rareball=document.createElement("img");
rareball.src="images/rareball.png";
var epicball=document.createElement("img");
epicball.src="images/epicball.png";
var legendaryball=document.createElement("img");
legendaryball.src="images/legendaryball.png";
function draw(){
  ctx.drawImage(p1plane,0,0);
}
setInterval(draw,1000/FPS);
