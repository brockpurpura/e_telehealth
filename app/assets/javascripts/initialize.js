// Detect and redirect if IE
function detectIE(){
  var ms_ie = false;
  var ua = window.navigator.userAgent;
  var old_ie = ua.indexOf('MSIE ');
  var new_ie = ua.indexOf('Trident/');

  if ((old_ie > -1) || (new_ie > -1)) {
    ms_ie = true;
  }

  if ( ms_ie ) {
    swal({ title: "Internet Explorer Is Not Supported", text: "Please use a different browser.", type: "error", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false}, function(){window.location = '/home/dial';}); 
    return false;
  }
  else {
    return true;
  }
}
    
