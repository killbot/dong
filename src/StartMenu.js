//specific GameState types.  base gamestate class found in GameState.js

function StartMenu(){
    name = "StartMenu";
    var textArray = [
        "Welcome to Dong", 
        "Controls:",
        "Left Dong A&Z", 
        "Right Dong M&K", 
        "SPACE to Serve",
        "--> Click to Start <--"
    ]
        var textColor = "#999";
        var textStyle = "64px VT323";
    this.drawState = function(){
        gameContext.fillStyle = textColor;
        gameContext.textAlign = "center";
        gameContext.textBaseline = "top";
        gameContext.font = textStyle;
        var i = 0;
        textArray.forEach(function(line){
            gameContext.fillText(line, dongCanvas2.width/2, 10+50*i);
            i+=2;
        });
    }
    this.updateState = function(){
        //do nothing
    }
    this.onLoad = function(){
        listenerCanvas.addEventListener("mousedown", mouseDown, false);
        listenerCanvas.addEventListener("mouseup", mouseUp, false);
    }
    this.onExit = function(){
        listenerCanvas.removeEventListener("mousedown", mouseDown, false);
        listenerCanvas.removeEventListener("mouseup", mouseUp, false);
    }
    function mouseDown(ev){
//        getPosition(ev);
    }
    function mouseUp(ev){
        getPosition(ev);
        x_left = 0;
        x_right = dongCanvas2.width;
        y_top = 10+50*10;
        y_bottom = dongCanvas2.height;
        if ((x_left < mouseCoords[0] && mouseCoords[0] < x_right)
                && (y_top < mouseCoords[1] && mouseCoords[1] < y_bottom)){
            stateArray[currentState].changeState("Playing");
            Playtomic.Log.Play();
        }

    }

}
StartMenu.prototype = new GameState();
StartMenu.prototype.constructor = StartMenu;
