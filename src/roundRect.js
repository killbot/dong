function roundRect(context, x, y, width, height, radius, fill, stoke){
    if (typeof stroke == "undefined" ) {
       stroke = false;
    }
    if (typeof radius ==="undefined"){
        radius = 5;
    }
    context.beginPath();
    context.moveTo(x+radius, y);
    context.lineTo(x+width-radius, y);
    context.quadraticCurveTo(x+width, y, x+width, y+radius);
    context.lineTo(x+width, y+height-radius);
    context.quadraticCurveTo(x+width, y+height, x+width-radius, y+height);
    context.lineTo(x+radius, y+height);
    context.quadraticCurveTo(x, y+height, x, y+height-radius);
    context.lineTo(x, y+radius);
    context.quadraticCurveTo(x, y, x+radius, y);
    context.closePath();
    if (stroke){
        context.stroke();
    }
    if (fill) {
    context.fill();
    }
}
