//Base class for all objects that are interactable, like the puck and the paddles.

function Entity(){
    this.name = "blank entity";
    this.x_pos = 0;  //x and y are both used as the starting points for all
    this.y_pos = 0;  //drawings/paths/ects...
    this.maxSpeed = 0;
    this.direction = 0;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.draw = function(){
        //OVERLOAD me plz
    }
    this.update = function(){
        //Overload plz
    }
    this.move = function(){
        //Overload plz
    }

}
