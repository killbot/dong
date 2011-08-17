//simple gamestate base class

function GameState(){
    name;
    this.drawState = function(){
    }
    this.onLoad = function(){
    }
    this.onExit = function(){
    }
    this.getName = function(){
        return name;
    }
    this.changeState = function(state){
        //state argument is the state you wish to change to.
        //changeState() is not meant to be overloaded.
    if (state == "StartMenu"){
        stateArray[currentState].onExit();
        currentState = 0;
        stateArray[currentState].onLoad();
    }
    else if (state == "Playing"){
        stateArray[currentState].onExit();
        currentState = 1;
        stateArray[currentState].onLoad();
    }
    else if (state == "Paused"){
        stateArray[currentState].onExit();
        currentState = 2;
        stateArray[currentState].onLoad();
    }
    else {
        alert("INVALID STATE CHANGE TO STATE "+state);
    }

    }

}

