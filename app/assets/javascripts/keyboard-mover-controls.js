var leftKeyCode       = 37;
var upKeyCode         = 38;
var rightKeyCode      = 39;
var downKeyCode       = 40;

$(window).keydown(function (e) {
    var keyCode = e.which;

   /*
        Listens for arrow key presses when the 'move' icon is in focus
    */
    if ((keyCode == rightKeyCode || keyCode == leftKeyCode || keyCode == downKeyCode || keyCode == upKeyCode) && isMoveElement(document.activeElement)) {
        
        var parentPanel = getParentPanel(document.activeElement);

        if (parentPanel != null && parentPanel != false) {
            switch(keyCode) {
                case rightKeyCode: 
                    if ($(parentPanel).offset().left < ($(window).width() - $(parentPanel).outerWidth())) {
                        $(parentPanel).css("left", "+=10");
                    }
                    break;
                case leftKeyCode: 
                    if ($(parentPanel).offset().left > 10) {
                        $(parentPanel).css("left", "-=10");
                    } else {
                        $(parentPanel).css("left", "0");
                    }
                    break;
                case downKeyCode: 
                    if ($(parentPanel).offset().top < ($(window).height() - $(parentPanel).outerHeight())) {
                        $(parentPanel).css("top", "+=10");
                    }
                    break;
                case upKeyCode: 
                    if ($(parentPanel).offset().top > 64) {
                        $(parentPanel).css("top", "-=10");
                    } else {
                        $(parentPanel).css("top", "54");
                    }
                    break;
            }
        }
    }
});

// If the element ID starts with 'move_' return true, else return false
function isMoveElement(element) {
  if (!($(element).attr('id') == undefined)) {
    return $(element).attr('id').startsWith("move_") ? true : false;
  }
}

function getParentPanel(obj) {
    // Possible parent div elements of the active 'move' icon
    possibleParents = [ '#bookmark_partial', 
                        '#snapshot', 
                        '#sliders', 
                        '#control_partial', 
                        '#self_view_widget',
                        '#help',
                        '#alerts',
                        '#content_sharing_partial'];

    return getObj(obj, possibleParents);
}

function getObj(obj, possibleParents) {
    for (i = 0; i < possibleParents.length; i++) {
    if ($(obj).closest(possibleParents[i]) != null && ($(obj).closest(possibleParents[i]).length !== 0)) {
        return $(obj).closest(possibleParents[i]);
    } 
    }
    return false;
}
