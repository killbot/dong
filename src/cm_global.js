var dongCanvas;     //canvas element    
var dongContext;    //context element for the dongCanvas
var dongCanvas2;    //Identical dong canvas/context for use of
var dongContext2;   //double buffering
var gameContext;
var CanvasBuffer = [];//array for holding both double-buffered game canvases
var hidden = 1;
var visible = 0;    //hidden and visible 
var listenerCanvas; //for laying on top and being invisible but capturing events
var bgCanvas;
var bgContext;
var bgColor = "#222";
var currentState;
var startMenu;
var playing;
var paused;
var stateArray = new Array(3);
var mouseCoords = [0,0];


var fps = 30;       //frames per second




