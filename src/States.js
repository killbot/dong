//specific GameState types.  base gamestate class found in GameState.js

function StartMenu(){
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
    this.onLoad = function(){
        dongCanvas2.addEventListener("mousedown", mouseDown, false);
        dongCanvas2.addEventListener("mouseup", mouseUp, false);
        function mouseDown(ev){
            getPosition(ev);
        }
        function mouseUp(ev){
            getPosition(ev);

        }
    }
    this.onExit = function(){
        dongCanvas2.removeEventListener("mousedown", mouseDown, false);
        dongCanvas2.removeEventListener("mouseup", mouseUp, false);
    }

}
StartMenu.prototype = new GameState();
StartMenu.prototype.constructor = StartMenu;

function Playing(){
    this.onLoad = function(){

    }
    this.onExit = function(){

    }
    this.drawState = function(){

    }
}
Playing.prototype = new GameState();
Playing.prototype.constructor = Playing;





function Paused(){
    this.onLoad = function(){

    }
    this.onExit = function(){

    }
    this.drawState = function(){

    }
}
Paused.prototype = new GameState();
Paused.prototype.constructor = Paused;
