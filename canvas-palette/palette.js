"use strict"

function draw() {
let context = document.getElementById('canvasInAPerfectWorld').
               getContext("2d");
let canvas = document.getElementById('canvasInAPerfectWorld');
let clearButton = document.getElementById('clearButton');
let colorButton = document.getElementById('colorButton');
let eraserButton = document.getElementById('eraserButton');
let paint;
let isEraser;

canvas.onmousedown = function( e ){
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  paint = true;

  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop,
            false, isEraser);

  redraw();
};

canvas.onmousemove = function( e ){
  if(paint) {

    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop,
              true, isEraser);
    redraw();
  }
};

canvas.onmouseup = function( e ){
  paint = false;
};

canvas.onmouseleave = function( e ){
  paint = false;
};

clearButton.onclick = function( e ){
  clearCanvas();
  clearArrays();
};

let ccArrayIndex = 0; // index for clickColorArray
let colorArray = [];

colorArray = initColorArray(colorArray);

colorButton.onclick = function ( e ){
  ccArrayIndex = incrementArrayIndex(ccArrayIndex, colorArray);
  isEraser = false;
};

eraserButton.onclick = function( e ){
  isEraser = true;
  console.log("Click");
};


let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let clickColor = new Array();

//TODO:
//      Save canvas
//      Display color combos on the side

function addClick(x, y, dragging, isEraser){
  let color = '';
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if (isEraser){
    clickColor.push('#ffffff');
  }
  else{
    clickColor.push(getRandomColor(colorArray[ccArrayIndex]));
  }
}


function initColorArray(colorArray){

  colorArray.push(['#ffffff', '#84dcc6', '#a5ffd6', '#ffa69e', '#ff686b']);

  colorArray.push(['#ed6a5a', '#f4f1bb', '#9bc1bc', '#5ca4a9', '#e6ebe0']);

  colorArray.push(['#f0b67f', '#fe5f55', '#d6d1b1', '#c7efcf', '#eef5db']);

  colorArray.push(['#50514f', '#f25f5c', '#ffe066', '#247ba0', '#70c1b3']);
  colorArray.push(['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654']);

  colorArray.push(['#E71D36', '#2EC4B6', '#EFFFE9', '#011627']);

  colorArray.push(["#96ceb4", "#ffeead", "ffcc5c", "#ff6f69",
      "#588c7e", "#f2e394", "#f2ae72", "#d96459"]);

  colorArray.push(['#D7FFF1', '#8CD790', '#77AF9C', '#285943'])

  colorArray.push(['#d4dfe6', '#8ec0e4', '#cadbe9', '#6aafe6']);
  return colorArray;
}

// implement circular array
function incrementArrayIndex(index, array){
  let resIndex = index+1;
  return resIndex%(array.length);
};

function clearCanvas(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function clearArrays(){
  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
}

function redraw(){
  clearCanvas();

  context.lineJoin = "round";
  context.lineWidth = 8;

  for( let i=0; i< clickX.length; i++){
    context.beginPath();

    if (clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    }
    else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }

    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}

function getRandomColor(colorArray){
  let randIndex = Math.floor((Math.random() * colorArray.length));
  return colorArray[randIndex];
}

}


