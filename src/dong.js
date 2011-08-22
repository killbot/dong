//Javascript Dong game, pong clone.  
//Dave Homan Aug 15, 2011

//document.write('<script type="text/javascript" src="src/require.js"></script>');


require("src/cm_global.js");
require("src/roundRect.js");
require("src/GameState.js");
require("src/StartMenu.js");
require("src/Playing.js");
require("src/Paused.js");
require("src/getPosition.js");
require("src/Entity.js");
require("src/Border.js");
require("src/Paddle.js");
require("src/Puck.js");
require("src/Rectangle.js");

function init(){
    listenerCanvas = document.getElementById("listenerCanvas");
    dongCanvas = document.getElementById("dongCanvas");
    dongCanvas2 = document.getElementById("dongCanvas2");
    CanvasBuffer = [dongCanvas, dongCanvas2];
    gameContext = CanvasBuffer[hidden].getContext("2d");
    bgCanvas = document.getElementById("bgCanvas");
    bgContext = bgCanvas.getContext("2d");
    stateArray[0] = new StartMenu();
    stateArray[1] = new Playing();
    stateArray[2] = new Paused();
    currentState = 0;
    stateArray[currentState].onLoad();
    drawBackground();
    drawGameWindow();
    gameContext.fillStyle = "#BBB";
    flip();

}

function main(){
    init();
    setInterval(gameLoop, 1000/fps);
}

function gameLoop(){
    clear();
    update();
    draw();
    flip();
}

function clear(){
//    clearCanvas(bgContext, bgCanvas);
    clearCanvas(gameContext, CanvasBuffer[hidden]);
}

function update(){
//update background
//    updateBackground();
//update game canvas and current state
    stateArray[currentState].updateState();
//    alert("updating state: "+currentState);
}

function draw(){
//    drawBackground();
    drawGameWindow();
}

function flip(){    //flips the double-buffered display
    CanvasBuffer[hidden].style.visibility='visible';
    CanvasBuffer[visible].style.visibility='hidden';
    hidden = 1-hidden;
    visible = 1-visible;
    gameContext = CanvasBuffer[hidden].getContext("2d");
}

function clearCanvas(context, canvas){
    context.clearRect(0,0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}

function drawBackground(){
   x = window.innerWidth;
   y = window.innerHeight;
   bgCanvas.width = x;
   bgCanvas.height = y;
   bgContext.fillStyle = bgColor;
   bgContext.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
}

function drawGameWindow(){
    x = bgCanvas.width/2-dongCanvas.width/2;
    y = bgCanvas.height/2-dongCanvas.height/2;
    gameContext.fillStyle="#111";
    gameContext.fillRect(0, 0, dongCanvas.width, dongCanvas.height);
    stateArray[currentState].drawState();
}

function require(jspath){
    document.write('<script type="text/javascript" src="'+jspath+'"><\/script>');
}
