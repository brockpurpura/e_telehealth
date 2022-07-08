// **** WEBUI **** //

var video;
var flash;
var presentation = null;
var flash_button = null;
var bandwidth;
var conf_uri;
var conference;
var videoURL;
var presWidth = 1280;
var presHeight = 720;
var presenter;
var patient;
var pin;
var source = null;
var presenting = false;
var conference_locked = false;
var remote_presenting = false;
var startTime = null;
var userResized = false;
var presentationURL = '';
var videoPresentation = true;
var mustAddPart = true;
var call_token;
var callConnected = false;
var endCallCalled = false;
var checkFailAdd = true;

var id_selfview;
var id_muteaudio;
var id_mutevideo;
var id_fullscreen;
var id_screenshare;
var id_presentation;
var presVideo;
var presVideoMedia;

var rtc = null;
var need_endpoint = true;
var vmr = '';
var endpoint_id = '';
var announce = 'true';
var run_timer = 1;
var seconds = -1;
var timer;

var trans = Array();
var parts_a = Array();
var admitted_parts = Array();
var participants = Array();
var for_hangup = Array();
var hosts = Array();
var participant_objects = {}; 
var meetingPartSpotlight = '';

var server_name; 
var cable;
var tunnel_ws = null;
var mychart_session_tunnel = null;

var error_connecting = false;

var invited = false;
var epic_patient = false;
var epic_joined = false;
var epic_left = false;
var api_call = false;
var mobile_api_call = false;
var from_observer = false;
var silence = false;
var no_prompt = false;
var isMeeting;
var patientUUID;
var patient_name;
var hide_survey = false;

var current_user_name;
var chatCount = 0;

var uhe_make_call = ''; 
var uhe_call_alias = ''; 
var uhe_endpoint_id = '';
var uhe_rm_name = ''; 
var uhe_announce = '';
var uhe_machine_name = ''; 
var uhe_invited = false;
var selfvideo;

var is_first_load = true; // For iOS 

var tyto_exam_in_progress = false;

trans['BUTTON_MUTEAUDIO'] = "Mute Audio";
trans['BUTTON_UNMUTEAUDIO'] = "Unmute Audio";
trans['BUTTON_MUTEVIDEO'] = "Mute Video";
trans['BUTTON_UNMUTEVIDEO'] = "Unmute Video";
trans['BUTTON_FULLSCREEN'] = "Fullscreen";
trans['BUTTON_NOPRES'] = "No Presentation Active";
trans['BUTTON_SHOWPRES'] = "View Presentation";
trans['BUTTON_HIDEPRES'] = "Hide Presentation";
trans['BUTTON_SHOWSELF'] = "Show Selfview";
trans['BUTTON_HIDESELF'] = "Hide Selfview";
trans['BUTTON_SCREENSHARE'] = "Share Screen";
trans['BUTTON_STOPSHARE'] = "Stop Sharing";
trans['HEADING_ROSTER_LIST'] = "Participants";
trans['TITLE_HOSTS'] = "Hosts";
trans['TITLE_GUESTS'] = "Guests";

var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_touch_screen = navigator.maxTouchPoints && navigator.maxTouchPoints > 2; 
var is_safari_ipad = is_safari && is_touch_screen; 
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}
if ((is_chrome)&&(is_opera)) {is_chrome=false;}

var on_poh_automatically = false;
var on_poh_manually = false;
const POH_TITLE = "POH - ";

function webInCall() {
  if (rtc == null) {
    return false;
  }
  else {
    return true;
  }
}

function fadeDial () {
  
  var dialScreen = document.getElementById('dialing');
  var anime = document.getElementById('anime');
  var room = document.getElementById('room');
  if (dialScreen) {
    if (room) {
      fadeIn(room, 'block');
    }
    setTimeout(function () {
      if (room) {
        fadeOut(room);
      }
      }, 3200);
    setTimeout(function () {
      fadeOut(anime);
      }, 4000);
    setTimeout(function () {
      checkPOHStatus();
      fadeOut(dialScreen);
      //document.getElementById("dialing_sound").pause();
      //initScreen();
      }, 4200);
  }
}

/* ~~~ PRESENTATION STUFF ~~~ */

function amPresenting(){
  if (rtc.presentation && rtc.presentation.parent && (rtc.presentation.parent.uuid == rtc.uuid)) {
    return true;
  } 
  else {
    return false;
  } 
}

function presentationClosed() {
  console.log('presentationClosed');
  if (rtc.presentation){
    rtc.present(null);
    rtc.presentation = false;
  }
  hidePresentationStreamWindow();
  presentation = null; 
  presenting = false;
  remote_presenting = false;
  if ('srcObject' in presVideo) {
    presVideo.srcObject = null;
  }
  else {
    presVideo.src = null; 
  }
}

function remotePresentationClosed(reason) {
  console.log('remotePresentationClosed');
  remote_presenting = false;
    if (!presentation) {
        if (reason) {
          proAlert("Content Sharing", "warning", reason, "OK", "close", "content_sharing_button");
          //alert(reason);
          presentationClosed();
        }
    }
}

function checkForBlockedPopup() {
  console.log('checkForBlockedPopup');
    id_presentation.classList.remove("inactive");
    if (!presentation || typeof presentation.innerHeight === "undefined" || (presentation.innerHeight === 0 && presentation.innerWidth === 0)) {
        // Popups blocked
        presentationClosed();
        flash_button = setInterval(function(){id_presentation.classList.toggle('active');}, 1000);
    } else {
        id_presentation.textContent = trans['BUTTON_HIDEPRES'];
        presentation.document.title = decodeURIComponent(conference) + " presentation from " + presenter;
        if (flash_button) {
            clearInterval(flash_button);
            flash_button = null;
            id_presentation.classList.remove('active');
        }
        if (presentation.document.getElementById('presVideo')) {
            rtc.getPresentation();
        } else {
            loadPresentation(presentationURL);
        }
    }
}


function loadPresentation(url) {
  console.log('loadPresentation');
  console.log(url);
  if (presentation == false) {
    createPresentationStreamWindow();
  }
   if (presentation){
      console.log('loadPresentation2');
      if(rtc){
         console.log('running getPresentation');
        rtc.getPresentation(url);
      }
    } else {
        presentationURL = url;
    }
}

function resizePresentationWindow() {
  console.log('resizePresentationWindow');
    if (presentation != null && presentation.presimage.clientWidth > 640 && !userResized) {
        presWidth = presentation.presimage.clientWidth;
        presHeight = presentation.presimage.clientHeight;
        presentation.window.resizeTo(presWidth + (presentation.outerWidth - presentation.innerWidth), presHeight + (presentation.outerHeight - presentation.innerHeight));
    }
}

function loadPresenterStream(videoURL) {
  console.log('loadPresenterStream');
  console.log(videoURL);
  presVideoMedia = videoURL;
  console.log(videoURL);
    if (presenting){
        presVideo.poster = "";
        if ('srcObject' in presVideo) {
          console.log('loadPresenterStream srcObject way');
          presVideo.srcObject = videoURL;
        }
        else {
          console.log('loadPresenterStream src way');
          presVideo.src = URL.createObjectURL(videoURL);
        }
    }
  
}

function loadPresentationStream(videoURL) {
  
  console.log('loadPresentationStream');
  console.log(videoURL);
  presVideoMedia = videoURL;
    if (!presenting && !remote_presenting ) { 
        presVideo.poster = "";
        if ('srcObject' in presVideo) {
          console.log('loadPresentationStream srcObject way');
          presVideo.srcObject = videoURL;
        }
        else {
          console.log('loadPresentationStream src way');
          presVideo.src = URL.createObjectURL(videoURL);
        }
        if (rtc.presentation && rtc.presentation.state == 'CONNECTED') {
          remote_presenting = true;
        }
    }
  
}

function createPresentationStreamWindow() {
  console.log('createPresentationStreamWindow');
  var presvideoDiv = document.getElementById('content_sharing_partial');
    if (presentation == null) {
        presentation = presVideo; 
        $("#content_sharing_button").attr("aria-expanded","true");
        if (presvideoDiv.classList.contains('hidden')){
          presvideoDiv.classList.remove('hidden');
        }
    }
}

function hidePresentationStreamWindow() {
  console.log('hidePresentationStreamWindow');
  var presvideoDiv = document.getElementById('content_sharing_partial');
    if (presvideoDiv) {
      if (!presvideoDiv.classList.contains('hidden')){
        presvideoDiv.classList.add('hidden');
      }
      $("#content_sharing_button").attr("aria-expanded","false");
      presentation = null;
    }
}


function presentationStartStop(setting, pres, uuid) {
  console.log('presentationStartStop');
  console.log("setting" + setting);
  console.log("pres: " + pres);
  console.log("uuid: " + uuid);
  if (setting) {
    createPresentationStreamWindow();
  }
  else {
    hidePresentationStreamWindow();
  }
}

function togglePresentation() {
  console.log('togglePresentation');
    if (presentation == true) {
        hidePresentationStreamWindow();
    } else if (!id_presentation.classList.contains("inactive")) {
        if (videoPresentation) {
            createPresentationStreamWindow();
        } else {
            createPresentationWindow();
        }
    }
}


function goFullscreen() {
  console.log('goFullScreen');
    if (!id_fullscreen.classList.contains("inactive")) {
        video.goFullscreen = ( video.webkitRequestFullscreen || video.mozRequestFullScreen );
        video.goFullscreen();
    }
}

function startExam() {
  // send 'startExam' signal to webapp
  var uhe_c_id = document.getElementById("current_user_id").innerHTML;
  $.ajax({
    url:"/api/start_tytocare_exam",
    method: "POST",
    data: {machine_name: uhe_machine_name, user_id: uhe_c_id},
    dataType: "JSON",
    success: function(data) {
      // Change icon to 'end exam'
      $("#end_exam_image").removeClass('hidden');
      $("#start_exam_image").addClass('hidden');
      // open iFrame, set video URL
    },
    error: function(data) {
      //closeProAlert(false);
      proAlert("Error", "error", "There was an error starting the exam", "OK", "close", "");
    }
  });
}

function endExam() {
  $.ajax({
    url:"/api/end_tytocare_exam",
    method: "POST",
    data: {machine_name: uhe_machine_name},
    dataType: "JSON",
    success: function(data) {
      $("#start_exam_image").removeClass('hidden');
      $("#end_exam_image").addClass('hidden');
      tyto_exam_in_progress = false;
    },
    error: function(data) {
      proAlert("Error", "error", "There was an error ending exam", "OK", "close", "");
    }
  });
}

function presentScreen() {
  console.log('presentScreen');
  var presvideoDiv = document.getElementById('content_sharing_partial');
  console.log('presenting: ' + presenting);
  console.log('presenting div' + presvideoDiv.classList.contains('hidden'));
  if (amPresenting()) {  // if I'm already presenting then toggle
     console.log('present false');
     presenting = false;
     presentationClosed(); 
  }
  else {
    console.log('i want to present: ' + rtc.presentation);
    if (!rtc.presentation) { // make sure no one else is presenting
        console.log('present true');
        rtc.present('screen');
        presenting = true;
        createPresentationStreamWindow();
     }
   }
}
/** 
 * p_alias     => The SIP/H323/email etc address to invite
 * invite_type => SIP/H323/EMAIL etc
 * remote_name => The display name to use for the invited guest
 */
function addExternalPart(p_alias, invite_type, remote_name, stratus_billing_code = null) {
  if (p_alias.replace(/ /g, '').length < 1) {
    proAlert("Invalid Entry", "error", "Please enter a valid participant address.", "OK", "close", "addParticipantBtn");
  } 
  else {
    var t = 'sip';
    switch (invite_type) {
      case "CLOUDBREAK_INVITE":
        t = "cloudbreak_invite"
        break;
      case "H.323": 
        t = "h323"; 
        break;
      case "RTMP":
        t = "rtmp";
        break;
      case "LYNC/SKYPE":
        t = "mssip";
        break;
      case "EMAIL":
        t = "email";
        break;
      case "TEXT":
        t = "text";
        break;
      case "TELEPHONE":
        t = "pstn";
        break;
      case "pstn":
        t = "pstn";
        break;
      default: 
        t = "sip";
    }  

    if (t == "cloudbreak_invite") {
      // Cloudbreak
      var language      = $('#translator_select')[0].options[$('#translator_select')[0].selectedIndex].text.trim();
      var c_alias       = $('#call_alias')[0].innerHTML.trim();
      var martiiId      = $('#marttiId')[0].innerHTML.trim();
      if (patient_name) {
        patient_name      = patient_name.replace("Patient: ", "");
      } else {
        patient_name      = "Patient";
      }
      
      $.ajax({
        url:"/api/send_cloudbreak_invite",
        method: "POST",
        data: {vmr_alias: c_alias, language_name: language, martiiId: martiiId, patient_name: patient_name},
        dataType: "JSON",
        success: function(data) {
          //closeProAlert(false);
          //proAlert("Invitation Sent", "success", "Your invitation has been sent", "OK", "close", "addParticipantBtn");
        },
        error: function(data) {
          closeProAlert(false);
          //proAlert("Error", "error", "There was an error sending invitation to interpreter", "OK", "close", "addParticipantBtn");
        }
      });

    } else if (t == "pstn") {
      // PSTN
      var textbox = document.getElementById("search-box");
      p_alias = p_alias.replace(/\D/g,'');
      console.log("Calling rtc.dialOut("+p_alias+", 'auto', 'guest', '"+externalEnded+"')");
      rtc.dialOut(p_alias, 'auto', 'guest', externalEnded); 
      proAlert("Invitation Sent", "success", "Your invitation has been sent", "OK", "close", "addParticipantBtn");
      textbox.placeholder = '(###)###-####';

    } else if (t != "email" && t != "text") {
      // SIP / H323 / RTMP / LYNC/SKYPE
      if (use_auto_protocol()) {
        /** 
         * INC-149: Prefix SIP, H323 and Lync/Skype addresses as required, and assign 'auto' as protocol
         */
        remote_name = p_alias;
        p_alias = determine_alias(t, p_alias);
        t = 'auto';
        // End INC-149
      } 
      
      if (!(stratus_billing_code === null)) {
        rtc.sendRequest("dial", {"destination": p_alias, "protocol": "auto", "custom_sip_headers": {"X-Stratus-Billing-Code": stratus_billing_code}, remote_display_name:remote_name, overlay_text:""}, externalEnded);
      } else {
        if (remote_name) {
          rtc.dialOut(p_alias, t, 'guest', externalEnded, {remote_display_name:remote_name, overlay_text:""});
        } else {
          rtc.dialOut(p_alias, t, 'guest', externalEnded, {overlay_text:""});
        }
      }
      if (!is_mobile()){
        open_participant();
      }

    } else { 
      // EMAIL / TEXT
      var c_alias = document.getElementById('call_alias').innerHTML;
      var c_user_id = document.getElementById("current_user_id").innerHTML;
      var textbox = document.getElementById("search-box");
      if (isMeeting){
        var invite_expiry = document.getElementById("customer_invite_expiry").innerHTML;
      }
      document.getElementById("search-box").value = '';
      if (t == 'text') {
       dial_code = $('#selected_dial_code').html();
       dial_format = $('#selected_dial_format').html();
       $.ajax({
         url:"/api/send_text",
         method: "POST",
         data: {code: dial_code, text: p_alias, call_alias: c_alias, current_user_id: c_user_id, expire_amount: invite_expiry},
         dataType: "JSON",
         success: function(data) {
           textbox.placeholder = dial_format;
           if (invite_expiry != null) {
             proAlert("Invitation Sent", "success", "Your invitation to " + dial_code + p_alias + " has been sent.  This invitation will expire in " + invite_expiry + " minutes.", "OK", "close", "addParticipantBtn");
           }
           else {
             proAlert("Invitation Sent", "success", "Your invitation to " + dial_code + p_alias + " has been sent.", "OK", "close", "addParticipantBtn");
           }
         },
         error: function(data) {
           proAlert("Error", "error", "There was an error sending invitation to " + dial_code + p_alias, "OK", "close", "addParticipantBtn");
           textbox.placeholder = dial_format;
         }
       });
      }
      else {
       document.getElementById("search-box").placeholder = 'name@domain';
       $.ajax({
         url:"/api/send_invite",
         method: "POST",
         data: {email: p_alias, call_alias: c_alias, current_user_id: c_user_id, expire_amount: invite_expiry},
         dataType: "JSON",
         success: function(data) {
           if (invite_expiry != null) {
             proAlert("Invitation Sent", "success", "Your invitation to " + p_alias + " has been sent.  This invitation will expire in " + invite_expiry + " minutes.", "OK", "close", "addParticipantBtn");
           }
           else {
             proAlert("Invitation Sent", "success", "Your invitation to " + p_alias + " has been sent.", "OK", "close", "addParticipantBtn");
           }
         },
         error: function(data) {
           proAlert("Error", "error", "There was an error sending invitation to " + p_alias, "OK", "close", "addParticipantBtn");
         }
       });
      }
    }
  }
  if (is_mobile()){
    toggle_sidebar_panel('');
    zoomOutMobile();
  }
}

function externalEnded(participant) {
  document.getElementById("search-box").value  = '';
  //participant["result"][0];
}

// Stratus SIP dial-outs use rtc.sendRequest() instead of rtc.dialOut(), so handle the callback a little differently
externalEndedStratusBillingCode = function(e) {
  if (e.target.status == 200) {
    document.getElementById("search-box").value  = '';
  } else {
    // Stratus sendRequest() failed
  }
}

function remove_host_by_user() {
  var c_alias = document.getElementById('call_alias').innerHTML;
  var c_user_id = document.getElementById("current_user_id").innerHTML;
  if (!isMeeting){
    $.ajax( { 
      url: "/endpoint/remove_as_host_by_vmr_and_user?user_id=" + c_user_id + "&vmr=" + c_alias,
      dataType: "JSON"
    });
  }
  else {
    if (!invited || epic_patient) {
      //sendEpicResponse(2); -- moved to websocket unsubscription
    }
  }
}

function hangUpAllParticipantsThroughRest(){
  var c_alias = document.getElementById('call_alias').innerHTML;
    $.ajax({
      url:"/endpoint/hang_up_all_participants?vmr_name=" + c_alias , 
      dataType: "JSON",
      async: false,
      success: function(data) {}
     });

}
   
function shouldIHangUp(remote) {
  var c_alias = document.getElementById('call_alias').innerHTML;
  var c_user_id = document.getElementById("current_user_id").innerHTML;
  var c_uuid = rtc.uuid;

  $.ajax({
    url:"/endpoint/internal_check_to_end_call?alias=" + c_alias  + "&user_id=" + c_user_id + "&uuid=" + c_uuid, 
    dataType: "JSON",
    async: true,
    success: function(data) {
      if (data.result == 'true') {
        // last guy, hang up conference! 
        finalEndCall();
      }
      else {
        // more hosts, only hang up yourself (or remote)
        if (!remote) {
          singleEndCall();
        }
      }
    }
  });
}

function participantShouldIHangUp() {
    // only checking if std endpoint hung up on us
    if (participants.length < 2) {
       // last guy, hang up conference! 
       finalEndCall();
    }
}

function runMutePatient() {
  if (isMeeting) {
    toggleMeetingPOH();
  }
  else {
    mutePatient();
  }
}

function forceMutePatient() { // turn on regardless of current status
  $('#poh_button').attr("aria-pressed","true");
  tunnel("mute_patient",null);
  var poh_mute = document.getElementById('poh_mute_incoming');
  if (poh_mute) {
    if (poh_mute.innerHTML && poh_mute.innerHTML.toLowerCase() == 'true'){
      mutePartWithPOH();
    }
  }
}

function mutePatient() {
  var m = document.getElementById('mute_patient_button');
  if (m.innerHTML == 'Place Patient on Hold') {
    $('#poh_button').attr("aria-pressed","true");
    tunnel("mute_patient",null);
    var poh_mute = document.getElementById('poh_mute_incoming');
    if (poh_mute) {
      if (poh_mute.innerHTML && poh_mute.innerHTML.toLowerCase() == 'true'){
        mutePartWithPOH();
      }
    }
  }
  else {
    tunnel("unmute_patient",null);
    $('#poh_button').attr("aria-pressed","false");
    var poh_mute = document.getElementById('poh_mute_incoming');
    if (poh_mute) {
      if (poh_mute.innerHTML && poh_mute.innerHTML.toLowerCase() == 'true'){
        unmutePartWithPOH();
      }
    }
  }
}

function checkFailedJoin(){
  tunnel("DEBUG checkFailedJoin = " + callConnected,null);
  if (callConnected == false) {
    need_endpoint = true;
    console.log("Adding room a second time due to timeout failure");
    addPart();
  }
}

function testMult(){
  need_endpoint = true;
  console.log("Adding room a second time due to timeout failure - test");
  addPart();
}

function startTimer(){
  console.log("RUNNING startTimer() " + callConnected);
  if (callConnected == false) {
    proAlert("No Answer", "error", "This room is currently unavailable", "OK", "close", false);
  }
}

function use_auto_protocol() {
  return !($('#pexip_enable_legacy_dialout_api')[0].innerHTML.trim() == '1');
}

function determine_alias(protocol, alias) {
  switch(protocol) {
    case "sip":
      prefix = $('#pexip_sip_routing_prefix')[0].innerHTML.trim();
      return prefix.concat(alias);
    case "h323":
      prefix = $('#pexip_h323_routing_prefix')[0].innerHTML.trim();
      return prefix.concat(alias);
    case "mssip":
      prefix = $('#pexip_skype_routing_prefix')[0].innerHTML.trim();
      return prefix.concat(alias);
    default:
      return alias;
  }
}

function addPart() {
  if (need_endpoint) {
    if (isCisco()){
      var protocol = document.getElementById('cisco_protocol').innerHTML.toLowerCase();
      var p_alias = document.getElementById('cisco_sip').innerHTML;

      if (use_auto_protocol()) {
        p_alias = determine_alias(protocol, p_alias);
        protocol = 'auto';
      }

      rtc.dialOut(p_alias, protocol, 'guest', null, {remote_display_name:'Patient: ' + document.getElementById('room_name').innerHTML, overlay_text:""}); 
      setTimeout(function(){startTimer();}, 30000); // wait thirty seconds to see if call connects
      need_endpoint = false;
    }
    else {
      tunnel("api", {announce: announce, vmr: vmr, vmr_pin: rtc.pin});
      need_endpoint = false;
    }
  }
  mustAddPart = false;
}

function unpresentScreen(reason) {
    console.log('unpresentScreen ' + reason);
    if (reason) {
      proAlert("Content Sharing", "warning", reason, "OK", "close", "content_sharing_button");
      //alert(reason);
    }
    //id_screenshare.textContent = trans['BUTTON_SCREENSHARE'];
    presenting = false;
    hidePresentationStreamWindow();
}

/* ~~~ MUTE AND HOLD/RESUME ~~~ */

function muteStreams() {
  
  var cName = "self_mute"; 
  var selfMute = document.getElementById(cName);

  if (hasClass(selfMute, 'muted')){
      muteAudioButtons(false);
      if (rtc) {
        rtc.muteAudio();
      } 
    }
  else { 
    muteAudioButtons(true);
      if (rtc) {
        rtc.muteAudio();
      } 
    }
}

function setMute() {
    muteStreams();
}

function unSetMute() {
  if ($('#self_mute').hasClass('muted')) {
    muteStreams();
  }
}


function muteVideoStreams() {

 if($('#mute_video_streams_button').hasClass('fa-volume-up')) {
    $("#mute_video_streams_button").removeClass('fa-volume-up').addClass('fa-volume-off');   
    document.getElementById("mute_video_streams_button").style.color ='#c6c647'
    
  }
  else {
    $("#mute_video_streams_button").removeClass('fa-volume-off').addClass('fa-volume-up');
    document.getElementById("mute_video_streams_button").style.color='#adafb1'
    
  }

    if (!id_mutevideo.classList.contains("inactive")) {
        muteVideo = rtc.muteVideo();
        id_mutevideo.classList.toggle('selected');
        if (muteVideo) {
            id_mutevideo.textContent = trans['BUTTON_UNMUTEVIDEO'];
        } else {
            id_mutevideo.textContent = trans['BUTTON_MUTEVIDEO'];
        }
    }
}

function toggleSelfview() {
    if (!id_selfview.classList.contains("inactive")) {
        if (flash) {
            //flash.toggleSelfview();
            if (id_selfview.classList.contains('selected')) {
                flash.hideSelfview();
                id_selfview.classList.remove('selected');
                id_selfview.textContent = trans['BUTTON_SHOWSELF'];
            } else {
                flash.showSelfview();
                id_selfview.classList.add('selected');
                id_selfview.textContent = trans['BUTTON_HIDESELF'];
            }
        } else {
            selfview.hidden = !selfview.hidden;
            if (selfview.hidden) {
                id_selfview.textContent = trans['BUTTON_SHOWSELF'];
                id_selfview.classList.remove('selected');
                rosterlist.classList.remove('shorter');
            } else {
                id_selfview.textContent = trans['BUTTON_HIDESELF'];
                id_selfview.classList.add('selected');
                rosterlist.classList.add('shorter');
            }
        }
    }
}

function holdresume(setting) {
    /*
    if (setting === true) {
        video.src = "";
        video.poster = "img/OnHold.jpg";
        id_muteaudio.classList.add("inactive");
        id_mutevideo.classList.add("inactive");
    } else {
        video.poster = "";
        video.src = videoURL;
        if (presentation != null) {
            loadPresentation();
        }
        id_muteaudio.classList.remove("inactive");
        id_mutevideo.classList.remove("inactive");
    }
    */
}

/* ~~~ ROSTER LIST ~~~ */

function setParticipant(participant) {
   console.log('--- create participant');
   var inv = 0;
   var ap = 0;
 
   participant_objects[participant["uuid"]] = participant;
 
   if (invited) { inv=1; }
   if (api_call) { ap=1; }

   var dr = document.getElementById("dr_name").innerHTML;
   var current_user_id = document.getElementById("current_user_id").innerHTML;

   alias = document.getElementById("call_alias").innerHTML;
   call_token = document.getElementById('call_token').innerHTML;

   if (participant["display_name"].indexOf("Guest") < 0 && dr == participant["display_name"] && 
       participant["display_name"].indexOf("patient") < 0 && participant["display_name"].indexOf("Patient") < 0 ) {
        $.ajax({
       url:"/endpoint/joined_call?alias=" + alias + "&p_uuid=" + participant["uuid"] + "&inv=" + inv + "&ap=" + ap + "&call_token=" + call_token + "&p_current_user_id=" + current_user_id + "&display_name=" + participant["display_name"] + "&role=" + participant["role"], 
       dataType: "JSON",
     });
   } else {
     console.log("Not adding participant " + participant["display_name"] + " to call_participants table because they are a guest or patient");
   }
 
    // Calling room here instead of at connected to increase speed - must be sure we connect - set timer

    tunnel("DEBUG add patient if necessary - mustAddPart = " + mustAddPart,null);
    if (mustAddPart) {
      addPart();
    }

    if (checkFailAdd) {
      checkFailAdd = false;
      var room_fail_to_join = document.getElementById('room_join_timeout').innerHTML;
      tunnel("DEBUG test checkFailed setTimeout added in " + room_fail_to_join, null);
      setTimeout(checkFailedJoin, room_fail_to_join); // do a double check that room actually joined 
    }

   
  var main_p = document.getElementById("main_participant");
  if (main_p.innerHTML == 'init') {
    main_p.innerHTML = 'second';
  }
  else if (main_p.innerHTML == 'second') {
    main_p.innerHTML = participant["uuid"];
  }
  else {
  }

  if (participant["display_name"].indexOf("Guest") >= 0) {
    rtc.setRole(participant["uuid"] , 'guest'); 
  }
   
  if ((participant["display_name"].indexOf("patient") >= 0) || (participant["display_name"].indexOf("Patient") >= 0) )  {
    patientUUID = participant["uuid"];
    patient_name = participant["display_name"];
    rtc.setParticipantSpotlight( participant["uuid"] , true );
  }
  else {
    rtc.setParticipantSpotlight( participant["uuid"] , false );
  }

  // keep full participant list
  if (!participants.includes(participant["uuid"])) {
     participants.push(participant["uuid"]);
  }
  updateRoster(participant); 

  $("#cameraMicPrompt").addClass("hidden");

  /* Add if we want to auto disconnect dups
  if (participant["display_name"].indexOf("Guest") >= 0  ) {
    setTimeout(function(){vmr_dups(participant["display_name"], alias)}, 100);
  }
  */
}

function vmr_dups(display_name, alias) {
     $.ajax({
       url:"/endpoint/check_vmr_for_dups?alias=" + alias +  "&display_name=" + display_name, 
       dataType: "JSON",
       success: function(data){
         if (data) {
           for (var i=data.length; i >=0; --i) {
             console.log('checking dup:' + data[i]);
             if (data[i] != 'none') {
               console.log('Deleting duplicate: ' + data[i]);
               endPart(data[i]);
             }
           }
         }
       } 
     });
}

function setSpotLight() {
  var main_p = document.getElementById("main_participant");
  rtc.setParticipantSpotlight( main_p.innerHTML , 'true' );
}

function removeFromRoster(participant) {
  var uuid = participant["uuid"];
  var element = document.getElementById(uuid);
  if (element != null) {
    setTimeout(function(){fadeOut(element);}, 1000);
    setTimeout(function(){element.outerHTML = "";}, 1200);
    setTimeout(function(){delete element;
      //close column if no additional participants
      if (!$(".added_part")[0]){
        close_participant(); 
      }
    }, 1200);
   }
  $('#dial_phone').addClass('hidden');
  $('#add_caller_phone').removeClass('hidden');
 
  // Find and remove item from an array
  var i = parts_a.indexOf(uuid);
  if(i != -1) {
    parts_a.splice(i, 1);
  } 
  var n = participants.indexOf(uuid);
  if(n != -1) {
    participants.splice(n, 1);
    setTimeout(participantShouldIHangUp(true), 1000);
  } 

  var h = hosts.indexOf(uuid);
  if(h != -1) {
    hosts.splice(h, 1);
    // a host has hung up 
    $.ajax( { 
      url: "/endpoint/remove_as_host?uid=" + uuid,
      dataType: "JSON"
    });
  }
}

/** Used to identify a locked room (Clinician only) 
 *  TODO: Use Websockets for this communication instead
*/
function pexipConferenceUpdate(properties) {
  console.log('Conference update triggered, checking if lock status changed');
  var should_lock_vmrs = false;
  var client_lock_vmrs = $('#lock_vmrs')[0].innerHTML.trim();

  if (client_lock_vmrs && client_lock_vmrs == 'true'){
    should_lock_vmrs = true;
  }

  if (!isMeeting && !from_observer && should_lock_vmrs) {
    console.log("Conference updated, checking for locked status");
    var lock_vmr_inactive = $("#lock_vmr_inactive");
    var lock_vmr_active = $("#lock_vmr_active");
    var endpoint_id = $('#endpoint_id')[0].innerHTML.trim();

    $.ajax({
      url:"/endpoint/is_endpoint_in_locked_conf?endpoint_id=" + endpoint_id,
      dataType: "JSON",
      success: function(data) {
        if (data['result'] == true) {
          console.log("Room is locked");
          if (!conference_locked) {
            conference_locked = true;
            lock_vmr_inactive.addClass('hidden');
            lock_vmr_active.removeClass('hidden');
            $('#toggle_lock_vmr_button').attr("aria-pressed","true");
            show_in_call_notification("Room Locked");
          }
        } else {
          console.log("Room is not locked");
          if (conference_locked) {
            conference_locked = false;
            lock_vmr_active.addClass('hidden');
            lock_vmr_inactive.removeClass('hidden');
            $('#toggle_lock_vmr_button').attr("aria-pressed","false");
            if ($("#r_name").html() != "") { //Prevents onCallStart Notification
              show_in_call_notification("Room Unlocked"); 
            }
          }
        }
      }
    });

  }
}


function updateRoster(participant) {
  participant_objects[participant["uuid"]] = participant;

  var dr = document.getElementById("dr_name").innerHTML;
  var main_p = document.getElementById("main_participant").innerHTML;
  var p_name = participant['display_name'];
  var p_uuid = participant['uuid'];
  var exist_already = document.getElementById(p_uuid);
  alias = document.getElementById("call_alias").innerHTML;

  if ((dr != p_name) && (main_p != p_uuid) && (exist_already != null) && !$("." + p_uuid)[0] ) {
    if(participant["service_type"] != 'connecting') {
      addToRoster(participant["display_name"], participant["uuid"], participant["service_type"]);
      //open_participant();
    }
  }

  // Patient has joined the call!
  if (participant["service_type"] == 'conference' && 
      (participant["display_name"].indexOf("patient") >= 0 || participant["display_name"].indexOf("Patient") >= 0 )) {
    callConnected = true;
    var waiting_room = document.getElementById('waiting_room');
    if (waiting_room && waiting_room.innerHTML == 'yes') {
      //turn on waiting room
      $('#room_lock').addClass('hidden');
      $('#lock_vmr_toggle').addClass('hidden');
      rtc.setConferenceLock(true);
      conference_locked = true;
    }
  }

  // check if you were a previous waiting room guest and show media buttons
  if (rtc.current_service_type == 'conference') {  // doesn't carry over for waiting room guests
    $('#self_video').removeClass('hidden');
    $('#self_mute').removeClass('hidden');
  }

  // keep full participant list
  var i = participants.indexOf(p_uuid);

  if (!participants.includes(p_uuid)) {
    // New participant
     participants.push(p_uuid);
     addToRoster(participant["display_name"], participant["uuid"], participant["service_type"]);
  } 

  if (!for_hangup.includes(p_uuid)) {
     for_hangup.push(p_uuid);
     $.ajax( { 
       url: "/endpoint/update_call_list?alias=" + alias + "&p_uuid=" + for_hangup[i] + "&display_name=" + participant["display_name"], 
       dataType: "JSON"
     });
  }

  // May need to handle this for removing a host?
  if (participant['role'] == 'chair') {
    // Add to hosts if not already present
    if (!hosts.includes(p_uuid)) {
       // a host has been added
       hosts.push(p_uuid);
       $.ajax( { 
         url: "/endpoint/set_as_host?uid=" + p_uuid,
         dataType: "JSON"
       });
    }
  } else {
    // remove from hosts if exists
    if (hosts.includes(p_uuid)) {
      var h = hosts.indexOf(p_uuid);
      if(h != -1) {
        hosts.splice(h, 1);
      }
    }
  }

  // Handle participants let in from waiting room
  if (participant["service_type"] != 'waiting_room'){
    // existing participant, make sure chair/guest correct
    if (p_uuid != patientUUID) { // if not patient
      if (p_uuid != rtc.uuid) {  // if not self
        // Other participant change, reflect chair/guest icon in participant list
        if (participant['role'] == "chair") {
          // Participant is chair
          $('#guest_'+participant["uuid"]).removeClass('hidden');
          $('#host_'+participant["uuid"]).addClass('hidden');
        } else {
          // Participant is guest
          $('#guest_'+participant["uuid"]).addClass('hidden'); 
          $('#host_'+participant["uuid"]).removeClass('hidden'); 
        }
      } else {
        // Self role change, configure screen widgets
        if (participant['role'] == "chair") {
          showHostWidgets();
        } else {
          showGuestWidgets();
        }
      }
    }


    var admitButton = document.getElementById('waiting_' + p_uuid);
    if (admitButton) {
      admitButton.classList.add('hidden');
    }
  } 
}

function mutePart(uuid) {
  rtc.setParticipantMute(uuid, true);
}

function mutePartWithPOH(){
  rtc.setParticipantMute(patientUUID, true);
  var mic_name = '#mic_'+patientUUID;
  if ($(mic_name)){
    $(mic_name).removeClass('fa-microphone');
    $(mic_name).addClass('fa-microphone-slash');
    $(mic_name).attr("aria-pressed","true");
  }
}

function unmutePartWithPOH(){
  rtc.setParticipantMute(patientUUID, false);
  var mic_name = '#mic_'+patientUUID;
  if ($(mic_name)){
    $(mic_name).removeClass('fa-microphone-slash');
    $(mic_name).addClass('fa-microphone');
    $(mic_name).attr("aria-pressed","false");
  }
}

function toggleMutePart(uuid) {
  var mic_name = '#mic_'+uuid;
  if ( $(mic_name).hasClass('fa-microphone') ) {
    $(mic_name).removeClass('fa-microphone');
    $(mic_name).addClass('fa-microphone-slash');
    rtc.setParticipantMute(uuid, true);
    $(mic_name).attr("aria-pressed","true");
  }
  else {
    $(mic_name).removeClass('fa-microphone-slash');
    $(mic_name).addClass('fa-microphone');
    rtc.setParticipantMute(uuid, false);
    $(mic_name).attr("aria-pressed","false");
  }
}

function endListPart(uuid) {
  // from participant list only.  Must check if this makes you last guy on call
  endPart(uuid)
}

function endPart(uuid) {
  rtc.disconnectParticipant(uuid);
}

function addToRoster(roster_name, uuid,service_type) {
  //setTimeout(function () {
  dialingToRoster(roster_name, uuid, service_type);
  $('#dial_phone').addClass('hidden');
  $('#add_caller_phone').removeClass('hidden');
  $('.loading_' + uuid).addClass('hidden');
  $('.mute_' + uuid).removeClass('hidden');
  $('.end_' + uuid).removeClass('hidden');
  //},
  //2000);
}

function dialingToRoster(roster_name, uuid, service_type) {
   var has_uuid = document.getElementById(uuid);
   if (typeof($('#allow_make_host')[0]) !== "undefined"){ 
    var allow_make_host = $('#allow_make_host')[0].innerHTML.trim();
   }
   var pin_uuid = '';
   var locked = '';
   var to_host = '';
   var to_guest = '';
   if (isMeeting && !epic_patient) { /* only add pin participant for MyChart and is not patient */
     pin_uuid = "<button href='javascript:;' class='fa fa-thumbtack pin_part' id= 'spotlight_" + uuid + "' title='Pin Participant' aria-label='Pin Participant' onclick=pinMeetingPartByButton('" + uuid + "')></button>";
   }

   // join only if conference locked, waiting room
   if (!has_uuid && service_type == 'waiting_room') {
     locked = "<button href='javascript:;' class='fa fa-sign-in waiting_room' id= 'waiting_" + uuid + "' title='Admit Participant' aria-label='Admit Participant' onclick=admitByButton('" + uuid + "')></button>";
   }

   // INC-358: Hosts can make other guests Hosts
    if (allow_make_host == "true") {
      to_host = "<button href='javascript:;' class='fa fa-user-circle host_or_guest hidden' id='host_" + uuid + "' title='Make Host' aria-label='Make Host' onclick=makeChair('" + uuid + "')></button>";
      to_guest = "<button href='javascript:;' class='fa fa-h-square host_or_guest hidden' id='guest_" + uuid + "' title='Make Guest' aria-label='Make Guest' onclick=makeGuest('" + uuid + "')></button>"; 
    }

   if (!has_uuid){
     // New participant
     console.log('ADDING to sidebar ' + roster_name);
     if (!parts_a.includes(uuid)){ 
       parts_a.push(uuid);
     }

     /* only have mute and hang up if not guest or a Clinician call (participants panel hidden for Clinician guests) */
     var mute_and_end_string = "<div class='part_mic_div'><div id='part_mic_" + roster_name.replace(/ /g, '_') + "' ><button href='javascript:;' id='mic_"+uuid+"' aria-label='Mute Microphone' onclick=toggleMutePart('" + uuid + "') class='fa fa-microphone mute_" + uuid + "  hidden' title='Mute Microphone'></button><button href='javascript:;' class='fa fa-times end_" + uuid + "  hidden' title='Remove Participant' aria-label='Remove Participant' onclick=endListPart('" + uuid + "')></button></div></div>"
     var buf_ = '';

     if (invited && isMeeting) {   // Better way to do this?
       mute_and_end_string = " ";
       buf_ = 'left_buf';
     }

     var p2 = "<li class='" + buf_ + "' id='" + uuid + "'>" + pin_uuid + "<p tabindex='0' class='added_part " + "'>" + roster_name + "<a href='javascript:;' tabIndex='-1' class='fa fa-spinner loading_" + uuid + "'></a></p>" + mute_and_end_string + to_host + to_guest + locked + "</li>";
     document.getElementById("p3").insertAdjacentHTML('beforebegin', p2);
   }
   var dr = document.getElementById("dr_name").innerHTML.replace(/ /g, '_');
   var dr_string = document.getElementById('part_mic_' + dr);
   
   if (dr_string) { 
     if (!dr_string.classList.contains('hidden')) {
       dr_string.classList = 'hidden';
     }
   }
}

function makeChair(uuid) {
  rtc.setRole(uuid, 'chair');

  // set user with UUID as host in database
  var _inv = 0;
  var _ap = 0;
  var _call_token = document.getElementById('call_token').innerHTML;
  var _current_user_id = -1;
  var display_name = participant_objects[uuid].display_name;
  var alias = document.getElementById("call_alias").innerHTML;
  $.ajax({
    url:"/endpoint/joined_call?alias=" + alias + "&p_uuid=" + uuid + "&inv=" + _inv + "&ap=" + _ap + "&call_token=" + _call_token + "&p_current_user_id=" + _current_user_id + "&display_name=" + display_name + "&role=chair", 
    dataType: "JSON",
  });
}

function makeGuest(uuid) {
  rtc.setRole(uuid, 'guest');
  $.ajax( { 
    url: "/endpoint/remove_as_host?uid=" + uuid,
    dataType: "JSON"
  });
}

function showHostWidgets() {
  //console.log("++++++++++++++++++++++++++++++++++++++ showing host widgets");
  $('#home_button').removeClass('hidden');
  $('#sliders_button').removeClass('hidden');
  $('#see_more').removeClass('hidden');
  $('#poh').removeClass('hidden');
  $('#poh_button').removeClass('hidden');
  $('#ring_bell').removeClass('hidden');
  $('#sidebar').removeClass('hidden');
  var waiting_room = document.getElementById('waiting_room');
  if (waiting_room && waiting_room.innerHTML == 'no') {
    $('#room_lock').removeClass('hidden');
    $('#toggle_lock_vmr').removeClass('hidden');
  }
  $('#participant_link').removeClass('hidden');
  $('#screenshot_button').removeClass('hidden');
  $('#function_bar_topper').removeClass('hidden');
  if (document.getElementById('participants_button')) {
    document.getElementById('participants_button').innerHTML = document.getElementById('participants_button').innerHTML.replace('Chat Room', 'Participants');
  }


}
function showGuestWidgets() {
  //console.log("++++++++++++++++++++++++++++++++++++++ showing guest widgets");
  $('#home_button').addClass('hidden');
  $('#sliders_button').addClass('hidden');
  $('#see_more').addClass('hidden');
  $('#poh').addClass('hidden');
  $('#poh_button').addClass('hidden');
  $('#ring_bell').addClass('hidden');
  $('#sidebar').addClass('hidden');
  $('#room_lock').addClass('hidden');
  $('#toggle_lock_vmr').addClass('hidden');
  $('#participant_link').addClass('hidden');
  $('#screenshot_button').addClass('hidden');
  $('#function_bar_topper').addClass('hidden');
  if (document.getElementById('participants_button')) {
    document.getElementById('participants_button').innerHTML = document.getElementById('participants_button').innerHTML.replace('Participants', 'Chat Room');
  }
  if ($('#sidebar_').hasClass('open')) {
    $('#sidebar_').addClass('hidden');
    $('#sidebar_').animate({width:"0px"});
    $('#sidebar_').removeClass('open');
    closeChat();
  }
}


/* MyChart only - Update Pexip with the newly pinned participant */
function pinMeetingPartByButton(uuid){
  if (meetingPartSpotlight != uuid) { 
    if (meetingPartSpotlight != '') { 
      /* Unpin current pin */
      rtc.setParticipantSpotlight(meetingPartSpotlight, false);
    }
    /* Pin new pin-ee */
    meetingPartSpotlight = uuid;
    rtc.setParticipantSpotlight(meetingPartSpotlight, true); 
  } else {
    /* Unpin */
    rtc.setParticipantSpotlight(meetingPartSpotlight, false);
    meetingPartSpotlight = '';
  }
  //mychart_session_tunnel.send_command({command:'pin_part', 'uuid':uuid}); 
}


function updateRosterList(roster) {
  console.log("---- Update Roster List called");
  for (var i = 0; i < roster.length; i++) {
    var p_name = roster[i]['display_name'];
    var p_uuid = roster[i]['uuid'];
    console.log(p_name + ' service_type = ' + roster[i]['service_type']);
    if (roster[i]['service_type'] == 'connecting') {
      dialingToRoster(p_name, p_uuid, roster[i]['service_type']);
    }
    else {
      addToRoster(p_name, p_uuid, roster[i]['service_type']);
    }
  }
}


/* ~~~ SETUP AND TEARDOWN ~~~ */

function cleanup(event) {
    tunnel("DEBUG cleanup",null);
    meeting_tunnel("DEBUG cleanup",null);
    $("#main_body").addClass('black_background');
    $("#disconnecting").removeClass("hidden");
    tunnel_ws = null;
    if (video) {
       video.pause();
       video.src = "";
    }
    if (presentation) {
      hidePresentationStreamWindow();
    } 
    rtc = null;
    mutePatientUI();
    mustAddPart = true;
    participants = [];
    hosts = [];
    if(!$('#error_message').hasClass('hidden')) {
      $('#error_message').addClass('hidden');
    }
    // end streaming for personal video 
    stop();
    clearInterval(timer);
    if (!api_call && !invited) {
      window.location.reload(true);
    }
    else {
      if (from_observer) {
        window.close();
      }
      else if (hide_survey) {
        window.close();
      }  
      else {
        window.location = '/home/dial';
      }
    }
}

function checkForInCall() {
  if (rtc) {
    tunnel("DEBUG checkForInCall",null);
    endCall();
  }
}

function deleteVMR() {
    alias = document.getElementById("call_alias").innerHTML;
    // unit is also a host
    if (hosts.length < 3) {
      $.ajax( { 
        url: "/setting/delete_vmr_now?id=" + alias,
        dataType: "JSON",
        success: function(data){
        } 
       });
   }
}

function disconnectFromRoster() {
  /*alias = document.getElementById("call_alias").innerHTML;
  $.ajax( { 
    url: "/endpoint/get_call_list?alias=" + alias,
    dataType: "JSON",
    async: true,
    success: function(data){
      d= data
      for (var i=d.length; i >=0; --i) {
        endPart(d[i].p_uuid);
      }
    } 
   });
  */

   var dr = document.getElementById("dr_name").innerHTML.replace(/ /g, '_');
   var dr_string = document.getElementById('part_mic_' + dr);
   var this_doc_id = '';
   if (dr_string) {
     this_doc_id = dr_string.parentNode.parentNode.id;
   }

   // remove ourselves from hang up list so we don't invalidate token
   var i = for_hangup.indexOf(this_doc_id);
   if(i != -1) {
     for_hangup.splice(i, 1);
   } 

   for (i = 0; i < for_hangup.length ; i++) {
     endPart(for_hangup[i]);
     //$.ajax( { 
     //  url: "/endpoint/update_call_list?alias=" + alias + "&p_uuid=Hanging_up_" + for_hangup[i], 
     //  dataType: "JSON"
     //});
  }

   setTimeout(function () {
     rtc.disconnect();  // just disconnect us now (should be last on conference)

     //$.ajax( { 
     //  url: "/endpoint/update_call_list?alias=" + alias + "&p_uuid=Hanging_up_" + this_doc_id, 
     //  dataType: "JSON"
     //});
    }, 500); 
}

function sign_out_user() {
  if (from_observer) {
    window.close();
  }
  else if (hide_survey) {
    $.ajax({
      url:"/endpoint/sign_out_user",
      dataType: "JSON",
      complete: function(data) {
        window.close();
      }  
    });
  }
  else {
    $.ajax({
     url:"/endpoint/sign_out_user",
     dataType: "JSON",
     complete: function(data) {
       window.location.href = "../home/dial";
     } 
    });
  }
}

function endCall() {
    remove_host_by_user(); 
    endCallCalled = true;
    tunnel("DEBUG endCall",null);

    meeting_tunnel("DEBUG endCall",null);
    if ((invited || (api_call && !e_api_call)) && (rtc && rtc.role && rtc.role.toLowerCase() != 'host')) {
      if (isCisco()) {
        if (rtc) {
          shouldIHangUp(false);
         }
      }
      else { 
        console.log('only hanging up myself');
        rtc.disconnect();
        if (!e_api_call) {
          if (invited && isMeeting){ // this is to trigger call quality prompt
            singleEndCall();
          }
          else {
            sign_out_user();
          }
        }
        else {
          singleEndCall(); // this is to trigger call quality prompt
        } 
      }
    } 
    else { 
      console.log('checking to hang up myself or all');
      // change this to should I?
      if (rtc) {
        shouldIHangUp(false);
       }
    }
}

function singleEndCall() {
  tunnel("DEBUG onlyDisconnectMe",null);
  meeting_tunnel("DEBUG onlyDisconnectMe",null);
  rtc.disconnect();
  unPopulateCallInfo();
  cleanup();
}

function finalEndCall() {
  // VMR should mark as finished now!
  var end_alias = document.getElementById('call_alias').innerHTML;
  $.ajax({
    url:"/endpoint/set_end_time?alias=" + end_alias, 
    dataType: "JSON",
    success: function(data) {
    }
  });

  if (rtc) { 
    if (isCisco()) {
      //hangUpAllParticipantsThroughRest();
      disconnectFromRoster(); 
      //rtc.disconnectAll(); 
      setTimeout(function () {
        if (!api_call && !invited) {
          window.location.reload(true);
        }
        else {
          if (from_observer) {
            window.close();
          }
          else if (hide_survey) {
            window.close();
          }  
          else {
            window.location = '/home/dial';
          }
        }}, 1500); 
    }
    else {
      rtc.disconnectAll(); 
      tunnel('final_end_call',null);
      unPopulateCallInfo();
      cleanup();
    }
  }
}

function finalise(event) {
  if (!endCallCalled && !isMeeting) {
    navigator.sendBeacon("/endpoint/hang_up_participant_by_uuid?vmr_alias=" + document.getElementById('call_alias').innerHTML + "&uuid=" + rtc.uuid);
  }

  //tunnel("DEBUG Finalise called",null);
  //meeting_tunnel("DEBUG Finalise called",null);
  //if (!endCallCalled) {
    // super fast hangup is needed because the browser won't wait
    //if (rtc) {
    //  rtc.disconnect();
    //}
    // This is unlikely to trigger in time
    //if (hosts.length < 3 && !isMeeting) { // (patient is also host) hangup all
    //  navigator.sendBeacon("/endpoint/hang_up_all_participants?vmr_name=" + document.getElementById('call_alias').innerHTML);
    //}
    //else { //only hang up me
    //  if (!invited || epic_patient) {
        //sendEpicResponse(2); -- moved to websocket unsubscription
    //  }
    //}
  //}

  // This probably won't fire in time
  if (isMeeting) {
    notifyMeetingParticipantExit();
  }
  return false;
}

function hangUp() {
  tunnel("DEBUG hangup",null);
  meeting_tunnel("DEBUG hangup",null);
  endCall();
}

function resetScreen() {
  var main_p = document.getElementById("main_participant");
  main_p.innerHTML = 'init';
  need_endpoint = true;
  var login = document.getElementById('login_widget_surround');
  if (login) { 
    document.getElementById('block_screen').classList.remove('hidden');
    fadeIn(login,'block');
  }
  $('#disconnecting').addClass("hidden");
  setTimeout(function () {$("#main_body").removeClass('black_background');}, 200);
  checkLogin();
}

function remoteDisconnect(reason) {
  meeting_tunnel("DEBUG remoteDisconnect reason: " + reason,null);
  tunnel("DEBUG remoteDisconnect reason: " + reason,null);
  //sendEpicResponse(2) has been moved to websocket unsubscription

  if (reason.includes("another participant")) { // This is not a pexip error
    if (invited || isMeeting) {
      proAlert('Call Ended', 'info', 'This call has ended', 'OK', 'call_disconnected', false);
      console.log('remote disconnect: ' + reason + ' ' + call_token);
    }
    else { 
      console.log('remote disconnect: ' + reason + ' ' + call_token);
      tunnel("DEBUG remoteDisconnect",null);
      
      if (rtc) {
        endCall();
      }
    }
  }
  else {
    proAlert('Call Ended', 'info', 'This call has ended', 'OK', 'call_disconnected', false);
    console.log('remote disconnect: ' + reason + ' ' + call_token);
  }
}

function pexipHandleError(reason) {

    console.log("HandleError " + call_token);
    console.log(reason);
    tunnel("DEBUG Pexip error reason: " + reason);
    // THIS USED TO BE SET TO 30000!!
    if ((selfvideo) && (video && !selfvideo.src && new Date() - startTime > 50000)) {
        reason = reason + ". WebSocket connection error.";
    }
    proAlert("Error", "warning", reason, "OK", "pexip_handle_error", false);

}

/**
 * INC-7: Handlers to indicate self-view video stream muting
 */
function onMute() {
  console.log('Microphone muted!');
}

function onUnmute() {
  console.log('Microphone unmuted!');
}

function reattachSelfVideos() {
  selfvideo = document.getElementById('selfvideo');
  if (is_mobile() || is_safari) { 
    if (typeof(selfvideo) !== "undefined") {
      selfvideo.srcObject = rtc.call.localStream; 
      document.getElementById('selfvideo').srcObject.getAudioTracks()[0].addEventListener('mute', onMute);
      document.getElementById('selfvideo').srcObject.getAudioTracks()[0].addEventListener('unmute', onUnmute);   
    }
    if (localVideoStream !== null) {
      localVideoStream.srcObject = rtc.call.localStream;
    }
  }
  if (is_safari && !is_mobile()) {
    $('#move_self_view').addClass('hidden');
    $('#move_snapshot').addClass('hidden');
    $('#screenshot_button').addClass('hidden');
    $('.self_video_div').addClass('is_on_safari');
  } 
}

/**
 * BEGIN INC-86: Log User media devices at the Syslog
 */
function getOptions(elementId){
  var option = document.getElementById(elementId);
  var txt = "";
  for (var i = 0; i < option.length; i++) {
    txt = txt + "\'" + option.options[i].text + "\'";
    if (i < option.length - 1) {
      txt = txt + ", ";
    }
  }
  return txt;
}
function logCameras() {
  username = (document.getElementById('username') || document.getElementById('top_dr_name')).innerHTML;
  vmr = document.getElementById('call_alias').innerHTML;
  s_camera_text = $( "#videoSource option:selected" ).text();
  num_cameras = document.getElementById('videoSource').length;
  s_mic_text = $( "#audioSource option:selected" ).text();
  num_mics = document.getElementById('audioSource').length;
  log_message = 'User ['+username+'] joining VMR ['+vmr+']: Camera [\''+s_camera_text+'\'] chosen from '+ num_cameras +' option(s) ['+getOptions("videoSource")+'].  Mic [\''+s_mic_text+'\'] chosen from '+ num_mics +' option(s) ['+getOptions("audioSource")+']';
  // send AJAX call to log message
  $.ajax({
    url:"/api/log_to_syslog",
    method: "POST",
    data: {log_message:log_message},
    dataType: "JSON"
  });
}
/**
 * END INC-86: Log USer media devices at the Syslog
 */

function doneSetup(url, pin_status, conference_extension) {
  reattachSelfVideos();

  // INC-86: Log user media devices to syslog
  try {
    logCameras();
  } catch(err) {
    console.log("Error logging user media devices to syslog: " + err);
  }

  console.log("PIN status:    " + pin_status);
  console.log("IVR status:    " + conference_extension);
  // have to call this when rtc is established
  //console.log("Pexip version: " + rtc.version.version_id);
  //if (document.getElementById('function_bar_topper')) {
  //  if (isCisco() && (parseInt(rtc.version.version_id) || 0) < 22) {
  //    console.log('Hiding joystick for Standards Based endpoint as Pexip version < 22 or cannot be determined');
  //    function_bar_topper.classList.add("hidden");
  //  }
  // }
  camera_switching_in_progress = false;
  // Enable camera switch button

  // PIN connect call
  rtc.connect(rtc.pin);
}

function submitSelectRole() {
    var id_guest = document.getElementById('id_guest');
    selectrole.classList.add("hidden");
    if (id_guest.checked) {
        maincontent.classList.remove("hidden");
        rtc.connect('');
    } else {
        pinentry.classList.remove("hidden");
    }
}

function submitPinEntry() {
    var id_pin = document.getElementById('id_pin');
    pinentry.classList.add("hidden");
    maincontent.classList.remove("hidden");
    pin = id_pin.value;
    console.log("PIN is now " + pin);
    rtc.connect(pin);
}

function submitIVREntry() {
    var id_room = document.getElementById('id_room');
    ivrentry.classList.add("hidden");
    room = id_room.value;
    console.log("Target room is now " + room);
    rtc.connect(null, room);
}

function populateCallInfo() {
  var sip_add = document.getElementById('search_box_view');
  var lock_vmr_toggle = document.getElementById('lock_vmr_toggle');
  
  var room = document.getElementById('room_time');
  var arrow = document.getElementById('participant_bar_icon');
  //var joystick = document.getElementById('control_partial');
  close_c_sidebar()

	
  if (sip_add && !isMeeting) {
    run_timer = 1;
    timer = setInterval(function(){step();}, 1000);

    var favorite_toggle = document.getElementById('favorite_toggle');
    var endpoint_id =  document.getElementById('endpoint_id').innerHTML;
    var user_id = document.getElementById('current_user_id').innerHTML;

    $.ajax( { 
      url: "/home/already_a_favorite?user_id=" + user_id + "&endpoint_id=" + endpoint_id,
      dataType: "JSON",
      success: function(data){
        if (data.status == true) {
          $('#favorite_inactive').addClass('hidden'); 
          $('#favorite_active').removeClass('hidden');
          $('#toggle_favorite_button').attr("aria-pressed","true");
        }
      } 
    });

    fadeIn(sip_add);
    //fadeIn(joystick);

    if (room) {
      fadeIn(room, 'flex');
      if (favorite_toggle) {
        if (!api_call || mobile_api_call) {
          fadeIn(favorite_toggle, 'flex');
        }
      }
    }
    var should_lock_vmrs = false;
    var client_lock_vmrs = document.getElementById('lock_vmrs');
    if (client_lock_vmrs && client_lock_vmrs.innerHTML == 'true'){
      should_lock_vmrs = true;
    }
    if (lock_vmr_toggle && !isMeeting && !from_observer && should_lock_vmrs){
      fadeIn(lock_vmr_toggle, 'flex');
    }
  }
}

function unPopulateCallInfo() {
  run_timer = 0;
  var sip_add = document.getElementById('search_box_view');
  var room = document.getElementById('room_time');
  var arrow = document.getElementById('participant_bar_icon');

  if (sip_add) {
    fadeOut(sip_add);

    if (room) {
      fadeOut(room);
    }
  }
}


function step() {
  //console.log('running step()');
  if (document.getElementById('r_name')) {
    if (document.getElementById('room_name')) {
      var room_name = "Room: " + document.getElementById('room_name').innerHTML;
    }
    else {
      var room_name = 'room';
    }
     
    ++seconds;
    var secs = seconds;
    var hrs = Math.floor( secs / 3600 );
    secs %= 3600;
    var mns = Math.floor( secs / 60 );
    secs %= 60;
    var pretty = ( hrs < 10 ? "0" : "" ) + hrs
               + ":" + ( mns < 10 ? "0" : "" ) + mns
               + ":" + ( secs < 10 ? "0" : "" ) + secs;
    document.getElementById('r_name').innerHTML = room_name + ' - ' + pretty;
  }
}

function pexipConnected(url) {  // A MediaStream or URL (depending on the browser version) of the remote media stream that can be applied to a <video> element. May be null if roster-only or screensharing-only.
  /** INC-35: 'navigator.mediaDevices.enumerateDevices()' on iOS does not correctly detect 
  *  mobile video and audio inputs prior to calling 'getUserMedia()' to ask for user permission.
  *  Most devices do this successfully in _media.html.haml, but iOS returns null (or 'Camera 0'),
  *  so we need to re-evaluate the mediaDevices at this point following user permission grant.
  */ 
  if (is_safari && is_first_load) {
    initiate_media_inputs_ios()
  }
  /** END INC-35 */
 
  // check for multiple active calls 
  var obj = new Object;
  obj = {endpoint_id: endpoint_id};
  var current_user_id = document.getElementById("current_user_id").innerHTML;
  send_command_by_user_id(current_user_id, 'checkForMultiCall', obj);

  reattachSelfVideos();
  if (api_call) {
    loadParticipants();
    loadSliders(endpoint_id);
    //loadSideButtons(endpoint_id);
    checkPrivacy();
    console.log('loadSideButtons');
  }
  if (!is_iphone_mobile()){
    //start(true);   
  }
  console.log("CONNECTED NOW!" + call_token); 
  tunnel("DEBUG connected + mustAddPart = " + mustAddPart,null);
  alert_called(endpoint_id);  // adding start_time to vmr in this call
  if (source == 'screen') {
      video.poster = "img/screenshare.png";
  } else {
      tunnel("DEBUG assigning video source " + url ,null);
      videoURL = url;
      if (video) {
          console.log('assigning video to html element ' + call_token);
          console.log('assigning video to html url ' + url);
          console.log('video ready state is: ' + video.readyState);

          // will this work for old pexip?  Used to only do this if statement for safari and for all others video.src = videoURL
      
          if ((isAndroid()) || (getChromeVersion() < 65) || (getSafariVersion() < 603) || (getFirefoxVersion() < 59) || (getEdgeVersion() < 1000000)) {
            if (isAndroid()) {
              video.srcObject = videoURL;
            }
            else {
              video.src = videoURL;  // old way for eCareManager
            }
          } 
          else {
            if (video.mozSrcObject !== undefined) { // FF18a
              video.mozSrcObject = videoURL;
            } else if (video.srcObject !== undefined) {
              video.srcObject = videoURL;
            } else { // FF16a, 17a
              video.src = window.URL.createObjectURL(videoURL);
            }
          }
          if (!is_mobile()) {
            //reattach speakers
            console.log('reattach speakers');
            updateSpeaker(localVideoStream);
          }
      }
  }

  /** 
   * INC-561: Audio is low on iOS 15-15.x
   */
   adjust_gain = document.getElementById("inc_561_enabled") === null ? '' : document.getElementById("inc_561_enabled").innerHTML;
  if (parseInt(adjust_gain) == 1) {
    adjustGain();
  }
  /** END INC-561 */

  if (announce != 'true') {
    setMute(); // this calls muteAudioButtons
    rtc.muteVideo(true);
    muteVideoButtons(true);
    tunnel("mute_patient",null);
  }
  if (silence) {  // mute sound and video but do not set patient on hold
    setMute(); // this calls muteAudioButtons
    rtc.muteVideo(true);
    muteVideoButtons(true);
  }

  // INC-361 check in-patient only for Epic (encyprted) APIs if we want "silence" feature.  Not including with silence variable above because that triggers Meeting logic also
  /* requested to remove this feature
   var epic_muted = document.getElementById('epic_muted');
   if (e_api_call && !isMeeting && !mobile_api_call && epic_muted && epic_muted.innerHTML == 'yes') {
     //default as mute - not POH
     setMute(); // this calls muteAudioButtons
     rtc.muteVideo(true);
     muteVideoButtons(true);
   }
  */ 

  sendMuteUpdate();
  loadBookmarks();
  fadeDial();
  populateCallInfo();
  if (is_mobile()) {
    $('#mobile_buttons_div').removeClass('hidden');
    $('#self_view_widget').removeClass('hidden'); 
    $('#poh_button_mobile').removeClass('hidden');
  } else {
    $('#poh_button').removeClass('hidden');
    setTimeout(function(){ $('#start_exam').removeClass('hidden'); }, 4000);
  }

  if (rtc.current_service_type == 'conference') {  // doesn't carry over for waiting room guests
    $('#self_video').removeClass('hidden');
    $('#self_mute').removeClass('hidden');
  }
  $('#self_view_button').removeClass('hidden');
  $('#joystick_button').removeClass('hidden');
  $('#end_call_button').removeClass('hidden');
}




function is_iphone_mobile(){
  if ($('#iphone_mobile_view').text() == 'true') {
      return true;
  }
  else {
     return false;
  }
}

function is_mobile(){
  if ($('#mobile_view').text() == 'true') {
      return true;
  }
  else {
     return false;
  }
}

function initialise(confnode, conf, userbw, username, userpin, req_source, flash_obj, g_vmr, g_endpoint_id, endpoint_name, g_announce) {
    var dialScreen = document.getElementById('dialing');
    fadeIn(dialScreen);

    call_token = document.getElementById('call_token').innerHTML;
    vmr = g_vmr;
    endpoint_id = g_endpoint_id; 
    announce = g_announce;
    video = document.getElementById("video");
    id_selfview = document.getElementById('id_selfview');
    id_muteaudio = document.getElementById('id_muteaudio');
    id_mutevideo = document.getElementById('id_mutevideo');
    id_fullscreen = document.getElementById('id_fullscreen');
    id_screenshare = document.getElementById('id_screenshare');
    id_presentation = document.getElementById('id_presentation');
    presVideo = document.getElementById('presVideo');
    //document.getElementById("video_details").innerHTML = ''; 

    flash = flash_obj;
    if (flash) {
        id_selfview.textContent = trans['BUTTON_HIDESELF'];
        id_selfview.classList.add('selected');
        videoPresentation = false;
    }
    console.log("Video: " + video + " " + call_token);
    console.log("Bandwidth: " + userbw + " " + call_token);

    pin = userpin;

    // mobile bandwidth overridden by customer attribute system-wide
    // default 1280 
    bandwidth = parseInt(userbw) || 1280;
    /*
    if (is_mobile()) {
      var custom_bandwidth = document.getElementById('custom_bandwidth');
      if (custom_bandwidth) {
        bandwidth = (custom_bandwidth.innerHTML || 1280);
      }
    }
    */

    //name = decodeURIComponent(username).replace('+', ' ');
    source = req_source;

   
    rtc = new PexRTC();
    rtc.allow_1080p = false;
    rtc.pin = userpin;

    if (typeof(DO_NOT_USE_QOS) === 'undefined') {
      rtc.pcConstraints = { optional: [{ googDscp: true }] };
    } else {
      rtc.pcConstraints = {};
    }

    window.addEventListener('beforeunload', finalise);

    if (isMeeting) {
      // set custom bandwidth
      var custom_bandwidth = document.getElementById('custom_bandwidth');
      if (custom_bandwidth) {
        rtc.custom_bandwidth = custom_bandwidth.innerHTML;
      }

      rtc.onSetup = doneSetup;
      rtc.onConnect = meetingConnected;
      rtc.onError = handleMeetingError;
      rtc.onDisconnect = remoteDisconnect;
      rtc.onHoldResume = holdresume;
      rtc.onRosterList = updateRosterList;
      rtc.onParticipantCreate = setMeetingParticipant;
      rtc.onParticipantDelete = removeFromMeetingRoster;
      rtc.onParticipantUpdate = updateMeetingRoster;
    }
    else {
      // iConsult: set custom bandwidth for mobile only
      if (is_mobile()) {
        var custom_bandwidth = document.getElementById('custom_bandwidth');
        if (custom_bandwidth) {
          rtc.custom_bandwidth = custom_bandwidth.innerHTML;
        }
      }

      rtc.onSetup = doneSetup;
      rtc.onConnect = pexipConnected;
      rtc.onError = pexipHandleError;
      rtc.onDisconnect = remoteDisconnect;
      rtc.onHoldResume = holdresume;
      rtc.onRosterList = updateRosterList;
      rtc.onParticipantCreate = setParticipant;
      rtc.onParticipantDelete = removeFromRoster;
      rtc.onParticipantUpdate = updateRoster;
      rtc.onConferenceUpdate = pexipConferenceUpdate;
      //rtc.transformLayout({streaming: {indicators_enabled: false}});
    }
    rtc.onPresentation = presentationStartStop;
    rtc.onPresentationReload = loadPresentation;
    rtc.onScreenshareStopped = unpresentScreen; 
    rtc.onScreenshareConnected = loadPresenterStream;
    rtc.onPresentationConnected = loadPresentationStream;
    rtc.onPresentationDisconnected = remotePresentationClosed;
    rtc.onChatMessage = recievedChatMessage;


    // TODO: Change everywhere so an ajax call gives you all the information instead of getting it from HTML values
    // - Speed up time by having patient call in before call joined?  Set a timeout instead to handle error
    //
 
    conference = conf;
    console.log("Conference: " + conference + " " + call_token);

    startTime = new Date();
    if (invited) {
      name = 'Guest: ' + document.getElementById("dr_name").innerHTML;
    }
    else {
      name = document.getElementById("dr_name").innerHTML;
    }
    console.log("MAKING CALL NOW!  Username: " + name + " " + call_token);
    tunnel("DEBUG making call now",null);
    //loadDefaults = true;
    //var deferred = start(true);
    //$.when(deferred).done(function() {

    // save current user name
    current_user_name = name;

    rtc.makeCall(confnode, conference, name, bandwidth, source, flash);
    //});
}

function initScreenValues() {
  // ICR will be off
  initICR();
  // Speaker and Mic Values will be set
 
  if ($('#flat-slider-vertical-5').exists() && $('#default_output').exists()) {
    $('#flat-slider-vertical-5').slider("option", "value",parseInt(document.getElementById("default_output").innerHTML) );
    $('#flat-slider-vertical-6').slider("option", "value",parseInt(document.getElementById("default_input").innerHTML) );
    $('#flat-slider-vertical-7').slider("option", "value",parseInt(document.getElementById("default_bell").innerHTML) );
    setSpeaker(parseInt(document.getElementById("default_output").innerHTML), false, false);
    setMicrophone(parseInt(document.getElementById("default_input").innerHTML), false, false);
  }
}

function makeCall(gg_call_alias, gg_endpoint_id, gg_room_info, g_announce, g_machine_name, g_invited) {
        
  invited = g_invited;
  if (g_invited == 'true') {
    invited = true;
  }

  initScreenValues();
  var login = document.getElementById("login_widget_surround");
  if (login) {
    fadeOut(login);
  }
  var block = document.getElementById("block_screen");
  if (block) {
    block.classList.add('hidden')
  }
  var dialing = document.getElementById("dialing");
  if (dialing) {
    fadeIn(dialing);
  }
  if(!$('#settings_sidebar').hasClass('hidden')) {
  //  $('#settings_sidebar').addClass('hidden');
  }
  //document.getElementById("dialing_sound").play();
  var conf_partial = document.getElementById("conf_partial");
  fadeIn(conf_partial);
  
  is_endpoint_offline(gg_endpoint_id); 
}

function mutePatientUI() {
  var m_button = document.getElementById('mute_patient_button')
  var m_detail = document.getElementById('hold_detail')
  if (m_button) {
    m_button.innerHTML = 'Place Patient on Hold';
    m_detail.innerHTML = 'Turn off patient audio and video'; 
    $('#poh').removeClass('on_hold');
    $('#poh_button').attr("aria-pressed","false");
    $('#poh_button_mobile').removeClass('on_hold');
  }
  var em = document.getElementById('s_message');
  var em_div = document.getElementById('status_message');
  if (em) {
    em.innerHTML = '';
    em_div.classList.add('hidden');
  }
  var poh = document.getElementById('poh_icon'); 
  poh.classList.add('hidden');
}

function create_api_tunnel() {
    console.log('api call - creating api tunnel for: ' + this_internal_id.toLowerCase() + ' '  + call_token);
    var api_tunnel = cable.subscriptions.create({
       channel: "ApiChannel", 
       internal_id: this_internal_id.toLowerCase()
       }, {
      connected: function() {
        console.log("connected to the api tunnel");
      },
      disconnected: function() {
        console.log("disconnected from the api tunnel");
      },
      received: function(data) {
        console.log("response received from api tunnel: " + JSON.stringify(data));
        if (data) {
          switch (data['command']) {
           case "end_call":
              console.log("end local call"); 
              endCall();
              break;
            default: 
              console.log("Unknown response: " + data);
          }
        }
      }});
}
function isEndpointInCall(g_machine_name) {

  if (api_call) {
    create_api_tunnel();
  }

  tunnel_ws = cable.subscriptions.create({
      channel: "TunnelChannel",
      machine_name: g_machine_name 
    }, {
      connected: function() {
        console.log("connected to the tunnel manager -- calling" + " "  + call_token);
        var c_user_id = document.getElementById("current_user_id").innerHTML;
        tunnel('is_in_call', {user_id: c_user_id});
      },
      disconnected: function() {
        console.log("disconnected from the tunnel manager");
      },
      received: function(data) {
        console.log("response received from the in view endpoint: " + JSON.stringify(data));
        if (data) {
          var datas = data.split(':');
          var command = datas[0];
          var reply = datas[1]; 
          console.log("response command: " + command);
          switch (command) {
          case "speaker_microphone_update":
            if (reply.indexOf('|') !== -1) {
              var attribute = reply.split('|')[0];
              var value = reply.split('|')[1]; 
              console.log('Received endpoint audio adjustment for ' + attribute + ' to move to ' + value);
              if (attribute == 'microphone'){
                $('#flat-slider-vertical-6').slider('value',value*2);
              }
              if (attribute == 'speaker'){
                $('#flat-slider-vertical-5').slider('value',value*2);
              }
            }
            break;
          case "inCall":
            if (reply.indexOf('|') !== -1) {
              var this_response = reply.split('|')[0];
              var this_user_id = reply.split('|')[1]; 
              var obj = new Object;
              obj = {response: this_response};
              send_command_by_user_id(this_user_id, 'inCall', obj);
            }
            else { // support older versions
             if (!webInCall()) {
               if (reply == 'ok') {
                 processCall(false); 
               } 
               else {
                 if (invited || no_prompt) {
                   processCall(true);
                 } 
                 else {
                  /** Room is in a call, either locked or busy */
                  endpoint_id = document.getElementById("endpoint_id").innerHTML
                  alertLockedOrBusy(endpoint_id);
                 }
               }
             }
           }
          break;
          case "mediaFail":
            console.log('got mediaFail in view');
            if (reply.indexOf('|') !== -1) {
              console.log('got mediaFail in view splitting');
              var this_response = reply.split('|')[0];
              var this_user_id = reply.split('|')[1]; 
              var obj = new Object;
              obj = {response: this_response};
              console.log('got mediaFail in view splitting user: ' + this_user_id);
              send_command_by_user_id(this_user_id, 'mediaFail', obj);
            }
          break;
          case "mutedPatient":
            var m_button = document.getElementById('mute_patient_button')
            var m_detail = document.getElementById('hold_detail')
            if (m_button) {
              m_button.innerHTML = 'Remove Patient Hold';
              m_detail.innerHTML = 'Turn on patient audio and video';
              $('#poh').addClass('on_hold');
              $('#poh_button').attr("aria-pressed","true");
              $('#poh_button_mobile').addClass('on_hold');
            }
            var em = document.getElementById('s_message');
            var em_div = document.getElementById('status_message');
            em.innerHTML = 'Patient on Hold';
            em_div.classList.remove('hidden');
            var poh = document.getElementById('poh_icon');
            poh.classList.remove('hidden');
            break;
          case "unmutedPatient":
            mutePatientUI();
            break;
          case "getwellUp":
            var getwell_warning_icon = document.getElementById('getwell_warning')
            getwell_warning_icon.classList.add('hidden');
            break;
          case "getwellDown":
            var getwell_warning_icon = document.getElementById('getwell_warning')
            getwell_warning_icon.classList.remove('hidden');
            break;
          case "eisUp":
            var getwell_warning_icon = document.getElementById('getwell_warning');
            getwell_warning_icon.classList.add('hidden');
            break;
          case "eisDown":
            var getwell_warning_icon = document.getElementById('getwell_warning');
            getwell_warning_icon.classList.remove('hidden');
            break;
          case "tigrPxStarting":
            var getwell_warning_icon = document.getElementById('getwell_warning');
            getwell_warning_icon.classList.remove('hidden');
            break;
          case "tigrPxAvailable":
            var getwell_warning_icon = document.getElementById('getwell_warning');
            getwell_warning_icon.classList.add('hidden');
            break;
          default: 
            console.log("Unknown response: " + data);
        }
      }
    },
    send_command: function(command) {
      console.log("sending command " + JSON.stringify(command) + " " + call_token);
      return this.perform('send_command', {
        command: command
      });
    }
  });

}

function isFromApi() {
  if (document.getElementById("from_api").innerHTML == 'true' ) {
    return true;
  }
  else {
    return false;
  }
}
  in_call = true;
function processCall(join) {
  var chrome = getChromeVersion();
  if (chrome >= 72 && chrome < 100) { //temp fix
    var settings_link = document.getElementById('header_settings_link');
    if (settings_link){
      settings_link.classList.add('hidden'); 
    }
  }
  swal.close();
  var g_announce = checkPrivacy();

  var confnode = document.getElementById("conf_node").innerHTML;
  var username = document.getElementById("dr_name").innerHTML;
  var g_endpoint_id = document.getElementById("endpoint_id").innerHTML;
  var endpoint_name = document.getElementById("room_name").innerHTML;
  var c_user_id = document.getElementById("current_user_id").innerHTML;
  var conf = document.getElementById("call_alias").innerHTML;
  var call_token = document.getElementById('call_token').innerHTML;

  if (join) {
    console.log(" join call token is: " + call_token);
    var this_vmr_pin;
    $.ajax({
      url:"/endpoint/get_alias?endpoint_id=" + g_endpoint_id + "&c_uid=" + c_user_id + "&call_token="+call_token , 
      dataType: "JSON",
      success: function(data) {
        if (data.alias) {
          console.log('Assigning alias...' + data.alias + " " + call_token);
          document.getElementById("call_alias").innerHTML = data.alias;
          console.log('Joining call now...' + " " + call_token);
          mustAddPart = false;
          if (data.change_add == 'true') {
            mustAddPart = true;
          }
          if (invited) {
            this_vmr_pin = data.guest_pin == 0 ? null : data.guest_pin;
          }
          else {
            this_vmr_pin = data.host_pin == 0 ? null : data.host_pin;
          } 
          initialise(confnode, data.alias, null, username, this_vmr_pin, null, null, data.alias, g_endpoint_id, endpoint_name, g_announce); 
        }
        else {
          console.log('ERROR: something went wrong joining call' + ' ' + call_token); 
            setTimeout( function () {  swal({ title: "Error", text: "The call has either ended or you are trying to call into a conference you are already a participant in", type: "error", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false}, function(){location.reload();}); }, 1000);
        }
      } 
    });
  }
  else {
    var call_token = document.getElementById('call_token').innerHTML;
    console.log(" get_vmr call token is: " + call_token);
    $.ajax({
      url:"/endpoint/get_vmr?endpoint_id=" + g_endpoint_id + "&call_token=" + call_token + "&c_uid=" + c_user_id, 
      dataType: "JSON",
      success: function(data) {
        if (data.alias) {
          document.getElementById("call_alias").innerHTML = data.alias;
          mustAddPart = true;
          if (invited) {
            this_vmr_pin = data.guest_pin == 0 ? null : data.guest_pin;
          }
          else {
            this_vmr_pin = data.host_pin == 0 ? null : data.host_pin;
          } 
          initialise(confnode, data.alias, null, username, this_vmr_pin, null, null, data.alias, g_endpoint_id, endpoint_name, g_announce);
        }
        else {
          console.log('ERROR: something went wrong joining call'); 
          setTimeout( function () {  proAlert("Error", "error", "Please try again", "OK", "reload", false);}, 1000);

        }
       }
      });
  }
}

function checkPrivacy(){
  var g_announce;
  if (isFromApi() || invited ) {
    g_announce = document.getElementById("g_announce").innerHTML;
  }
  else {
    if (document.getElementById("privacy_select")) {
      if (document.getElementById("privacy_select").checked) {
        g_announce = 'false';
      }
      else {
        g_announce = 'true';
      }
    }
  }

  /*if (g_announce == 'false') {
    setSideButtonsPrivacy(true);
  }
  else{
    setSideButtonsPrivacy(false);
  }*/
  return g_announce;

}

function muteVideoButtons(muted){

  if (muted){
    $("#self_video").addClass('private');
    $("#vid_unmute_image").removeClass('hidden');
    $("#vid_mute_image").addClass('hidden');
    $("#vid_action").addClass('deactivated');
    $('#self_video').attr("aria-pressed", "true");
  }
  else {
    $("#self_video").removeClass('private');
    $("#vid_mute_image").removeClass('hidden');
    $("#vid_unmute_image").addClass('hidden');
    $("#vid_action").removeClass('deactivated');
    $('#self_video').attr("aria-pressed", "false");
  }

}
function muteAudioButtons(muted){
  if (muted) {
    $("#mic_action").addClass('deactivated');
    $("#mic_ummute_image").removeClass('hidden');
    $("#mic_mute_image").addClass('hidden');
    $("#self_mute").addClass('muted');
    $('#self_mute').attr("aria-pressed", "true");
    
    // Prevents Mic Mute notification on POH join 
    if (announce == 'false') {
      if (($('#mic_first_joined').html() == 'true')){ 
        $('#mic_first_joined').html('false');
      } else {
        show_in_call_notification("Microphone Muted");
      }
    }
    else {
      show_in_call_notification("Microphone Muted");
    }
  }
  else{
    $("#mic_action").removeClass('deactivated');
    $("#mic_mute_image").removeClass('hidden');
    $("#mic_ummute_image").addClass('hidden');
    $("#self_mute").removeClass('muted');
    $('#self_mute').attr("aria-pressed", "false");
    show_in_call_notification("Microphone Unmuted")
  }
}

function setSideButtonsPrivacy(muted) {
  muteVideoButtons(muted);
  muteAudioButtons(muted);
}

function checkMuteWithPexip(){
  // we don't want to toggle, just ensure buttons are displaying correctly
  if (rtc){
      muteVideoButtons(rtc.mutedVideo);
      muteAudioButtons(rtc.mutedAudio);
  }
}
function sendMuteUpdate(){
  console.log('sending mute update check..');
  if (rtc) {
    console.log('sending mute update (have rtc)');
    tunnel('participant_update', {muted: rtc.mutedVideo, p_uuid: rtc.uuid});
  }
}

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}


function checkForEpicResend(){
  console.log('checking for mychart Epic Resend... websocket disconnect is ' + websocket_disconnect);
  if (websocket_disconnect && rtc && rtc.call && rtc.call.state == "CONNECTED") { // this will prevent sending connected on first websocket setup - make sure rtc is connected
    sendEpicResponse(1);
    websocket_disconnect = false; // reset
  }
  else {
    if (timer_flag) {
      timer_flag = false; // only do this second check once per connection with no disconnect
      console.log('setting backup mychart Epic resend check..');
      setTimeout(function(){checkForEpicResend();}, 5000); // check again in case of connect before disconnect registers
    }
  }
}

function sendEpicResponse(connected){ // 1 = connected, 2 = disconnected 

  var continue_send = true;

  if (connected == 1) {
    if (epic_joined) {
      continue_send = false;
    }
    else {
      epic_joined = true;
    }
  }
  
  if (connected == 2) {
    if (epic_left) {
      continue_send = false;
    }
    else {
      epic_left = true;
    }
  }

  if (continue_send) {
    if (document.getElementById('call_alias') && document.getElementById("ext_user_id") &&  document.getElementById("usertype") &&  document.getElementById("client_id") && document.getElementById("cid")) {
      var c_alias = document.getElementById('call_alias').innerHTML;
      var ext_user_id = document.getElementById("ext_user_id").innerHTML;
      var usertype = document.getElementById("usertype").innerHTML;
      var client_id = document.getElementById("client_id").innerHTML;
      var cid = document.getElementById("cid").innerHTML;
      var uhe_c_id = document.getElementById("current_user_id").innerHTML;
      console.log('mychart sendEpicResponse for usertype: ' + usertype + ' connectionStatus = ' + connected);
      $.ajax({
        url:"/api/send_epic_status",
        method: "POST",
        data: {cid: cid, vmr_alias: c_alias, client_id: client_id, ext_user_id: ext_user_id, connectstatus: connected, usertype: usertype, uhe_c_id: uhe_c_id},
        dataType: "JSON",
        success: function(data) {
        },
        error: function(data) {
        }
      });
    }
    else {
      console.log('mychart sendEpicResponse missing data');
    }
  }
  else {
    console.log('skipping mychart sendEpicResponse ' + connected + ' - ignoring duplicate send ');
  }
}

function initiate_media_inputs_ios() {
  // reset defunct camera options and videoHash
  camera.options.length = 0;
  audioInputSelect.options.length = 0;
  videoHash = {};
  audioHash = {};

  navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    devices.forEach(function(device) {
      console.log("Found device: " + device.kind + ": " + device.label + " id = " + device.deviceId);

      if (device.kind === 'videoinput') {
        if (camera) {
          console.log('Found video device - ' + device.label);
          camera.appendChild(deviceOption(device, `camera ${camera.length}`, videoHash));
        }
      } else if (device.kind === 'audioinput') {
        if (microphone) {
          microphone.appendChild(deviceOption(device, `microphone ${microphone.length}`, audioHash));
        }
      }

    });
  })
  .then(function() {
    // Set the correct inputs
    document.getElementById('d_video').innerHTML = Object.keys(videoHash)[0];
    document.getElementById('d_audio').innerHTML = Object.keys(audioHash)[0];
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
  });

  is_first_load = false;
}

// meeting callBack functions
function meetingConnected(url) {

  /** INC-35: 'navigator.mediaDevices.enumerateDevices()' on iOS does not correctly detect 
   *  mobile video and audio inputs prior to calling 'getUserMedia()' to ask for user permission.
   *  Most devices do this successfully in _media.html.haml, but iOS returns null (or 'Camera 0'),
   *  so we need to re-evaluate the mediaDevices at this point following user permission grant.
   */ 
  if (is_safari && is_first_load) {
    initiate_media_inputs_ios()
  }

  selfvideo = document.getElementById('selfvideo');
  if (!is_mobile()) {
    // reattachSelfVideos is called previously, in doneSetup()
    reattachSelfVideos();
  }
  if (api_call) {
    loadParticipants();
  }
  if (!invited || epic_patient) {
    sendEpicResponse(1);
  }

  // Notify other participants so that they can conditionally start their stopwatches
  notifyMeetingParticipantEnter();

  console.log("CONNECTED NOW! " + call_token); 
  meeting_tunnel("DEBUG Pexip connected (onConnect).  Patient:  " + epic_patient);
  meeting_started();  // adding start_time to vmr in this call

  var room = document.getElementById('room_time');

  if (source == 'screen') {
      video.poster = "img/screenshare.png";
  } else {
      meeting_tunnel("DEBUG assigning video source " + url ,null);
      videoURL = url;
      if (video) {
          console.log('assigning video to html element ' + call_token);
          console.log('assigning video to html url ' + url);
          console.log('video ready state is: ' + video.readyState);

          if ((isAndroid()) || (getChromeVersion() < 65) || (getSafariVersion() < 603) || (getFirefoxVersion() < 59) || (getEdgeVersion() < 1000000)) {
            if (isAndroid()) {
              video.srcObject = videoURL;
            }
            else {
              video.src = videoURL;  // old way for eCareManager
            }
          } 
          else {
            if (video.mozSrcObject !== undefined) { // FF18a
              video.mozSrcObject = videoURL;
            } else if (video.srcObject !== undefined) {
              video.srcObject = videoURL;
            } else { // FF16a, 17a
              video.src = window.URL.createObjectURL(videoURL);
            }
          }

          console.log('video ready state is: ' + video.readyState);
          attachSinkId(video, outputHash[audioOutput]);
          console.log('video ready state is: ' + video.readyState);
      }
  }

  /** 
   * INC-561: Audio is low on iOS 15-15.x
   */
   adjust_gain = document.getElementById("inc_561_enabled") === null ? '' : document.getElementById("inc_561_enabled").innerHTML;
   if (parseInt(adjust_gain) == 1) {
    adjustGain();
   }
  /** END INC-561 */

  if (silence) {  // mute sound and video but do not set patient on hold
    setMute(); // this calls muteAudioButtons
    rtc.muteVideo(true);
    muteVideoButtons();
  }
  sendMuteUpdate();
  fadeDial();
  populateCallInfo();
  if (is_mobile()) {
    $('#mobile_buttons_div').removeClass('hidden');
    $('#self_view_widget').removeClass('hidden'); 
    $('#poh_button_mobile').removeClass('hidden');
  } else {
    $('#poh_button').removeClass('hidden');
  }
  $('#self_video').removeClass('hidden');
  $('#self_mute').removeClass('hidden');
  $('#self_view_button').removeClass('hidden');
  $('#joystick_button').removeClass('hidden');
  $('#end_call_button').removeClass('hidden');
}

/**
 * INC-561: Adjust the gain for certain iOS versions
 */
function adjustGain() {
  if (is_mobile() && is_safari) {
    let upper_version = 15.2;
    try {
      upper_version = parseFloat($('#inc_561_upper_version').text());
    }
    catch (ex) {
      console.log("ERROR: Could not determine upper version bound");
    }
    if (rtc.safari_ver >= 15.0 && rtc.safari_ver <= upper_version) {
      try {
        let gain_value = parseInt($('#inc_561_audio_gain').text());
        video.onloadedmetadata = function(e) {
          video.muted = true;
        };
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var gainNode = audioCtx.createGain();
        var source = audioCtx.createMediaStreamSource(videoURL);
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.setValueAtTime(gain_value, audioCtx.currentTime);
      }
      catch (ex) {
        console.log("ERROR: COULD NOT SET GAIN VALUE");
      }
    }
  }
}

function notifyMeetingParticipantEnter() {
  if (invited && !epic_patient) {
    /** I'm a non-patient 3rd party participants invited by a Clinician, just have a timer for myself */
    console.log("Starting local stopwatch");
    meeting_tunnel('guest_enter', null);
    start_stopwatch();
  } else if (epic_patient) {
    /** I'm a Patient should start my timer when a Clinician is also in the conference */
    console.log("Notifying other participants a Patient has entered the conference");
    meeting_tunnel('patient_enter', null);
  } else {
    /** I must be a Clinician / Care Provider */
    console.log("Notifying other participants a Clinician has entered the conference");
    meeting_tunnel('clinician_enter', null);
    meeting_tunnel('turn_off_poh', null);
  }
}

function notifyMeetingParticipantExit() {
  if (epic_patient) {
    console.log("Notifying other participants a Patient has exited the conference");
    meeting_tunnel('patient_exit', null);
  } else {
    console.log("Notifying other participants a non-patient has exited the conference");
    meeting_tunnel('clinician_exit', null);  // TODO: Verify this terminology and logic, case also triggers when an invited guest leaves
  }
}

// INC-72: When a Patient joins, check whether POH should be enabled
function checkPOHStatus() {
  if (epic_patient && patient_is_on_hold) {
    // POH should be enabled in the UI
    $('#video').addClass('hidden');
    $("#video").prop('muted', true)
    $('#pohcontainer').removeClass('hidden');
  }
}

function handleMeetingError(reason) {
    console.log("HandleError " + call_token);
    console.log(reason);
    meeting_tunnel("DEBUG Pexip error reason: " + reason + " Patient:  " + epic_patient);
    proAlert("Error", "warning", reason, "OK", "handle_meeting_button", false);
}

function setMeetingParticipant(participant) {
   var inv = 0;
   var ap = 0;
  
   if (invited) { inv=1; }
   if (api_call) { ap=1; }
   
   participant_objects[participant["uuid"]] = participant;

   var current_user_id = document.getElementById("current_user_id").innerHTML;
   var alias = document.getElementById("call_alias").innerHTML;
   var call_token = document.getElementById('call_token').innerHTML;
   var cid = document.getElementById('cid').innerHTML;
   var appt_time = document.getElementById('appt_time').innerHTML;
   var org_id = document.getElementById('org_id').innerHTML;
 
   // only call joined_meeting for yourself
   if (participant["uuid"] == rtc.uuid ) {
     console.log('calling joined_meeting for '+participant["uuid"]); 
     $.ajax({
       url:"/endpoint/joined_meeting?alias=" + alias + "&p_uuid=" + participant["uuid"] + "&inv=" + inv + "&call_token=" + call_token + "&p_current_user_id=" + current_user_id + "&display_name=" + participant["display_name"] + "&role=" + participant["role"] + "&cid=" + cid + "&appt_time" + appt_time + "&org_id" + org_id, 
       dataType: "JSON",
       success: function(data){
         if (data) {
           for (var i=data.length; i >=0; --i) {
             if (data[i] != 'none') {
               console.log('Deleting duplicate: ' + data[i]);
               endPart(data[i]);
             }
           }
         }
       } 
     });
    } 
  // keep full participant list
  if (!participants.includes(participant["uuid"])) {
     participants.push(participant["uuid"]);
  }
  updateMeetingRoster(participant); 
}

function updateMeetingRoster(participant) {

  if (participant['spotlight'] == "0") {
    // Participant was unpinned
    meetingPartSpotlight = '';
    $('#spotlight_'+participant["uuid"]).removeClass('selected');
  } else {
    // Participant was pinned
    // indicate other participants unpinned
    meetingPartSpotlight = participant["uuid"];
    $('[id^="spotlight_"]').removeClass('selected');
    $('#spotlight_'+participant["uuid"]).addClass('selected'); 
  }

  var p_name = participant['display_name'];
  var p_uuid = participant['uuid'];
  var alias = document.getElementById("call_alias").innerHTML;
  
  participant_objects[participant["uuid"]] = participant;

  if ( !$("." + p_uuid)[0] ) {
    if(participant["service_type"] != 'connecting') {
      addToRoster(participant["display_name"], participant["uuid"], participant["service_type"]);
      //open_participant();
    }
  }

  callConnected = true;

  // keep full participant list
  var i = participants.indexOf(p_uuid);
  if (!participants.includes(p_uuid)) {
     participants.push(p_uuid);
     addToRoster(participant["display_name"], participant["uuid"], participant["service_type"]);
  }

  if (participant['role'] == 'chair') {
    if (!hosts.includes(p_uuid)) {
       // a host has been added
       hosts.push(p_uuid);
    }
  }
}

function removeFromMeetingRoster(participant) {
  var uuid = participant["uuid"];
  var element = document.getElementById(uuid);

  if (element != null) {
    setTimeout(function(){fadeOut(element);}, 1000);
    setTimeout(function(){element.outerHTML = "";}, 1200);
    setTimeout(function(){delete element;
      //close column if no additional participants
      if (!$(".added_part")[0]){
        close_participant(); 
      }
    }, 1200);
   }
  $('#dial_phone').addClass('hidden');
  $('#add_caller_phone').removeClass('hidden');
 
  // Find and remove item from an array
  var i = parts_a.indexOf(uuid);
  if(i != -1) {
    parts_a.splice(i, 1);
  } 
  var n = participants.indexOf(uuid);
  if(n != -1) {
    participants.splice(n, 1);
  } 

  var h = hosts.indexOf(uuid);
  if(h != -1) {
    hosts.splice(h, 1);
  }
}

function send_command_by_user_id(user_id, command, params_p) {
  var obj = new Object();
  obj.user_id = user_id;
  obj.command = command;
  obj.params_p = params_p;
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"../endpoint/send_command_to_clinician_user",
     method: "POST",
     data: jsonString, 
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
       console.log('successfully sent to user ' + user_id + ' ' + command);
     }
  });
} 

function show_in_call_notification(notification) {
  var in_call_notification_widget =  $('#in_call_notifications')
  $('#in_call_notif').text(notification)
  $('#in_call_notifications').show();
  setTimeout(function() {
    $('#in_call_notifications').fadeOut();
  }, 2500 );
}

function forceKeyboardFocusOnly() {
  document.body.addEventListener('mousedown', function() {  document.body.classList.add('using-mouse'); });
  document.body.addEventListener('keydown', function() { document.body.classList.remove('using-mouse'); });
}

function enterChatText(){
  var chat_text = document.getElementById('chat_text').value;
  if (chat_text != "") {
    console.log('sending chat text ' + chat_text);
    if (rtc) {
      rtc.sendChatMessage(chat_text);
      sentChat(current_user_name, chat_text);
    }
    document.getElementById('chat_text').value = '';
    zoomOutMobile();
    var chatBox = document.getElementById("chat");
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function chatActivity(e) {
  if (e.keyCode == 13) {
    enterChatText();
  }
}

function recievedChatMessage(message) {
  console.log('recieved message ' + message);
  sentChat(message.origin, message.payload);
}

function sentChat(name, message) {
  if ($("#c_list").hasClass('hidden')) { 
    chatCount++;
    document.getElementById('chat_js_count').innerHTML = chatCount; 
    $("#chat_notification").removeClass("hidden");
    
    /***** INC 355 removed by CAB 6/9/21 *****

    $("#chat_notification").addClass("animate__bounce");
    $("#chat_js_count").addClass("on_bounce");

    setTimeout(function() {
      $("#chat_js_count").removeClass("on_bounce");
      $('#chat_notification').removeClass("animate__bounce");
    }, 1500 );

    */
  } 
  var html_string = "<li id='chatLine'><p id='chatName'>" + name + ":</p><p id='chatText'>" + message + "</p></>";
  var chatBox = document.getElementById('chat');
  chatBox.insertAdjacentHTML('beforeend', html_string);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function is_poh_on() {
  var m = document.getElementById('mute_patient_button');
  return !(m.innerHTML == 'Place Patient on Hold');
}

//function auto_poh_applicable() {
  //return rtc && !api_call && !isMeeting && !invited && window.top == window.self && !presenting; // only do this on Pexip relevent pages
  //return false;
//}

/* INC-62: Auto POH when losing tab focus **/
//window.addEventListener('blur', () => {
  //console.log("---- LOST FOCUS");
  //if (auto_poh_applicable()) {
    //if (!is_poh_on()) { // POH was not on, must change automatically
      //mutePatient(false);
      //page_title = document.title;
      //document.title = POH_TITLE + page_title;
      //on_poh_automatically = true;
      //on_poh_manually = false; 
    //} else {
      //on_poh_manually = true; // POH was on already, must have been manual
      //on_poh_automatically = false;
    //}
  //}
//});

//window.addEventListener('focus', () => {
  //console.log("---- REGAINED FOCUS");
  // if patient on hold and was held automatically, unhold
  //if (auto_poh_applicable()) {
    //if (on_poh_automatically && !on_poh_manually) {
      //mutePatient(false);
      //document.title = document.title.split(POH_TITLE)[1];
      //on_poh_automatically = false;
    //}
  //}
//})

function update_sms_dial_code(dial_code, flag_code, placeholder) {
  $("#selected_flag_code").removeClass();
  $("#selected_flag_code").addClass('flag-icon');
  $("#selected_flag_code").addClass('flag-icon-' + flag_code);
  $("#selected_dial_code").html(dial_code);
  $('#selected_dial_format').html(placeholder);
  $('#search-box').attr("width", "270px");
  $('#search-box').attr("placeholder", placeholder);
}

function admitByButton(uuid) {
  if (rtc) {
    rtc.unlockParticipant(uuid);
  }
}
