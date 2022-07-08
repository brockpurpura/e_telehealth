
const PORTRAIT = 0;
const LANDSCAPE = 1;
var camera_index = 0;
var dynamic_orientation = false;


// Listen for orientation changes
window.addEventListener("orientationchange", function() {
}, false);

window.addEventListener("load", function(e) {
  if (isMeeting) {
    dynamic_orientation = document.getElementById("use_dynamic_orientation").innerHTML;
    interval = parseInt(document.getElementById("dynamic_orientation_interval").innerHTML);
    if (parseInt(dynamic_orientation) == 1) {
      setInterval(changeView, interval);
    }
  } 
});

function switchCams() {
  camera_index += 1;
  if (camera_index > (Object.keys(videoHash).length - 1)) {
    camera_index = 0;
  }
  document.getElementById('d_video').innerHTML = Object.keys(videoHash)[camera_index];
  rtc.renegotiate();
  document.getElementById('selfvideo').srcObject = rtc.call.localStream; 
}

/**
 * Detect whether the orientation has changed to / is portrait and modify the fit of the incoming video stream if necessary
 */
function changeView() {
  var orientation = window.orientation || 0;
  $("#mobile_button_frame").removeClass('out_of_frame');
  $('#mobile_button_toggle').removeClass('other_way');

  if (orientation == PORTRAIT) {
    // Portrait
    $('#mobile_button_frame').width("100%");
    $('#mobile_button_toggle').addClass('hidden');

    var canvas  = document.getElementById('canvas');
    var webcam = document.getElementById('video');
    var context = canvas.getContext('2d');
    
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    context.drawImage(webcam, 0, 0, webcam.videoWidth, webcam.videoHeight);
    var leftarea = context.getImageData(0, webcam.videoHeight * 0.2, webcam.videoWidth / 3, webcam.videoHeight).data;
    var rightarea = context.getImageData(webcam.videoWidth - (webcam.videoWidth * 0.2), 0, webcam.videoWidth, webcam.videoHeight).data;

    //console.log("Left Colour is R: "+leftarea[0]+",G: "+leftarea[1]+",B: "+leftarea[2]);
    //console.log("Right Colour is R: "+rightarea[0]+",G: "+rightarea[1]+",B: "+rightarea[2]);

    if (is_letterboxed(leftarea, rightarea)) {
      // In Portrait mode, detected Portrait-in-landscape being sent
      document.getElementById("video").style.objectFit = "cover";
    } else {
      // In Portrait mode, Detected landcape being sent
      document.getElementById("video").style.objectFit = "contain";
    }

  }
  else {
    // Landscape
    $('#mobile_button_frame').width("80%");
    $('#mobile_button_toggle').removeClass('hidden');
  }
}

/**
 * Check whether the pixel areas given are within the RGB range (R, G, B = 20-30) for the letterboxing used by Pexip
 */
function is_letterboxed(leftarea, rightarea){
  return ((leftarea[0] >= 20 && leftarea[0] <= 30) && (leftarea[1] >= 20 && leftarea[1] <= 30) && (leftarea[2] >= 20 && leftarea[2] <= 30)) && 
  ((rightarea[0] >= 20 && rightarea[0] <= 30) && (rightarea[1] >= 20 && rightarea[1] <= 30) && (rightarea[2] >= 20 && rightarea[2] <= 30));
}

function toggleMobileButtons(){
  if ($('#mobile_button_frame').hasClass('out_of_frame')){
    $("#mobile_button_frame").removeClass('out_of_frame');
    $('#mobile_button_toggle').removeClass('other_way');
    document.exitFullscreen();
  }
  else {
    $('#mobile_button_frame').addClass('out_of_frame');
    $('#mobile_button_toggle').addClass('other_way');
    document.body.requestFullscreen();
  }
}

function askIfEndCall() {
  proAlert("End Call", "error", "Are you sure you want to end this call? ", "End", "end_call", false);
}

function m_toggle_div(t_div) {
  d = document.getElementById(t_div);
  if ($(t_div).hasClass('hidden')) {
    $(t_div).removeClass('hidden');
  } else {
    $(t_div).addClass('hidden');
  }
}

function m_hide_div(t_div) {
  d = document.getElementById(t_div);
  $(t_div).addClass('hidden');
}

// Switch the camera, actioned when the UI button is clicked
function m_switch_mobile_camera() {
}



