//specific GameState types.  base gamestate class found in GameState.js
function Playing(){
    name = "Playing";
    var lives = 5;
    var borderColor = "#CCC";
    var borderThickness = 15;
    var scoreBoxColor = "#111";
//    var scoreBoxColor = "rbga(255,255,255, .7)";
    var scoreTextColor = "#EEE";
    var scoreBoxWidth = 100;
    var scoreBoxHeight = 23;
    var topBorderThickness = 25;
    var leftPaddle = new Paddle("#11A", 10, 60);
    var rightPaddle = new Paddle("#A11", 10, 60);
    var puck = new Puck("#1A1", true);
    var topBorder = new Border(borderColor, topBorderThickness, topBorderThickness/2);
    var bottomBorder = new Border(borderColor, borderThickness, dongCanvas2.height-borderThickness/2);
    var puckList = [puck];
    var scoreBoard = new ScoreBox(scoreBoxColor, 
                            scoreTextColor, 
                            dongCanvas2.width/4,
                            1, 
                            scoreBoxWidth, 
                            scoreBoxHeight
                            );
    var a = 65;
    var z = 90;
    var k = 75;
    var m = 77;
    var esc = 27;
    var space = 32;
    var m1 = 1;     //m1 through m6 are used in the transformamtion matrix
    var m2 = 0;     //for the function warpCanvas();
    var m3 = 0;
    var m4 = 1;
    var m5 = 0;
    var m6 = 0;
    initPaddles();
    initPuck();


    this.onLoad = function(){
        listenerCanvas.addEventListener("keydown", keyDown, false);
        listenerCanvas.addEventListener("keyup", keyUp, false);
        listenerCanvas.addEventListener("click", replay, false);
    }
    this.onExit = function(){
        listenerCanvas.removeEventListener("keydown", keyDown, false);
        listenerCanvas.removeEventListener("keyup", keyUp, false);
        listenerCanvas.removeEventListener("click", replay, false);
    }
    this.updateState = function(){
        if (lives > 0){
            this.updateAll();
        }
    }
    this.updateAll = function(){
        for (i = puckList.length-1; i>=0; i--){   //GO THROUGH BACKWARDS PLZ
            if(checkCollision(leftPaddle, puckList[i])){
                puckList[i].move(-puckList[i].direction + 180, puckList[i].speed);
                scoreBoard.score += 5;
                puckList[i].update();   //needed so things don't get stuck
                puckList[i].update();   //inside other things
                if (scoreBoard.score%20==0){MAKEMULTIBALLS(4,puckList[i]);}
                puckList[i].speed += .005;
            }
            else if (checkCollision(rightPaddle, puckList[i])){
                puckList[i].move(-puckList[i].direction + 180, puckList[i].speed);
                scoreBoard.score += 5;
                puckList[i].update();
                puckList[i].update();
                if (scoreBoard.score%20==0){MAKEMULTIBALLS(4,puckList[i]);}
                puckList[i].speed += .005;
            }

            if(checkCollision(topBorder, puckList[i])){
                puckList[i].move(-puckList[i].direction, puckList[i].speed);
                puckList[i].update();
            }
            else if (checkCollision(bottomBorder, puckList[i])){
                puckList[i].move(-puckList[i].direction, puckList[i].speed);
                puckList[i].update();
            }
        
            if (puckList[i].x_pos+puckList[i].diameter*2 < 0 ||
                    puckList[i].x_pos-puckList[i].diameter*2 > dongCanvas2.width){
                if (puckList.length==1){    //only attach() the last puck, destroy others.
                    var paddle;
                    Math.random() <= 0.5 ? paddle = leftPaddle : paddle = rightPaddle;
                    lives -= 1;
                    puckList[i].attach(paddle);
                    
                }
                else {
                //    alert("x_pos of puck#3 = "+puckList[3].x_pos);
                //    alert("deleting puck #"+i+" size of puckList = "+puckList.length);
                    delete puckList[i];
                    puckList.splice(i, 1);
                }
            }
        }


        updateBorders(); 
        updatePaddles();
        updatePucks();
        updateScoreBoard();
    }
    this.drawState = function(){
        this.drawAll();

//        if (lives > 0){
//            this.drawAll();
//        }
//        else {
//            gameOver();
//        }
    }

    this.drawAll = function(){
        gameContext.fillStyle="#A00";
//        roundRect(gameContext, 100, 100, 100, 100, 5, true, false);
        drawBorders();
        drawLives();
        drawScoreBoard();
        drawPaddles();
        drawPucks();
//        if (scoreBoard.score >= 50){
//            warpCanvas();
//        }
        if (lives <= 0){
            drawGameOver();
        }
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
        puckList[0].attach(leftPaddle);    
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
                if (puckList[0].beingHeld){
                    puckList[0].pitch();
                }
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
    
    function replay(ev){
        if (lives <=0){
            makeNewGame();
            stateArray[currentState].changeState("Playing");
        }
    }
/*    function drawBorders(){
        gameContext.beginPath();
        gameContext.strokeStyle = borderColor;
        gameContext.lineWidth = borderThickness;
        gameContext.moveTo(0, borderThickness/2);
        gameContext.lineTo(dongCanvas2.width, borderThickness/2);
        gameContext.moveTo(dongCanvas2.width, dongCanvas2.height-borderThickness/2);
        gameContext.lineTo(0, dongCanvas2.height-borderThickness/2);
        gameContext.stroke();

    }
*/
    function updateBorders(){
        topBorder.update();
        bottomBorder.update();
    }
    function drawBorders(){
        topBorder.draw();
        bottomBorder.draw();
    }

    function drawPaddles(){
        leftPaddle.draw();
        rightPaddle.draw();
    }

    function updatePaddles(){
        leftPaddle.update();
        rightPaddle.update();
    }
    
    function drawPucks(){
        for (i in puckList){
            puckList[i].draw();
        }
    }
    function updatePucks(){
        for (i in puckList){
            puckList[i].update();
        }
    }

    function updateScoreBoard(){
        scoreBoard.update();
    }
    function drawScoreBoard(){
        scoreBoard.draw();
    }
    
    function drawLives(){
        var color = "#333";
        var textColor = "#003";
        var radius = 4;
        var y = dongCanvas2.height-borderThickness/2;
        var x = dongCanvas2.width - 10;
        gameContext.beginPath();
        gameContext.fillStyle = color;
        for (i=0; i < lives; i++){
            gameContext.arc(x, y, radius, 0, 2*Math.PI, true);
            x -= radius*2 + 1;
        }
        gameContext.fill();

    }
    
    function drawGameOver(){
        var x = dongCanvas2.width/4;
        var y = dongCanvas2.height/4;
        var width = dongCanvas2.width/2;
        var height = dongCanvas2.height/2;
        var r = 15;
        var fillColor = "#BBB";
        var textColor = "#246";
        gameContext.fillStyle = fillColor;
        roundRect(gameContext, x, y, width, height, r, true, false);
        gameContext.textAlign = "center";
        gameContext.textBaseline = "top";
        gameContext.fillStyle = textColor;
        gameContext.font = "60px VT323";
        var textArray = ["GAME OVER", 
                        "Your Score:",
                        scoreBoard.score, 
                        "-->Play Again<--"
                        ]
        for (i=0; i<textArray.length; i++){
            gameContext.fillText(textArray[i], x+width/2, y+10+60*i);
        }



    }

    function warpCanvas(){
        m1 += Math.random()+1;
        m2 += Math.random();
        m3 += Math.random()+1;
        m4 += Math.random();
        gameContext.transform(m1, m2, m3, m4, m5, m6);
    }

    function MAKEMULTIBALLS(n,somePuck){
        var n = n;
        if (!somePuck){var copiedPuck = puckList[0];}
        else{var copiedPuck = somePuck;}
        for (i=1; i<=n; i++){
            var r = Math.floor(Math.random()*230)+25;
            var g = Math.floor(Math.random()*230)+25;
            var b = Math.floor(Math.random()*230)+25;
            var a = Math.floor(Math.random()*8)/10+.2;
            var nuColor = "rgba("+r+","+g+","+b+","+a+")";
//            var nucolor = "rgba(100, 100, 255, .9)";
            puckList.push(new Puck(nuColor, 
                                    false, 
                                    copiedPuck.x_pos, 
                                    copiedPuck.y_pos, 
                                    copiedPuck.direction + Math.random()*15*2-15,
                                    copiedPuck.maxSpeed - .05,
                                    copiedPuck.diameter 
                                    ));
            a = puckList[i];
            //alert("new puck = "+a.color+", "+a.beingHeld+", "+a.x_pos+", "+a.y_pos+", "+a.direction+", "+a.currSpeed+", "+a.diameter);
        }
    }

    function checkCollision(entity1, entity2){
//        alert("inside collision checking");
        //checks for collisions between two game entities. returns true/false
        var rect1 = entity1.getRect();
        var rect2 = entity2.getRect();
        var x_collision = false;
        var y_collision = false;
//        alert("rect1 x = from "+rect1.left+" to "+rect1.right+", rect2 x = from "+rect2.left+" to "+rect2.right);
//        alert("rect1 y = from "+rect1.top+" to "+rect1.bottom+", rect2 x = from "+rect2.top+" to "+rect2.bottom);
        if (rect1.right+4 >= rect2.left && rect1.right <= rect2.right){
            x_collision = true;
//            alert("x collision case 1");
        }
        else if (rect2.right+4 >= rect1.left && rect2.right <= rect1.right){
            x_collision = true;
//            alert("x collision case 2");
        }
        if (rect1.bottom >= rect2.top && rect1.bottom <= rect2.bottom){
            y_collision = true;
//            alert("y collision case 1");
        }
        else if (rect2.bottom >= rect1.top && rect2.bottom <= rect1.bottom){
            y_collision = true;
//            alert("y collision case 2");
        }
        
        if (x_collision && y_collision){
//            alert("collision detected");
            return true;
        }
        else{
            return false;
        }



        
    }

}
Playing.prototype = new GameState();
Playing.prototype.constructor = Playing;
