var noCamera = false;
var noAudio = false;
var noSpeaker = false;

var currentZooming = '';
var currentPanning = '';
var currentAxis = '';

$selected = '#c6c647';
$not_selected = '#adafb1';

var mic_saved = 12;
var speaker_saved = 10;
 
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .05) < 0) {
      el.style.display = "none";
      el.classList.add('hidden');
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// fade in

function fadeIn(el, display){
  console.log('fading in ' + el);
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      el.classList.remove('hidden');
      requestAnimationFrame(fade);
    }
  })();
}

function changeAddressPlaceholder() {
  var invite_type = document.getElementById('invite_type_select');
  var textBox = document.getElementById('search-box');
  switch(invite_type.value) {
    case "H.323":
      textBox.placeholder = 'domain##name'
      if (!($('#flag_selector').hasClass('hidden'))) {
          $('#flag_selector').addClass('hidden'); 
          $('#search-box').removeClass('input_with_flag'); 
      }
      break;
    case "SIP":
      textBox.placeholder = 'name@domain';
      if (!($('#flag_selector').hasClass('hidden'))) {
          $('#flag_selector').addClass('hidden');
          $('#search-box').removeClass('input_with_flag');  
      }
      break;
    case "LYNC/SKYPE":
      textBox.placeholder = 'name@domain';
      if (!($('#flag_selector').hasClass('hidden'))) {
          $('#flag_selector').addClass('hidden'); 
          $('#search-box').removeClass('input_with_flag'); 
      }
      break;
    case "EMAIL":
      textBox.placeholder = 'name@domain';
      if (!($('#flag_selector').hasClass('hidden'))) {
          $('#flag_selector').addClass('hidden'); 
          $('#search-box').removeClass('input_with_flag'); 
      }
      break;
    case "TEXT":
      if ($('#flag_selector').hasClass('hidden')) {
          $('#flag_selector').removeClass('hidden'); 
      }
      $('#search-box').addClass('input_with_flag'); 
      textBox.placeholder = '(###)###-####';
      break;
    case "TELEPHONE":
      if (!($('#flag_selector').hasClass('hidden'))) {
          $('#flag_selector').addClass('hidden'); 
          $('#search-box').removeClass('input_with_flag'); 
      }
      textBox.placeholder = '(###)###-####';
      break;
    default: 
      textBox.placeholder = 'name@domain';
  }
  
}

function toggleShow() {
  
  var selfVideo = document.getElementById("self_video")
  if (hasClass(selfVideo, 'private'))
    { selfVideo.classList.remove('private');
      show(1);
      $("#vid_mute_image").removeClass('hidden');
      $("#vid_unmute_image").addClass('hidden');
      $("#vid_action").removeClass('deactivated');
      $(selfVideo).attr("aria-pressed", "false");
      show_in_call_notification("Camera Unmuted")
    }
  else 
    { 
      selfVideo.classList.add('private');
      $("#vid_unmute_image").removeClass('hidden');
      $("#vid_mute_image").addClass('hidden');
      $("#vid_action").addClass('deactivated');	
      $(selfVideo).attr("aria-pressed", "true");
      show(0);
      show_in_call_notification("Camera Muted")
    }
}


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function show(yes_show) {
  // make this only for our own video
  if (yes_show == 1) {
    //tunnel('show', null);
    if (rtc) {
      rtc.muteVideo(false);
    }
  } 
  else{
    //tunnel('hide', null);
    if (rtc) {
      rtc.muteVideo(true);
    }
  }
  sendMuteUpdate();
}

function resetCamera() {
  tunnel('run_test', null);
}

function ringBell() {
  tunnel('play_sound',null);
  show_in_call_notification('Doorbell Activated')
}

/** Clinician only: Lock a room in Pexip */
function toggleLockConference() {
  if (conference_locked) {
    rtc.setConferenceLock(false);
  } else {
    rtc.setConferenceLock(true);
  }
}


/** Clinician only: AJAX call to check if endpoint is in locked conference */
function alertLockedOrBusy(endpoint_id) {
  $.ajax({
    url:"/endpoint/is_endpoint_in_locked_conf?endpoint_id=" + endpoint_id,
    dataType: "JSON",
    success: function(data) {
      if (data['result'] == true) {
        console.log("Room is locked");
        proAlert("Locked", "warning", "This room is locked", "Ok", "end_session", false);
      } else {
        console.log("Room is not locked");
        proAlert("Busy", "warning", "This room is already in a call", "Join", "join_busy_call", false);
      }

      // Handle being loaded in iFrame
      if (inIframe()) {
        var cancel_button = $("#pro_alert_cancel");
        cancel_button.click( function(){ 
          document.location.href="/home/dial";
        });
      }

    }
  });
}

function inIframe() {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}

function testSound(){
  document.getElementById('player').play()
  show_in_call_notification('Test Sound Activated')
}

var last_zoom_dir = '';
var zoom_joystick_pressed = false;

function zoom(dir) {
  if (isCisco()) {
    switch(dir) {
      case 'wide':
        zoom_joystick_pressed = true;
        currentZooming = 'out'
        tunnelFECC('start', 'zoom', 'out');
        break;
      case 'tele':
        zoom_joystick_pressed = true;
        currentZooming = 'in'
        tunnelFECC('start', 'zoom', 'in');
        break;
      case 'stop':
        if (zoom_joystick_pressed) {
          tunnelFECC('stop', 'zoom', currentZooming);
        }
        break;
      default:
        console.log('Cannot send ' + dir + ' zoom command to Cisco');
    }
    
  } else {
    if (last_zoom_dir != dir) {
      tunnel('zoom', {dir: dir});
      last_zoom_dir = dir;
    }
  }
}

function zoomWithKeyboard(dir, event) {
  var enterKey = 13; 
  var spaceKey = 32;
  if(event.which == enterKey || event.which == spaceKey) {
    zoom(dir);
  }
}

function autoSpeed() {
  if ($('#speed_label').hasClass('as_auto')) {
    setSpeed($('#flat-slider-vertical-3')[0].innerText);
    $('#speed_label').removeClass('as_auto');
  }
  else{
    $('#speed_label').addClass('as_auto');
    setSpeed('auto');
  }
}

function autoFocus() {
  if ($('#focus_label').hasClass('as_auto')) {
    setFocus($('#flat-slider-vertical-4')[0].innerText);
    $('#focus_label').removeClass('as_auto');
  }
  else{
    $('#focus_label').addClass('as_auto');
    setFocus('auto');
  }
}


function autoBrightness() {
  if (!$('#cb2')[0].checked) {
    adjBrightness($('#flat-slider-vertical-2')[0].innerText);
    $('#bright_label').removeClass('as_auto');
    $('#cb2')[0].checked = false;
  }
  else{
    $('#bright_label').addClass('as_auto');
    $('#cb2')[0].checked = true;
    tunnel('reset_brightness', null);
  }
}

function adjBrightness(val) {
  $('#cb2')[0].checked = true;
  $('#bright_label').removeClass('as_auto');
  tunnel('adj_brightness', {bright: val});
}

function setSpeed(val) {
  $('#cb3')[0].checked = true;
  $('#speed_label').removeClass('as_auto');
  tunnel('set_speed', {speed: val});
}

function setFocus(val) {
  $('#cb4')[0].checked = true;
  $('#focus_label').removeClass('as_auto');
  tunnel('set_focus', {auto: val , point: val});
}

function setSpeaker(val,mute_toggle,_call) {

  if (mute_toggle) {
    if ($('#speaker_label').hasClass('as_auto')) {
      // was on auto mode, now wants to mute
      speaker_saved = $('#flat-slider-vertical-5')[0].innerText;
      $('#flat-slider-vertical-5').slider("option", "value", 0);
      val = 'mute';
      $('#speaker_label').removeClass('as_auto');
    }
    else {
      $('#flat-slider-vertical-5').slider("option", "value", speaker_saved);
      val = speaker_saved/2;
      $('#speaker_label').addClass('as_auto');
    }
  }
  // end of mute toggle.  From here one must have hit slider
  else{
    //val should be coming through selection
    speaker_saved = $('#flat-slider-vertical-5')[0].innerText;
    if (speaker_saved == '0') {
      // if 0 selected, going into mute
      if ($('#speaker_label').hasClass('as_auto')) {
        $('#speaker_label').removeClass('as_auto');
        $('#cb5').prop('checked',true);
      }
        val = 'mute';
    }
    else {
      // check to see if coming off of mute
      if (!$('#speaker_label').hasClass('as_auto')) {
        $('#cb5').prop('checked',false);
        $('#speaker_label').addClass('as_auto');
      }
    }
  }

   
  if (_call) { 
    tunnel('set_speaker', {mute: val, point: val});
  }
}

function setBell(val,mute_toggle, _call) {

  if (mute_toggle) {
    $('#flat-slider-vertical-7').slider("option", "value", 10);
    val = 10;
  }
  // end of mute toggle.  From here one must have hit slider
   
  if (_call) { 
    tunnel('adjust_bell', {bell_volume: val/20});
  }
}


function updateEndpoint(type, value, e_id) {
  var obj = new Object();
  obj.type = type; 
  obj.value = value; 
  obj.e_id = e_id;
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"../endpoint/set_endpoint",
     method: "POST",
     data: jsonString, 
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
     }
  });
}

function techInput(val) {
  tunnel('set_microphone', {mute: val, point: val});
  var a_output =  $('#flat-slider-vertical-5')[0].innerText;
  tunnel('audio_defaults', {audio_input: val, audio_output: a_output});
  var e_id = document.getElementById('e_id').innerHTML;
  updateEndpoint('default_input', val, e_id);
}

function techOutput(val) {
  tunnel('set_speaker', {mute: val, point: val});
  var a_input =  $('#flat-slider-vertical-6')[0].innerText;
  tunnel('audio_defaults', {audio_input: a_input, audio_output: val});
  var e_id = document.getElementById('e_id').innerHTML;
  updateEndpoint('default_output', val, e_id);
}

function techBell(val) {
  tunnel('adjust_bell', {bell_volume: val/10});
  var e_id = document.getElementById('e_id').innerHTML;
  updateEndpoint('default_bell', val, e_id);
}

function testCall() {
  tunnel('selftest', null);
  swal({ title: "Self Test", text: "Self test will begin shortly", type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false}); 
}

function endTestCall() {
  tunnel('endselftest', null);
  swal({ title: "Self Test Ending", text: "Self test will end shortly", type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false}); 
}

function setMicrophone(val,mute_toggle, _call) {

  if (mute_toggle) {
    if ($('#microphone_label').hasClass('as_auto')) {
      // was on auto mode, now wants to mute
      mic_saved = $('#flat-slider-vertical-6')[0].innerText;
      $('#flat-slider-vertical-6').slider("option", "value", 0);
      val = 'mute';
      $('#microphone_label').removeClass('as_auto');
    }
    else {
      $('#flat-slider-vertical-6').slider("option", "value", mic_saved);
      val = mic_saved/2;
      $('#microphone_label').addClass('as_auto');
    }
  }
  // end of mute toggle.  From here one must have hit slider
  else{
    //val should be coming through selection
    mic_saved = $('#flat-slider-vertical-6')[0].innerText;
    if (mic_saved == '0') {
      // if 0 selected, going into mute
      if ($('#microphone_label').hasClass('as_auto')) {
        $('#microphone_label').removeClass('as_auto');
        $('#cb6').prop('checked',true);
      }
        val = 'mute';
    }
    else {
      // check to see if coming off of mute
      if (!$('#microphone_label').hasClass('as_auto')) {
        $('#cb6').prop('checked',false);
        $('#microphone_label').addClass('as_auto');
      }
    }
  }

   
  if (_call) { 
    tunnel('set_microphone', {mute: val, point: val});
  }
}

function checkForReboot() {
  sendCameraRebootCommand();
  swal({title: "Please wait while camera refreshes", showCancelButton:false, showConfirmButton: false, timer:6000});
}

function checkForSoftReboot() {
  swal({ title: "Soft Reboot", text: "Your call will end and the system will be unavailable while it reboots", showCancelButton: true, confirmButtonClass: "btn-primary", confirmButtonText: "Reboot Now", closeOnConfirm: false, closeOnCancel: false}, function(isConfirm){ if (isConfirm) { sendSoftReboot(); swal.close(); endCall();  } else {swal.close();}});
}

function sendSoftReboot() {
  var endpoint_version = document.getElementById('endpoint_version');
  if (endpoint_version && parseFloat(endpoint_version.innerHTML) > 1.9071) {
    console.log('version > 1.907 reboot os');
    tunnel("reboot_os",null);
  }
  else {
    console.log('version < 1.907 soft reboot');
    tunnel("soft_reboot",null);
  }
}

function is_endpoint_offline(endpoint_id){
  if (isCisco()) {
    $.ajax({
       url:"/endpoint/is_std_endpoint_in_call?endpoint_id=" + endpoint_id,
       dataType: "JSON",
       success: function(data) {
         if (data.result == 'none') {
           // Need to create api_tunnel that is not down in isEndpointOnCall - should move this
           if (api_call) {
             create_api_tunnel();
           }
           processCall(false);
         }
         else {
           if (invited) {
             processCall(true);
           }
           else {
            proAlert("Busy", "warning", "This room is already in a call", "Join", "join_busy_call", false);
           }
         }
       }
    });
  } 
  else {
    $.ajax({
       url:"/endpoint/is_endpoint_offline?endpoint_id=" + endpoint_id,
       dataType: "JSON",
       success: function(data) {
         if (data.offline == 'true') {
           proAlert("Offline", "error", "This room is currently offline. Please try again later", "OK", "reload", false);
         }
         else {
           isEndpointInCall(data.machine_name);
         }
       }
    });
  }
}

function save_bookmark() {
  var bookmark_name = document.getElementById("add_bookmark_field").value;
  var endpoint_id = document.getElementById("endpoint_id").innerHTML

  if (document.getElementById(bookmark_name.toLowerCase()) || (bookmark_name.toLowerCase() == 'home'))
    {proAlert("Bookmark Already Exists", "warning", "Please choose a different bookmark name.", "OK", "close", 'add_bookmark_field');}
  else {
    $.ajax({
       url:"/endpoint/set_bookmark?endpoint=" + endpoint_id + "&name=" + bookmark_name,
       dataType: "JSON",
       success: function(data) {
         if(data.bookmark_status == 'duplicate') {
           proAlert("Bookmark Already Exists", "warning", "Please choose a different bookmark name.", "OK", "close", 'add_bookmark_field');
         }
         else {
           send_bookmark(data.message);
           show_in_call_notification('Bookmark Saved')
           setTimeout(function () {
             loadBookmarks();
           }, 500);
         }
       } 
    });
  }
}

function save_home_bookmark() {
  proAlert("Set Home Location", "warning", "Are you sure you want to change the Home location to this position!", "Set as Home", "home_bookmark", "repin_home");
}
function ok_save_home_bookmark() {
  show_in_call_notification("Home Repinned")
  send_bookmark('Home');
}
     
function send_bookmark(name) {
  tunnel('set_as_bookmark', {b_name: name});
}

var last_direction = '';
var joystick_pressed = false;

function pan(dir) {
  if (isCisco()) {
    if (dir === "left" || dir === "right") {
      joystick_pressed = true;
      currentPanning = dir;
      currentAxis = 'pan';
      tunnelFECC('start', 'pan', dir);
    } else if (dir === "up" || dir === "down") {
      joystick_pressed = true;
      currentPanning = dir;
      currentAxis = 'tilt';
      tunnelFECC('start', 'tilt', dir);
    } else {
      if (joystick_pressed) {
        tunnelFECC('stop', currentAxis, currentPanning);
      }
    }
  } else {
    if (last_direction != dir) {
      tunnel('pan', {dir: dir});
      last_direction = dir;
    }
  }
}

function delete_bookmark(bm) {
  var bm_ = document.getElementById(bm);
  bm_.classList.add('hidden') ;
  var bm_c = document.getElementById("delete_"+bm);
  bm_c.classList.remove('hidden');
}

function yes_delete_bookmark(bm_id){
  $.ajax({
     url:"/endpoint/delete_bookmark?bm_id=" + bm_id , 
     dataType: "JSON",
     success: function(data) {
       show_in_call_notification("Bookmark Deleted")
       loadBookmarks();
     }
  });
}
function go_to_bookmark(name) {
  if(name == "home") {
    show_in_call_notification("Camera Home")
  }
  console.log("going to bookmark " + name);
  tunnel('go_to_bookmark', {bookmark: name});
}


function pan_stop() {
  var pressed = document.getElementById("joystick_pressed");
  hide(pressed);

  if (isCisco()) {
    tunnelFECC('stop', 'pan', null);
  } else {
    tunnel('stop', null);
  }

}

var continueInterval;

// If a Cisco unit, use the Pexip API to command the camera
function tunnelFECC(action, axis, direction) {
  if (rtc && patientUUID) {
    console.log("Sending FECC command: [action: "+action+"], [axis: "+axis+"], [direction: "+direction+"], [user_id: "+patientUUID+"]");

    if (action == 'stop') {
      clearInterval(continueInterval);
    }
    else {
      if (action != 'continue') {
        continueInterval = setInterval(function(){tunnelFECC('continue', axis, direction);}, 200);
      }
    }
    rtc.sendFECC(action, axis, direction, patientUUID, 1000)
    
  } else {
    console.log("ERROR: No valid RTC object, or User ID invalid");
  }
}


function tunnel(command_, params_) {
  if (tunnel_ws) {
    try {
      
      var meta = { };
      
      var vmr = document.getElementById("call_alias");
      if (vmr) {
        meta.vmr = vmr.innerHTML;
      }
      var user_id = document.getElementById("current_user_id");
      if (user_id) {
        meta.user_id = user_id.innerHTML;
      }
      if (params_){
        tunnel_ws.send_command({command: command_, params: params_, meta: meta});
      }
      else {
        tunnel_ws.send_command({command: command_, meta: meta});
      }
    } catch(e) {
      console.log("tunnel send error " + e + " for command" + command_);
    }
  }
}

function meeting_tunnel(command_, params_) {
  if (mychart_session_tunnel) {
    try {
      
      var meta = { };
      
      var vmr = document.getElementById("call_alias");
      if (vmr) {
        meta.vmr = vmr.innerHTML;
      }
      var user_id = document.getElementById("current_user_id");
      if (user_id) {
        meta.user_id = user_id.innerHTML;
      }
      var user_name_for_log = document.getElementById("username");
      if (user_name_for_log) {
        meta.username = user_name_for_log.innerHTML;
      }
      if (params_){
        mychart_session_tunnel.send_command({command: command_, params: params_, meta: meta});
      }
      else {
        mychart_session_tunnel.send_command({command: command_, meta: meta});
      }
    } catch(e) {
      console.log("meeting_tunnel send error " + e + " for command" + command_);
    }
  }
}


function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}

function runAnimeBackwards(e) {
/*
  var anime =  document.getElementById("hold_me_down_backwards");
  anime.style.left = (e.pageX - 32) + "px"; 
  anime.style.top = (e.pageY - 32)  + "px"; 
  setTimeout(function () {$("#hold_me_down_backwards").click();}, 170);
*/
}

function resetAnime() {
  var anime =  document.getElementById("hold_me_down");
  var anime2 =  document.getElementById("double_click_me");
  anime.style.left = "0px"; 
  anime.style.top = "0px"; 
  anime2.style.left = "0px"; 
  anime2.style.top = "0px"; 
}

function runAnime(e,zoom) {
  if (!is_safari) { // doesn't work correctly in safari
    if (zoom) {
      var anime =  document.getElementById("hold_me_down");
      anime.style.left = (e.pageX - 18) + "px"; 
      anime.style.top = (e.pageY - 16 - 54)  + "px";  // 54 is header height
    } 
    else {
      var anime =  document.getElementById("double_click_me");
      anime.style.left = (e.pageX - 32) + "px"; 
      anime.style.top = (e.pageY - 18 - 54)  + "px";  // 54 is header height
    }

    if (zoom) {
      setTimeout(function () {$("#hold_me_down").click();}, 170);
      setTimeout(function () {resetAnime();}, 1070);
    }
    else {
      setTimeout(function () {$("#double_click_me").click();}, 170);
      setTimeout(function () {resetAnime();}, 670);
    }
  }
}

function goToPoint(e, z_val) {

  var version = document.getElementById('endpoint_version').innerHTML;
  if (parseFloat(version).toFixed(2) > .5) {

  var PosX = 0;
  var PosY = 0;
    
    var c = document.getElementById('video');
    
    var cs     = getComputedStyle(c);
    var width  = parseInt( cs.getPropertyValue('width'), 10);
    var height = parseInt( cs.getPropertyValue('height'), 10);

    width = $(window).width();
    //height = $(window).height();

    PosX = e.offsetX; 
    PosY = e.offsetY - ($('#header_bar').height() / 2); // half of header bar whose height is set to 54px
    console.log(`X offset: ${e.pageX} - ${e.offsetX} = ${e.pageX - e.offsetX}`);
    console.log(`Y offset: ${e.pageY} - ${e.offsetY} = ${e.pageY - e.offsetY}`);


    var xOrigin = (width - 1) / 2;
    var yOrigin = (height - 1) / 2;
    var x = (PosX + 1 - xOrigin) / xOrigin;
    var y = (yOrigin - PosY) / xOrigin;
    if (z_val == 'true') {
      runAnime(e,true);
    }
    else {
      runAnime(e,false);
    }
    tunnel('go_to_point', {x_val: (x - (x * .15)), y_val: y, zoom_val: z_val}); 
  }
  else{ 
    GetCoordinates(e, z_val );
  }
}

function moveToPoint(e) {
  goToPoint(e, 'false');
} 
function zoomToPoint(e) {
  console.log('button is: ' + e.button);
  if (e.button < 1) { 
    goToPoint(e, 'true');
  }
  else {
    runAnimeBackwards(e);
    tunnel('zoom_out', null); 
  }

} 
function GetCoordinates(e, zoom)
{
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(clickScreen);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
  if (zoom == 'true') {
    runAnime(e,true);
  }
  else {
    runAnime(e,false);
  }
  
  var frameInfo = clickScreen.getBoundingClientRect();
  var frameMidWidth = frameInfo.width / 2;
  var frameMidHeight = frameInfo.height / 2;
  
  var resultX = 0;
  var resultY = 0;
  resultX = (PosX + 1 - frameMidWidth ) / frameMidWidth;
  resultY = (frameMidHeight -  PosY)  / frameMidWidth;
  
  tunnel('go_to_point', {x_val: resultX, y_val: resultY, zoom_val: zoom});
  
}

function goToAbsolutePoint(x,y,zoom) {
  if (zoom) {
    tunnel('go_to_absolute_point', {x_val: x, y_val: y, zoom_val: 'true'});
  }
  else {
    tunnel('go_to_absolute_point', {x_val: x, y_val: y, zoom_val: 'false'});
  }
}

function MoveCam(e){
  GetQuadrant(e, true);
}
function ShowHover(e){
  GetQuadrant(e, false);
}
function hideHover() {
  var hover = document.getElementById("joystick_hover");
  var pressed = document.getElementById("joystick_pressed");
  hide(hover);
  hide(pressed);
}

function hide(element) {
  if (!hasClass(element, 'hidden')) {
    element.classList.add('hidden');
  } 
}
function unhide(element) {
  if (hasClass(element, 'hidden')) {
    element.classList.remove('hidden');
  }
} 


function drag_start(event) 
    {
    var style = window.getComputedStyle(event.target, null);
    var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY)+ ',' + event.target.getAttribute('data-item');
    event.dataTransfer.setData("Text",str);
    } 

function drop(event) 
    {
    var offset = event.dataTransfer.getData("Text").split(',');
    var dm = document.getElementsByClassName('dragme');
    dm[parseInt(offset[2])].style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm[parseInt(offset[2])].style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
    }

function drag_over(event)
    {
    event.preventDefault();
    return false;
    }   

function edit_bookmark(bm) {
  var bookmark =  document.getElementById(bm);
  bookmark.classList.remove("readonly");
  bookmark.disabled = false;
  var pencil = document.getElementById('pencil_'+bm);
  pencil.classList.add('hidden');
  var save = document.getElementById('save_'+bm);
  save.classList.remove('hidden');
}

function save_bookmark_name(bm) {
  var bookmark =  document.getElementById(bm);
  bookmark.classList.add("readonly");
  bookmark.disabled = true;
  var pencil = document.getElementById('pencil_'+bm);
  pencil.classList.remove('hidden');
  var save = document.getElementById('save_'+bm);
  save.classList.add('hidden');
  var bookmark_id =  document.getElementById('id_' + bm).innerHTML;
  var bookmark_name =  bookmark.value; 
  $.ajax({
     url:"/endpoint/save_bookmark_name?bm_id=" + bookmark_id + "&bm_name=" + bookmark_name , 
     dataType: "JSON",
     success: function(data) {
     }
  });
}

function show_self_buttons(type) {
  cName = "self_mute_" + type
  video = document.getElementById("self_video");
  mute = document.getElementById(cName);
  if (type == 0) {
    fadeIn(video, 'block');
  } 
  fadeIn(mute, 'block');
}
function hide_self_buttons(type) {
  cName = "self_mute_" + type
  video = document.getElementById("self_video");
  mute = document.getElementById(cName);
  if (!hasClass(mute,'muted')) {
    fadeOut(mute);
  }
  if (type == 0 && !hasClass(video,'private')) {
    fadeOut(video); 
  }
}

function hasClass(element, selector) {
  var className = " " + selector + " ";
  if ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1 )  {
    return true;
  }
  else {
    return false;
  }
}

function hideSearchDetails() {
   var top_ = document.getElementById("search_detail_top");
   var add_plus = document.getElementById("add_caller_plus");
   var call_phone = document.getElementById("add_caller_phone");
   fadeOut(top_);
   add_plus.classList.remove('hidden');
   call_phone.classList.add('hidden');
}

function meeting_started(cid) {
  // any meeting initialization here
  // setting start time if hasn't started yet
  var obj = new Object();
  obj.cid = document.getElementById('cid').innerHTML 
  obj.g_alias = document.getElementById("call_alias").innerHTML;
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"/api/meeting_started",
     method: "POST",
     data: jsonString, 
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
     }
  });
}

function alert_called(endpoint_id) {
  var obj = new Object();
  obj.endpoint_id = endpoint_id
  obj.user_id = document.getElementById('current_user_id').innerHTML; 
  obj.g_alias = document.getElementById("call_alias").innerHTML;
  var jsonString = JSON.stringify(obj);
  var server_name = document.getElementById('server_name').innerHTML;
  $.ajax({
     url:"/api/alert_called",
     method: "POST",
     data: jsonString, 
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
       loadAlerts('open');
     }
  });

}

function remove_alert(endpoint_id, user_id) {
  var obj = new Object();
  obj.endpoint_id = endpoint_id
  obj.user_id = user_id
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"/api/remove_alert",
     method: "POST",
     data: jsonString, 
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
       loadAlerts('open');
     }
  });

}

function dial_from_alert(endpoint_id) {
  toggle_widget('alerts','notifs');
  checkForInCall();
  var url_string = "/fetch_conf?endpoint_id=" + endpoint_id
  $.get(url_string);
}

function load_conf_screen() {
  var url_string = "/fetch_conf"
  $.get(url_string);
}

function dial_conf() {
  var endpoint_id = document.getElementById("endpointSelect").value;
  var url_string = "/fetch_conf?endpoint_id=" + endpoint_id
  $.get(url_string);
}

function showConfScreen() {
  var login = document.getElementById("login_widget_surround");
  fadeOut(login);
  login.classList.add('hidden');
  var block = document.getElementById("block_screen");
  fadeOut(block);
  block.classList.add('hidden');
  var dialScreen = document.getElementById('dialing');
  var backgroundScreen = document.getElementById('login_screen');
  if (dialScreen) {
  fadeOut(dialScreen);}
  if (backgroundScreen) {
  fadeOut(backgroundScreen);}

  initScreenValues();
}

// mozfullscreenerror event handler
function errorHandler() {
   alert('mozfullscreenerror');
}
document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);

// toggle full screen
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}


// keydown event handler
//document.addEventListener('keydown', function(e) {
  //if (e.keyCode == 13 || e.keyCode == 70) { // F or Enter key
//  if (e.altKey) { // F or Enter key
//    toggleFullScreen();
// }
//}, false); 

			function animateClick() {

				function mobilecheck() {
					var check = false;
					(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
					return check;
				}

				var support = { animations : Modernizr.cssanimations },
					animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
					animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
					onEndAnimation = function( el, callback ) {
						var onEndCallbackFn = function( ev ) {
							if( support.animations ) {
								if( ev.target != this ) return;
								this.removeEventListener( animEndEventName, onEndCallbackFn );
							}
							if( callback && typeof callback === 'function' ) { callback.call(); }
						};
						if( support.animations ) {
							el.addEventListener( animEndEventName, onEndCallbackFn );
						}
						else {
							onEndCallbackFn();
						}
					},
					eventtype = mobilecheck() ? 'touchstart' : 'click';

				[].slice.call( document.querySelectorAll( '.cbutton' ) ).forEach( function( el ) {
					el.addEventListener( eventtype, function( ev ) {
						classie.add( el, 'cbutton--click' );
						onEndAnimation( classie.has( el, 'cbutton--complex' ) ? el.querySelector( '.cbutton__helper' ) : el, function() {
							classie.remove( el, 'cbutton--click' );
						} );
					} );
				} );


			}

function setLongClick() {
      var pressTimer;
      $("#clickscreen").mouseup(function(){
        clearTimeout(pressTimer);
         return false;}).mousedown(function(){
         pressTimer = window.setTimeout(function(e) { 
          zoomToPoint(e); 
          },1000);
       return false; });
}

function setZoom(e) {
  pressTimer = window.setTimeout(function() { 
    zoomToPoint(e); 
  },1000);
}

function toggle_selfview(){
  var ele = document.getElementById('self_view_widget');
  if (ele.style.opacity > .8) {
    //stop();
  }
  else {
    //start(false);
  }
  toggle_widget('self_view_widget', 'self_view_button');
}

var first_run= true;
function toggle_settings(){
  
  if ($('#settings_sidebar').hasClass('hidden')) {
    $('#change_speaker_button').addClass('hidden');
    $('#change_mic_button').addClass('hidden');
    document.getElementById('change_mic_button').opacity = 0; 
    if (!rtc) {
      start(false);
    }
    else {
      if (first_run) {
        start(false);
      }
    }
    $('#settings_sidebar').removeClass('hidden'); 
  }
  else {
    stop();
    $('#settings_sidebar').addClass('hidden'); 
  }
}


function init_settings() {
  start(false);
}

function initICR() {
  $('#toggle-2').prop('checked',false);
  if (!$('#toggle-2').hasClass('off')) {
    $('#toggle-2').addClass('off');
  }
  $('#icr_state').text('OFF');
}


function toggleICR(){
  var ca = document.getElementById("call_alias").innerHTML;
  if ($('#toggle-2').hasClass('off')) {
    $('#toggle-2').prop('checked',true);
    $('#toggle-2').removeClass('off');
    $('#icr_state').text('ON');
    sendICR(true);
    $.ajax({
      url:"/endpoint/set_icr_state?state=1&alias=" + ca , 
      dataType: "JSON",
      success: function(data) {
      }
    });
   }
  else{
    $('#toggle-2').prop('checked',false);
    $('#toggle-2').addClass('off');
    $('#icr_state').text('OFF');
    sendICR(false);
    $.ajax({
      url:"/endpoint/set_icr_state?state=0&alias=" + ca , 
      dataType: "JSON",
      success: function(data) {
      }
    });
   }
}

function sendICR(on) {
  if (on) {
    tunnel("night_view",{on: 'true'});
  }
  else{
    tunnel("night_view", {on: 'false'});
  }
}

function sendCameraRebootCommand(){
  tunnel("reboot_camera",null);
}

function showSip(num) {
  if ($('#type_change_' + num).val() == 'Standards Based') {
    $('#sip_address_' +num).removeClass('hidden');
    $('#c_type_' +num).removeClass('hidden');
    $('#univagohe').addClass('hidden');
    $('#not_configured').addClass('hidden');
    $('#sip_address_tr').removeClass('hidden');
    $('#c_type_tr').removeClass('hidden');
  }
  else {
    if (!$('#sip_address_' +num).hasClass('hidden')) {
      $('#sip_address_' +num).addClass('hidden');
      $('#c_type_' +num).addClass('hidden');
      $('#univagohe').removeClass('hidden');
      $('#not_configured').removeClass('hidden');
      $('#sip_address_tr').addClass('hidden');
      $('#c_type_tr').addClass('hidden');
    }
  }
}

function isCisco() {
  var dv = document.getElementById('device_type');
  if (dv) {
    if (dv.innerHTML == 'CISCO') {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}

function toggle_ip() {
  if($('#static_ip_details').hasClass('hidden')) {
    $('#static_ip_details').removeClass('hidden');
  }
  else {
    $('#static_ip_details').addClass('hidden');
  }
}
function select_ip_settings(id, select_info){
  if (select_info.value == "static_ip") {
    $('#static_ip_details').removeClass('hidden');
    $('#wifi_details').addClass('hidden');
    $('#enterprise_wifi_details').addClass('hidden');
  } 
  else if (select_info.value == "wifi")	{  
    $('#static_ip_details').addClass('hidden');
    $('#enterprise_wifi_details').addClass('hidden');
    $('#wifi_details').removeClass('hidden');
  }
  else if (select_info.value == "enterprise_wifi")	{  
    $('#static_ip_details').addClass('hidden');
    $('#wifi_details').addClass('hidden');
    $('#enterprise_wifi_details').removeClass('hidden');
  }
  else {
    $('#static_ip_details').addClass('hidden');
    $('#wifi_details').addClass('hidden');
    $('#enterprise_wifi_details').addClass('hidden');
  }
}


function expand_screenshot() {
  if($('#snapshot').hasClass('expanded')) {
    $('#snapshot').removeClass('expanded');
    $('#expand_snapshot').removeClass('fa-compress-alt');
    $('#expand_snapshot').addClass('fa-expand-alt');
    $('#expand_snapshot').attr("aria-label","maximize screenshot");
  }
  else {
    $('#snapshot').addClass('expanded');
    $('#expand_snapshot').removeClass('fa-expand-alt');
    $('#expand_snapshot').addClass('fa-compress-alt');
    $('#expand_snapshot').attr("aria-label","minimize screenshot");
  }
}


function expand_content_sharing() {
  if($('#content_sharing_partial').hasClass('expanded')) {
    $('#content_sharing_partial').removeClass('expanded');
    $('#expand_content_sharing').removeClass('fa-compress-alt');
    $('#expand_content_sharing').addClass('fa-expand-alt');
    $('#expand_content_sharing').attr("aria-label","maximize content sharing screen");
  }
  else {
    $('#content_sharing_partial').addClass('expanded');
    $('#expand_content_sharing').removeClass('fa-expand-alt');
    $('#expand_content_sharing').addClass('fa-compress-alt');
    $('#expand_content_sharing').attr("aria-label","minimize content sharing screen");
  }
}

function joystick_keyboard_control(direction) {
    if (event.which == "13" || event.which == "32") {
      pan(direction); 
    }
}

function joystick_appearance_control(type, direction) {
  var joystick_pressed = document.getElementById("joystick_pad_pressed");
  var joystick_hover = document.getElementById("joystick_pad_hover");
  var joystick_main = '';


  if (type == "") {
    $(joystick_hover).addClass('hidden');
    $(joystick_pressed).addClass('hidden');
  }
  else if (type == "hover") {
    if ($(joystick_hover).hasClass('hidden')) {
      $(joystick_hover).removeClass('hidden');
    }
    $(joystick_pressed).addClass('hidden');

    joystick_main = joystick_hover;
  }
  else if (type == "press") {
    if ($(joystick_pressed).hasClass('hidden')) {
      $(joystick_pressed).removeClass('hidden');
    }
    $(joystick_hover).addClass('hidden');

    joystick_main =  joystick_pressed;
  }

  if (joystick_main != '') {
    if (direction == 'upleft') { joystick_main.style.webkitTransform = 'rotate(135deg)';}
    else if (direction == 'up') { joystick_main.style.webkitTransform = 'rotate(180deg)';}
    else if (direction == 'upright')  { joystick_main.style.webkitTransform = 'rotate(-135deg)';}
    else if (direction == 'left')  { joystick_main.style.webkitTransform = 'rotate(90deg)';}
    else if (direction == 'right')  { joystick_main.style.webkitTransform = 'rotate(-90deg)';}
    else if (direction == 'downleft') { joystick_main.style.webkitTransform = 'rotate(45deg)';}
    else if (direction == 'down') { joystick_main.style.webkitTransform = 'rotate(0deg)';}
    else if (direction == 'downright') { joystick_main.style.webkitTransform = 'rotate(-45deg)';}
  }
}

function GetQuadrant(e,move)
{

  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(myFrame);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];

  var frameInfo = myFrame.getBoundingClientRect();
  var frameMidWidth = frameInfo.width / 2;
  var frameMidHeight = frameInfo.height / 2;
  
  var resultX = 0;
  var resultY = 0;
  resultX = frameMidWidth - PosX;
  resultY = frameMidHeight - PosY;

  // center 660 x 660 (compass)
  var variance = (frameInfo.height/3)/2;
  var topsquare = frameMidHeight - variance;
  var leftsquare = frameMidWidth - variance;
  var bottomsquare = frameMidHeight + variance;
  var rightsquare = frameMidWidth + variance;

  var pressed = document.getElementById("joystick_pressed");
  var hover = document.getElementById("joystick_hover");

   
  if (move) {
    unhide(pressed); 
    var highlighter = pressed; 
  }
  else {
    unhide(hover);
    hide(pressed); 
    var highlighter = hover; 
  }

  if (PosY < topsquare) {
    if (PosX < leftsquare) {
      if (move) {
        pan('upleft');}
      highlighter.style.webkitTransform = 'rotate(135deg)';
    }
    else {
      if (PosX > rightsquare) {
      
        if (move) {
          pan('upright'); }
        highlighter.style.webkitTransform = 'rotate(-135deg)';
      }
      else {
        if (move) {
          pan('up');
        }
        highlighter.style.webkitTransform = 'rotate(180deg)';
      }
    }
  }
  else {
    if (PosY > bottomsquare) {
      if (PosX < leftsquare) {
        if (move) {
          pan('downleft'); }
        highlighter.style.webkitTransform = 'rotate(45deg)';
      }
      else {
        if (PosX > rightsquare) {
          if (move) {
            pan('downright');}
          highlighter.style.webkitTransform = 'rotate(-45deg)';
        }
        else {
          if (move) {
            pan('down');}
          highlighter.style.webkitTransform = 'rotate(0deg)';
        }
      }
    }
    else {
      if (PosX < leftsquare) {
        if (move) {
          pan('left'); }
        highlighter.style.webkitTransform = 'rotate(90deg)';
      }
      else {
        if (PosX > rightsquare) {
          if (move) {
            pan('right');
          }
          highlighter.style.webkitTransform = 'rotate(-90deg)';
        }
      }
    }
  }
}

function zoomOutMobile() {
  /* depreciate this function
  var viewport = document.querySelector('meta[name="viewport"]');

  if ( viewport ) {
    viewport.content = "initial-scale=0.1";
    viewport.content = "width=device-height";
    viewport.content = "initial-scale=1";
    window.scrollTo(0,1);
  }
  */
}
