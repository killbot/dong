//specific GameState types.  base gamestate class found in GameState.js
function Playing(){
    name = "Playing";
    var borderColor = "#CCC";
    var borderThickness = "15";
    this.onLoad = function(){
        listenerCanvas.addEventListener("keydown", doKeyDown, false);
    }
    this.onExit = function(){
        listenerCanvas.removeEventListener("keydown", doKeyDown, false);
    }
    this.updateState = function(){
    }
    this.drawState = function(){
        gameContext.fillStyle="#A00";
        roundRect(gameContext, 100, 100, 100, 100, 5, true, false);
        drawBorders();
        drawDongs();
    }

    function doKeyDown(ev){
        //z = 90
        //z = 65
        //k = 75
        //m = 77
        //esc = 27
        //space = 32
        alert("do key down pressed");
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
    function drawDongs(){

    }
}
Playing.prototype = new GameState();
Playing.prototype.constructor = Playing;
