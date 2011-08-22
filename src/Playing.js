//specific GameState types.  base gamestate class found in GameState.js
function Playing(){
    name = "Playing";
    var borderColor = "#CCC";
    var borderThickness = "15";
    var leftPaddle = new Paddle("#11A");
    var rightPaddle = new Paddle("#A11");
    var puck = new Puck("#1A1");
//    var entityList =[leftPaddle,
//                rightPaddle, 
//                puck
//                ];
    var a = 65;
    var z = 90;
    var k = 75;
    var m = 77;
    var esc = 27;
    var space = 32;
    initPaddles();
    initPuck();

    this.onLoad = function(){
        listenerCanvas.addEventListener("keydown", keyDown, false);
        listenerCanvas.addEventListener("keyup", keyUp, false);
    }
    this.onExit = function(){
        listenerCanvas.removeEventListener("keydown", keyDown, false);
        listenerCanvas.removeEventListener("keyup", keyUp, false);
    }
    this.updateState = function(){
        checkCollision(leftPaddle, puck);
        checkCollision(rightPaddle, puck);
        updatePaddles();
        updatePuck();


    }
    this.drawState = function(){
        gameContext.fillStyle="#A00";
//        roundRect(gameContext, 100, 100, 100, 100, 5, true, false);
        drawBorders();
        drawPaddles();
        drawPuck();
    }
//    this.move = function(){
//        
//
//    }
    function initPaddles(){
        leftPaddle.x_pos = 10;
        leftPaddle.y_pos = dongCanvas2.height/2;
        rightPaddle.x_pos = dongCanvas2.width-10-rightPaddle.width;
        rightPaddle.y_pos = dongCanvas2.height/2;
        
    }
    function initPuck(){
        puck.attach(leftPaddle);    
    }
    
    function keyDown(ev){
//        alert("keydown event = "+ev.keyCode);
        switch(ev.keyCode){
            case a: 
                leftPaddle.move(270);
                break;
            case z: 
                leftPaddle.move(90);
                break;
            case k: 
                rightPaddle.move(270);
                break;
            case m: 
                rightPaddle.move(90);
                break;
            case esc:   //pause game please 
                break;
            case space: //pitch the puck
                puck.pitch();
                break;
            default:
                break;
        }
    }
    function keyUp(ev){
        switch(ev.keyCode){
            case a:
                if (leftPaddle.y_velocity = 270){leftPaddle.stop();}
                break;
            case z:
                if (leftPaddle.y_velocity = 90){leftPaddle.stop();}
                break;
            case k:
                if (rightPaddle.y_velocity = 270){rightPaddle.stop();}
                break;
            case m:
                if (rightPaddle.y_velocity = 90){rightPaddle.stop();}
                break;
            default:
                break;


        }
    }    
    
    function drawBorders(){
        gameContext.beginPath();
        gameContext.strokeStyle = borderColor;
        gameContext.lineWidth = borderThickness;
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

    function updatePaddles(){
        leftPaddle.update();
        rightPaddle.update();
    }
    
    function drawPuck(){
        puck.draw();
    }
    function updatePuck(){
        puck.update();
    }
    function checkCollision(entity1, entity2){
        alert("inside collision checking");
        //checks for collisions between two game entities. returns true/false
        var rect1 = entity1.getRect();
        var rect2 = entity2.getRect();
        var x_collision = false;
        var y_collision = false;
        if (rect1.right >= rect2.left && rect1.right <= rect2.right){
            x_collision = true;
        }
        else if (rect2.right >= rect1.eft && rect2.right <= rect1.right){
            x_collision = true;
        }
        if (rect1.bottom >= rect2.top && rect1.bottom <= rect2.bottom){
            y_collision = true;
        }
        else if (rect2.bottom >= rect1.top && rect2.bottom <= rect1.bottom){
            y_collision = true;
        }
        
        if (x_collision && y_collision){
            return true;
            alert("collision detected");
        }
        else{
            return false;
        }



        
    }

}
Playing.prototype = new GameState();
Playing.prototype.constructor = Playing;
