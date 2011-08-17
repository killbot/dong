//specific GameState types.  base gamestate class found in GameState.js
function Playing(){
    name = "Playing";
    var borderColor = "#CCC";
    var borderThickness = "15";
    var leftPaddle = new Paddle("#11A");
    var rightPaddle = new Paddle("#A11");
    leftPaddle.x_pos = 10;
    leftPaddle.y_pos = dongCanvas2.height/2;
    rightPaddle.x_pos = dongCanvas2.width-10-rightPaddle.width;
    rightPaddle.y_pos = dongCanvas2.height/2;



    this.onLoad = function(){
        listenerCanvas.addEventListener("keydown", keyDown, false);
        listenerCanvas.addEventListener("keyup", keyUp, false);
    }
    this.onExit = function(){
        listenerCanvas.removeEventListener("keydown", keyDown, false);
        listenerCanvas.removeEventListener("keyup", keyUp, false);
    }
    this.updateState = function(){
    }
    this.drawState = function(){
        gameContext.fillStyle="#A00";
        roundRect(gameContext, 100, 100, 100, 100, 5, true, false);
        drawBorders();
        drawPaddles();
    }
    this.move = function(){
        

    }
    
    function keyDown(ev){
        var a = 65;
        var z = 90;
        var k = 75;
        var m = 77;
        var esc = 27;
        var space = 32;
        switch(ev.keyCode){
            case a: 
                leftPaddle.move(270);
            case z: 
                leftPaddle.move(90);
            case k: 
                rightPaddle.move(270);
            case m: 
                rightPaddle.move(90);
            case esc:   //pause game please 
            case space: //pitch the puck
            default:
        }
    }
    function keyUp(ev){

    }
    
    function drawBorders(){
        gameContext.strokeStyle = borderColor;
        gameContext.lineWidth = borderThickness;
        gameContext.beginPath();
        gameContext.moveTo(0, borderThickness/2);
        gameContext.lineTo(dongCanvas2.width, borderThickness/2);
        gameContext.moveTo(dongCanvas2.width, dongCanvas2.height-borderThickness/2);
        gameContext.lineTo(0, dongCanvas2.height-borderThickness/2);
        gameContext.stroke();

    }
    function drawPaddles(){
        leftPaddle.draw();
        rightPaddle.draw();
    }
    
}
Playing.prototype = new GameState();
Playing.prototype.constructor = Playing;
