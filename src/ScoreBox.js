//Scorebox class.  inheirits from Entity just in case I want to fly it around
//the screen later all fancy crazy.

function ScoreBox(color, fontColor, x, y, width, height){
    Entity.call(this);
    this.color = color;
    this.fontColor = fontColor;
    this.width = width;
    this.height = height;
    this.radius = 3;
    this.x_pos = x;      //the left of the box
    this.y_pos = y;      //the top of the box
    this.textStyle = "24px VT323"
    this.score = 0;     //the player's score
    
    this.update = function(){
    }
    this.draw = function(){
        gameContext.fillStyle = this.color;
        gameContext.lineWidth = 1;
        roundRect(gameContext, this.x_pos, this.y_pos, this.width, 
                        this.height, this.radius, true, false);
        gameContext.textAlign = "right";
        gameContext.textBaseline = "bottom";
        gameContext.font = this.textStyle;
        gameContext.fillStyle = fontColor;
        gameContext.fillText(this.score, this.x_pos + this.width, 
                        this.y_pos + this.height);
    }
    this.getrect = function(){
        var tempRect = new Rectangle(this.x_pos, this.y_pos, 
                        this.width, this.height); 
        return tempRect;
    }

        


}
ScoreBox.prototype = new Entity();
ScoreBox.prototype.constructor = ScoreBox;




