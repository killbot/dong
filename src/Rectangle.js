//simple Class for rectangle,

function Rectangle(l, t, w, h){
    this.left = l;
    this.top = t;
    this.width = w;
    this.height = h;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;

    this.getTopLeft = function(){
        return this.left, this.top;
    }

    this.getCenter = function(){
        var x = this.left + this.width/2;
        var y = this.top + this.height/2;
        return x, y;
    }
}

