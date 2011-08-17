function Paused(){
    name = "Paused";
    this.onLoad = function(){

    }
    this.onExit = function(){

    }
    this.drawState = function(){

    }
}
Paused.prototype = new GameState();
Paused.prototype.constructor = Paused;
