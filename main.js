var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var tower1img=document.createElement("img");
tower1img.src="images/tower1.jpg";
function draw(){
  ctx.drawImage(tower1img,0,0);
}
setInterval(draw,15)
