
var leftKeyCode       = 37;
var upKeyCode         = 38;
var rightKeyCode      = 39;
var downKeyCode       = 40;
var homeKeyCode       = 72;
var pohKeyCode        = 80;
var doorbellKeyCode   = 68;

var option_alt        = 18;
var plus              = 187;
var minus             = 189;
var x                 = 90;
var y                 = 88;
var shift             = 16;

var isFirstKeyPressed = false;
var isZooming         = false;
var isPanning         = false;

$(window).keydown(function (e) {
    var keyCode = e.which;
    if (keyCode == firstKeyCode) {
        isFirstKeyPressed = true;
    }
  
    if (keyCode == zoomOutKeyCode && !isZooming && isFirstKeyPressed) {
        zoom('wide');
        isZooming = true;
    }
    if (keyCode == zoomInKeyCode && !isZooming && isFirstKeyPressed) {
        zoom('tele');
        isZooming = true;
    }

    if (keyCode == leftKeyCode && !isPanning && isFirstKeyPressed) {
        pan('left');
        isPanning = true;
    }
    if (keyCode == upKeyCode && !isPanning && isFirstKeyPressed) {
        pan('up');
        isPanning = true;
    }
    if (keyCode == rightKeyCode && !isPanning && isFirstKeyPressed) {
        pan('right');
        isPanning = true;
    }
    if (keyCode == downKeyCode && !isPanning && isFirstKeyPressed) {
        pan('down');
        isPanning = true;
    }
    
    /* Actions */
    if (keyCode == homeKeyCode && isFirstKeyPressed) {
        go_to_bookmark('Home');
    }
    if (keyCode == pohKeyCode && isFirstKeyPressed) {
        mutePatient();
    }
    if (keyCode == doorbellKeyCode && isFirstKeyPressed) {
        ringBell();
    }
})

$(window).keyup(function (e) {
    var keyCode = e.which;

    if (keyCode == firstKeyCode) {
        isFirstKeyPressed = false;
    }
    if (keyCode == zoomOutKeyCode && isZooming && isFirstKeyPressed) {
        zoom('stop')
        isZooming = false; 
    }
    if (keyCode == zoomInKeyCode && isZooming && isFirstKeyPressed) {
        zoom('stop');
        isZooming = false;
    }
    if (keyCode == leftKeyCode && isPanning && isFirstKeyPressed) {
        pan('stop');
        isPanning = false; 
    } 
    if (keyCode == upKeyCode && isPanning && isFirstKeyPressed) {
        pan('stop');
        isPanning = false; 
    } 
    if (keyCode == rightKeyCode && isPanning && isFirstKeyPressed) {
        pan('stop');
        isPanning = false; 
    } 
    if (keyCode == downKeyCode && isPanning && isFirstKeyPressed) {
        pan('stop');
        isPanning = false; 
    } 
});
