//This sets mouseCoords to the current mouseCoordinates when fired.
//Also the mouseCoordinates are adjusted for scrolled windows

function getPosition(ev){  //returns coords relative to center of mainCanvas
    var x = ev.x;
    var y = ev.y;
    if (ev.x || ev.x == 0){                     //chrome
        x = ev.x;
        y = ev.y;
        var canvas = document.getElementById("dongCanvas2");
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
    }
    else if (ev.layerX || ev.layerX == 0){      //Firefox
        x = ev.layerX;
        y = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0){    //Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    else if (ev.pageX || ev.pageX == 0){        //Safari i think
        x = ev.pageX;
        y = ev.pageY;
    }
    else{                                       //Anything Else
        x = mainCanvas.width/2;
        y = mainCanvas.height/2;
    }
//    alert(document.body.scrollTop);
    y -= document.body.scrollTop;   //adjusts for having a scrolled window
    x -= document.body.scrollLeft;
//    alert("x="+x+", y="+y);
    mouseCoords[0] = x;
    mouseCoords[1] = y;
}
