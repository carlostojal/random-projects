
//
// Copyright (c) Carlos Tojal 2020
// drawing-app 
// drawing-app.js
//

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var black = document.getElementById("black");
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

var isClicking = false;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

canvas.fillStyle = "#000";

canvas.addEventListener('mousedown', function() {
    console.log("clicking");
    isClicking = true;
});

canvas.addEventListener('mouseup', function() {
    console.log("released");
    isClicking = false;
});

canvas.addEventListener('mousemove', function(evt) {
    if(isClicking)
        draw(evt);
    adjustPointer(evt);
});

function adjustPointer(evt) {
    console.log("adjusting");
    var rect = canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;
    ctx.moveTo(x, y);
    console.log("Move to (" + x + ", " + y + ")");
}

function draw(evt) {
    console.log("drawing");
    var rect = canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    console.log("Draw to (" + x + ", " + y + ")");
}
