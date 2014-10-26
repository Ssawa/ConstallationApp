var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.width = $("#canvasDiv").width();
canvas.height = $("#canvasDiv").height();
canvas.setAttribute('id', 'drawingCanvas');
canvasDiv.appendChild(canvas);
context = canvas.getContext("2d");

var clickX = new Array();
var clickY = new Array();
var lines = new Array();
var stars = new Array();
var mouse_clicked;

var img=new Image()
img.src = "images/TaurusVector.svg";

generateStars();

function line(startX, startY, endX, endY) {
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
}

function star(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
}

function generateStars() {
	for(var i=0; i < 500; i++){
    var x=parseInt(Math.random()*canvas.width);
    var y=parseInt(Math.random()*canvas.height);
    var radius=Math.random()*1.5;
    stars.push(new star(x, y, radius));
	}
}

function redraw() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.drawImage(img,20,20);

	context.beginPath();
	for(var i=0; i < stars.length; i++){
	    context.arc(stars[i].x,stars[i].y,stars[i].radius,0,Math.PI*2,false);
	    context.closePath();
	}
	context.fillStyle= "white";
	context.fill();

	context.strokeStyle = "white";
	context.lineJoin = "round";
	context.lineWidth = 1;

	for(var i=0; i < lines.length; i++) {
		context.beginPath();
		context.moveTo(lines[i].startX, lines[i].startY);
		context.lineTo(lines[i].endX, lines[i].endY);
		context.closePath();
		context.stroke();
	}

	if(mouse_clicked)
		context.beginPath();
		context.moveTo(clickX[0], clickY[0]);
		context.lineTo(clickX[1], clickY[1]);
		context.closePath();
		context.stroke();
}

$('#drawingCanvas').mousedown(function(e) {
	mouse_clicked = true;
	clickX[0] = e.pageX - this.offsetLeft;
	clickY[0] = e.pageY - this.offsetTop;
	redraw();
});

$('#drawingCanvas').mousemove(function(e) {
	clickX[1] = e.pageX - this.offsetLeft;
	clickY[1] = e.pageY - this.offsetTop;

	if(mouse_clicked)
		redraw();
});

$('#drawingCanvas').mouseup(function(e) {
	mouse_clicked = false;
	lines.push(new line(clickX[0], clickY[0], clickX[1], clickY[1]));
});