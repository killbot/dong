//Border class.  inheirits from Entity in Entity.js so collisions can be used

function Border(color, thickness, y_value){
    Entity.call(this);
    this.color = color;
    this.thickness = thickness;
    this.x_pos = 0;
    this.y_pos = y_value;
    this.length = dongCanvas2.width;

    this.update = function(){
    }


    this.draw = function(){
        gameContext.beginPath();
        gameContext.lineWidth = this.thickness;
        gameContext.strokeStyle = this.color;
        gameContext.moveTo(this.x_pos,this.y_pos);
        gameContext.lineTo(this.x_pos + this.length, this.y_pos);
        gameContext.stroke();
    }
    this.getRect = function(){
        var tempRect = new Rectangle(this.x_pos, this.y_pos-this.thickness/2, this.length, this.thickness);
        return tempRect;
    }


}
Border.prototype = new Entity();
Border.prototype.constructor = Border;
