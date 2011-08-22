//Paddle class.  inhierits from Entity in Entity.js.
//Note that the x_pos and y_pos coordinates represents the upper-left corner
//of the box in the Paddle's case.

function Paddle(color){
    Entity.call(this);
    this.side;   //indicates which side the paddle is on, left or right
    this.outlineColor = color;
    this.outlineColorLeft = "#11A";  //left = bluish
    this.outlineColorRight = "#A11"; //right = redish
    this.thickness = 4;
    this.height = 30;
    this.width = 10;
    this.maxSpeed = 0.25;
    this.speed = 0;
    this.draw = function(){
//        gameContext.beginPath();
        gameContext.lineWidth = this.thickness;
        gameContext.strokeStyle = this.outlineColor;
//        alert("x="+this.x_pos+", y="+this.y_pos);
        gameContext.strokeRect(this.x_pos, this.y_pos, this.width, this.height);
    }
    this.update = function(){
        this.y_pos = this.y_pos + this.y_velocity*1000/fps;    
    }
    this.move = function(direction_degrees){
//        alert("before direction set ="+this.direction);
        this.direction = direction_degrees;
//        alert("after direction set ="+this.direction);
        this.speed = this.maxSpeed;
        this.y_velocity = this.maxSpeed*Math.sin(Math.PI/180*this.direction);
//        alert("y_velocity = "+this.y_velocity);
    }
    this.stop = function(direction_degrees){
        this.speed = 0;
        this.y_velocity = 0;
    }

    this.getRect = function(){ //returns the rectangle that bounds the Paddle
        var tempRect = new Rectangle(this.x_pos, this.y_pos, this.width, this.height);
        return tempRect;

    }
}
Paddle.prototype = new Entity();
Paddle.prototype.constructor = Paddle;

