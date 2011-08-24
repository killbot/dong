//Puck class.  inheirits from Entity in Entity.js

function Puck(color, beingHeld, x, y, direction, speed, diameter){
    Entity.call(this);
    this.color = color;
    this.thickness = 3;
    if (!x){this.x_pos = 0;}
    else{this.x_pos = x;}
    if (!y){this.y_pos = 0;}
    else{this.y_pos = y;}
    if (!direction){this.direction = 0;}
    else{this.direction = direction;}
    if (!speed){this.speed = 0;}
    else{this.speed = speed;}
    if (!diameter){this.diameter = 25;}
    else{this.diameter = diameter;}

    this.maxSpeed = .5;         //speed in some bullshit units, like pixels
                                //per frame or some shit.  i dunno.
    this.beingHeld = beingHeld; //represents the object state of being held 
                                //for pitching by a paddle or not.
    this.paddle = null;
    this.paddleRect = null;     //paddle that the puck is attached to.  null otherwise;
    

    this.update = function(){
        if (this.beingHeld){
            this.direction = this.paddle.direction;
            this.speed = this.paddle.speed;
            this.x_velocity = 0;
            this.y_velocity = this.speed * Math.sin(Math.PI/180*this.direction);
        //    alert("rect x and y = "+this.paddleRect.left+", "+this.paddleRect.top);
        }
        else{
            this.x_velocity = this.speed * Math.cos(Math.PI/180*this.direction);
            this.y_velocity = this.speed * Math.sin(Math.PI/180*this.direction);
        }
        this.y_pos = this.y_pos + this.y_velocity*1000/fps;
        this.x_pos = this.x_pos + this.x_velocity*1000/fps;
    }

    this.move = function(direction_degrees, speed){  //similar to Paddle's move() method.
        this.direction = direction_degrees;
        this.speed = speed;
        this.x_velocity = this.speed*Math.cos(Math.PI/180*this.direction);
        this.y_velocity = this.speed*Math.sin(Math.PI/180*this.direction);
    }

    this.draw = function(){
        gameContext.beginPath();
        gameContext.lineWidth = this.thickness; //not used if filled
        gameContext.fillStyle = this.color;
        gameContext.arc(this.x_pos, this.y_pos, this.diameter/2, 0, 2*Math.PI, true);
        gameContext.fill();
//        alert("inside puck draw");
    }

    this.getRect = function(){
        var tempRect = new Rectangle(this.x_pos-this.diameter/2, this.y_pos-this.diameter/2, 
                                        this.diameter/2, this.diameter/2);
        return tempRect;
    }

    this.attach = function(paddle){     //this is used for attaching the puck to a paddle
        this.beingHeld = true;
        this.paddle = paddle
        this.paddleRect = this.paddle.getRect();
        var fuzzFactor = 5;
        if (this.paddleRect.left < dongCanvas2.width/2){
            x = this.paddleRect.left+this.paddleRect.width+this.diameter/2+5;
        }
        else {
            x = this.paddleRect.left - this.diameter/2 - 5;
        }
        y = this.paddleRect.top + this.paddleRect.height/2;
        this.x_pos = x;
        this.y_pos = y;

    }

    this.pitch = function(){            //pitches the puck from a paddle.
        this.beingHeld = false;
        this.attachedTo = null;
        var angleBounds = 45;           //in degrees;  
        var leftOrRight;    //see below. 0 if on the left side. 1 if on right
        if (this.x_pos < dongCanvas2.width/2){leftOrRight = 0;}
        else {leftOrRight = 1;}
        this.move(Math.random()*angleBounds*2-angleBounds + 180*leftOrRight, this.maxSpeed);
//        alert("max speed for puck = "+this.maxSpeed);         
    }



    
}
Puck.prototype = new Entity();
Puck.prototype.constructor = Puck;
