//dong class.  has no base class, i guess other than Object().  w/e.

function Paddle(color){
    Entity.call(this);
    this.side;   //indicates which side the paddle is on, left or right
    this.outlineColor = color;
    this.outlineColorLeft = "#11A";  //left = bluish
    this.outlineColorRight = "#A11"; //right = redish
    this.thickness = 4;
    this.height = 30;
    this.width = 10;
    this.maxSpeed = 30;
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
       this.direction = direction_degrees;
       this.y_velocity = this.maxSpeed*Math.sin(Math.Pi/180*this.direction);
    }
    this.stop = function(direction_degrees){
        this.y_velocity = 0;
    }
}
Paddle.prototype = new Entity();
Paddle.prototype.constructor = Paddle;

