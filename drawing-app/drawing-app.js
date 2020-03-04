
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

var width = document.getElementById("width");

var download = document.getElementById("download");

var isClicking = false;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// Get line width slider value
ctx.beginPath();
ctx.lineWidth = width.value;

// Left mouse button is clicked
canvas.addEventListener('mousedown', function() {
    console.log("clicking");
    isClicking = true;
});

// Left mouse button is released
canvas.addEventListener('mouseup', function() {
    console.log("released");
    isClicking = false;
});

// Mouse is moved
canvas.addEventListener('mousemove', function(evt) {
    if(isClicking)
        draw(evt);
    adjustPointer(evt);
});

// User presses screen
canvas.addEventListener('touchstart', function(evt) {
    console.log("touchstart");
    adjustTouchPointer(evt);
});

// User moves finger
canvas.addEventListener('touchmove', function(evt) {
    console.log("touchmove");
    drawTouch(evt);
    adjustTouchPointer(evt);
});

// Canvas pointer adjusting in touch devices
function adjustTouchPointer(evt) {
    console.log("adjusting");
    var rect = canvas.getBoundingClientRect();
    var x = evt.touches[0].clientX - rect.left;
    var y = evt.touches[0].clientY - rect.top;
    ctx.moveTo(x, y);
    console.log("Move to (" + x + ", " + y + ")");
}

// Canvas pointer adjusting in mouse devices
function adjustPointer(evt) {
    console.log("adjusting");
    var rect = canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;
    ctx.moveTo(x, y);
    console.log("Move to (" + x + ", " + y + ")");
}

// Canvas drawing in touch devices
function drawTouch(evt) {
    console.log("drawing");
    var rect = canvas.getBoundingClientRect();
    var x = evt.touches[0].clientX - rect.left;
    var y = evt.touches[0].clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    console.log("Draw to (" + x + ", " + y + ")");
}

// Canvas drawing in mouse devices
function draw(evt) {
    console.log("drawing");
    var rect = canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    console.log("Draw to (" + x + ", " + y + ") (" + ctx.fillStyle + ")");
}

// Touchbar events

// Palette
black.addEventListener('click', function() {
    ctx.beginPath();
    red.innerHTML = "";
    green.innerHTML = "";
    blue.innerHTML = "";
    black.innerHTML = "Active";
    ctx.strokeStyle = "#000000";
});

red.addEventListener('click', function() {
    ctx.beginPath();
    black.innerHTML = "";
    green.innerHTML = "";
    blue.innerHTML = "";
    red.innerHTML = "Active";
    ctx.strokeStyle = "#ff0000";
});

green.addEventListener('click', function() {
    ctx.beginPath();
    black.innerHTML = "";
    red.innerHTML = "";
    blue.innerHTML = "";
    green.innerHTML = "Active";
    ctx.strokeStyle = "#00ff00";
});

blue.addEventListener('click', function() {
    ctx.beginPath();
    black.innerHTML = "";
    red.innerHTML = "";
    green.innerHTML = "";
    blue.innerHTML = "Active";
    ctx.strokeStyle = "#0000ff";
});

// Reset drawing line width
width.addEventListener('click', function() {
    ctx.beginPath();
    ctx.lineWidth = width.value;
});

// Download button
download.addEventListener('click', function() {
    var image = canvas.toDataURL();
    window.location.href=image;
});