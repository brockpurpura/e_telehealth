'use strict';

var videoElement = document.getElementById('videoSettingView');
var audioInputSelect = document.querySelector('select#audioSource');
var audioOutputSelect = document.querySelector('select#audioOutput');
var videoSelect = document.querySelector('select#videoSource');
var selectors = [audioInputSelect, audioOutputSelect, videoSelect];
var loadDefaults = true;
var defaultAudio;
var defaultVideo;
var defaultOutput;
var mediaUserId;
var myOldLocalStream;

var audioSource;
var videoSource;
var audioOutput;
var g_constraints;

var audioHash = {};
var videoHash = {};
var outputHash = {};

var saveNow = false;
var holdOffFirstRun = false;


function is_this_mobile(){
  if ($('#mobile_view').text() == 'true') {
      return true;
  }
  else {
     return false;
  }
}

function gotDevices(deviceInfos) {
  
  if (loadDefaults || isMeeting) { 
    console.log('DEVICES are now mapped!');
  // Handles being called several times to update labels. Preserve values.
  var values = selectors.map(function(select) {
    return select.value;
  });
  selectors.forEach(function(select) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  // missing default for video
  var option = document.createElement('option');
  option.value = 'default';
  option.id = 'default';
  option.text = 'Default';
  option.selected = 'selected';
  videoSelect.appendChild(option);

  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.label;
    option.id = deviceInfo.deviceId;
    var temp_p = "<p class='hidden' id='" + deviceInfo.label + "'></p>"; 
    document.getElementById("all_devices").insertAdjacentHTML('afterbegin', temp_p);
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label ||
          'microphone ' + (audioInputSelect.length + 1);
      audioInputSelect.appendChild(option);
      audioHash[deviceInfo.label]= deviceInfo.deviceId;
    } else if (deviceInfo.kind === 'audiooutput') {
      option.text = deviceInfo.label || 'speaker ' +
          (audioOutputSelect.length + 1);
      audioOutputSelect.appendChild(option);
      outputHash[deviceInfo.label]= deviceInfo.deviceId;
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
      videoHash[deviceInfo.label] = deviceInfo.deviceId;
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  
  if (videoSelect.options.length == 0){
      option.text = 'No camera options';
      noCamera = true;
      videoSelect.appendChild(option);
      proAlert("No camera option!", "warning", "Your call will not have video!", "OK", "close", false);
  }
  else {
    noCamera = false;
  }

  if (audioInputSelect.options.length == 0){
      noAudio = true;
      option.text = 'No audio options';
      audioInputSelect.appendChild(option);
      proAlert("No microphone options!", "warning", "Your call will not have audio!", "OK", "close", false);
  }
  else {
    noAudio = false;
  }

  selectors.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
      return n.value === values[selectorIndex];
    })) {
      select.value = values[selectorIndex];
    }
  });
  }

  videoSelect.value = (defaultVideo || 'default');
  console.log('setting default output ' + defaultOutput);
  audioOutputSelect.value = (defaultOutput || 'default');
  audioInputSelect.value = (defaultAudio || 'default');

  //return switchStream();
  return true;
}



// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  console.log('trying to attach sink id');
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
    .then(function() {
      console.log('Success, audio output device attached: ' + sinkId);
    })
    .catch(function(error) {
      var errorMessage = error;
      if (error.name === 'SecurityError') {
        errorMessage = 'You need to use HTTPS for selecting audio output ' +
            'device: ' + error;
      }
      console.log(errorMessage);
      // Jump back to first output device in the list as it's the default.
      if (audioOutputSelect) {
        audioOutputSelect.selectedIndex = 0;
      }
    });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

function saveCamMic() {
  //saveNow = true;
  audioSource = audioInputSelect.value;
  videoSource = videoSelect.value;
  $('#d_audio').text(audioSource) ;
  $('#d_video').text(videoSource) ;

  //start(true);
  console.log(" 2 LOG AUDIO: " + audioSource + ", LOG VIDEO: " + videoSource + ", LOG OUTPUT: " + audioOutput);
  changeAudioDestination(true); 
  show_in_call_notification("Settings updated"); 
}

function changeAudioDestination(and_save) {
  fadeOut(document.getElementById('change_speaker_button'));
  audioOutput = audioOutputSelect.value;
  $('#d_output').text(audioOutput) ;

  var audioOutputID = outputHash[audioOutput];
  var testSoundElement = document.getElementById('player');
  var thisVideo = document.getElementById('video');
  console.log('changeAudioDestination ' + audioOutputID);
  attachSinkId(thisVideo, audioOutputID);
  attachSinkId(testSoundElement, audioOutputID);
  if (and_save) {
    saveSelections();
  }
}

function adjustPexip(){
  console.log('adjust pexip');
  if (rtc) {
    console.log('audiochange: switching');
    rtc.video_source = videoHash[videoSource];
    rtc.audio_source = audioHash[audioSource];
    // End
    var sr = document.getElementById('stream_reconnect_time');
    var srtim = 200;
    if (sr){
      srtim = sr.innerHTML;
    }
    setTimeout(function(){
      console.log('calling renegotiate');
      runAdjustPexip();}
    , srtim);
  }
}

function adjustVideoAudio() {
  var thisVideo = document.getElementById('video');
  attachSinkId(thisVideo, audioOutputID);
}

function gotStream(stream) {
  console.log('running gotStream');
  myOldLocalStream = stream;
  window.stream = stream; // make stream available to console

  var selfvid = document.getElementById('selfvideo');

   if (videoElement.mozSrcObject !== undefined) { // FF18a
              videoElement.mozSrcObject = stream;
            } else if (videoElement.srcObject !== undefined) {
              videoElement.srcObject = stream;
            } else { // FF16a, 17a
              videoElement.src = window.URL.createObjectURL(stream);
            }
   //playVid();

   if (selfvid.mozSrcObject !== undefined) { // FF18a
              selfvid.mozSrcObject = stream;
            } else if (selfvid.srcObject !== undefined) {
              selfvid.srcObject = stream;
            } else { // FF16a, 17a
              selfvid.src = window.URL.createObjectURL(stream);
            }

  //videoElement.srcObject = stream;

    // Create an AudioNode from the stream.
    //mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    //meter = createAudioMeter(audioContext);
    //mediaStreamSource.connect(meter);

    // kick off the visual updating
    //drawLoop();


  // Refresh button list in case labels have become available
  return true;
  //return navigator.mediaDevices.enumerateDevices();
}

function switchStream(stream) { /* DEPRECIATED!!! */
 if (!is_this_mobile()){
  console.log("RUNNING SWITCHSTREAM");
  if (rtc) {
    console.log('holdOffFirstRun = ' + holdOffFirstRun);
    if (rtc.chrome_ver < 72 ) {holdOffFirstRun = true;}
    console.log('holdOffFirstRun after chrome check = ' + holdOffFirstRun);
    if (holdOffFirstRun) {
      var is_video_muted = rtc.mutedVideo;
      //rtc.call.pc.removeStream(rtc.call.pc.getSenders()[0]);
      if (rtc.call.pc.getLocalStreams()[0]) {
        rtc.call.pc.removeStream(rtc.call.pc.getLocalStreams()[0]); //deprecated?
      }
      rtc.call.pc.addStream(stream);
      var tracks = stream.getVideoTracks();
      if (is_video_muted) {
        rtc.call.mutedVideo = !is_video_muted; // this has to be set to trigger the changes
        rtc.call.muteVideo(is_video_muted);
      }

      var is_audio_muted = rtc.mutedAudio;
      if (is_audio_muted) {
        rtc.call.mutedAudio = !is_audio_muted; // this has to be set to trigger the changes
        rtc.call.muteAudio(is_audio_muted);
      }
 
      //start(false);
      rtc.call.pcCreateOffer();
    }
    else {
      console.log('hiding settings for chrome');
      var settings_link = document.getElementById('header_settings_link');
      if (settings_link){
        settings_link.classList.add('hidden'); 
      }
    }
    holdOffFirstRun = true;
  }

  var selfvid = document.getElementById('selfvideo');

   if (!$('self_view_widget').hasClass('hidden') || rtc) {


     if (selfvid.mozSrcObject !== undefined) { // FF18a
              selfvid.mozSrcObject = stream;
            } else if (selfvid.srcObject !== undefined) {
              selfvid.srcObject = stream;
            } else { // FF16a, 17a
              selfvid.src = window.URL.createObjectURL(stream);
            }
    }

     if (videoElement.mozSrcObject !== undefined) { // FF18a
              videoElement.mozSrcObject = stream;
            } else if (videoElement.srcObject !== undefined) {
              videoElement.srcObject = stream;
            } else { // FF16a, 17a
              videoElement.src = window.URL.createObjectURL(stream);
            }

 
  return true; 
  // turn on stream to self video and settings video if turned on
  //

   /*myOldLocalStream.getTracks().forEach(function(track) {
     track.stop();
   });*/
   //navigator.mediaDevices.getUserMedia(g_constraints).
   //   then(turnOnExtraScreens).catch(handleError);
 }
 else {
   // mobile currently doesn't show settings anyway
   return true;
 }
}

function turnOnExtraScreens(stream) {

  var selfvid = document.getElementById('selfvideo');

   if (!$('self_view_widget').hasClass('hidden')) {


     if (selfvid.mozSrcObject !== undefined) { // FF18a
              selfvid.mozSrcObject = stream;
            } else if (selfvid.srcObject !== undefined) {
              selfvid.srcObject = stream;
            } else { // FF16a, 17a
              selfvid.src = window.URL.createObjectURL(stream);
            }
    }

     if (videoElement.mozSrcObject !== undefined) { // FF18a
              videoElement.mozSrcObject = stream;
            } else if (videoElement.srcObject !== undefined) {
              videoElement.srcObject = stream;
            } else { // FF16a, 17a
              videoElement.src = window.URL.createObjectURL(stream);
            }

   //playVid();

}
function turnOffScreens(stream) {
    stream.getTracks().forEach(function(track) {
      track.stop();
    });
}


function stop() {
  if (!rtc && window.stream) {
    console.log('stopping stream');
    videoElement.pause();
    videoElement.src = "";
    var selfvid = document.getElementById('selfvideo');
    if (selfvid) {
      selfvid.pause();
      selfvid.src = "";
    }
  }
}

function saveSelections() {
 
  console.log('SAVING selections!');
  var user_id = mediaUserId; 
  var obj = new Object();
  obj.audio = microphone.options[microphone.selectedIndex].text; 
  obj.video = camera.options[camera.selectedIndex].text; 
  if (!is_safari) { // safari currently does not support speaker
    obj.speaker = speaker.options[speaker.selectedIndex].text
  }
 
  obj.user_id = user_id;
  var jsonString = JSON.stringify(obj);
  defaultAudio = obj.audio;
  defaultVideo = obj.video;
  defaultOutput = obj.speaker;

  $('#d_audio').text(defaultAudio);
  $('#d_video').text(defaultVideo);
  $('#d_output').text(defaultOutput);

  if (!is_mobile()) { /* only save preferred settings for desktop */
    $.ajax({
       url:"../endpoint/set_audio_video",
       method: "POST",
       data: jsonString, 
       dataType: "JSON",
       format: 'js',
       contentType: "application/json",
       headers: {
         'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
       },
       success: function(data) {
         adjustPexip();
       }
    });
  }
  else {
    adjustPexip();
  }

}

function saveSelectionsWithoutPexip() {
 
  console.log('SAVING selections without PEXIP!');
  var user_id = mediaUserId; 
  var obj = new Object();
  obj.audio = microphone.options[microphone.selectedIndex].text; 
  obj.video = camera.options[camera.selectedIndex].text; 
  if (!is_safari) { // safari currently does not support speaker
    obj.speaker = speaker.options[speaker.selectedIndex].text
  }
 
  obj.user_id = user_id;
  var jsonString = JSON.stringify(obj);
  defaultAudio = obj.audio;
  defaultVideo = obj.video;
  defaultOutput = obj.speaker;

  $('#d_audio').text(defaultAudio);
  $('#d_video').text(defaultVideo);
  $('#d_output').text(defaultOutput);

  $.ajax({
     url:"../endpoint/set_audio_video",
     method: "POST",
     data: jsonString, 
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
       //adjustPexip(); dont call this for speaker change
     }
  });

}

/*if (audioInputSelect && videoSelect) {
  audioInputSelect.onchange = start(true);
  audioOutputSelect.onchange = changeAudioDestination;
  videoSelect.onchange = start(true);
}*/

function handleError(error) {
  /*
  if (error.name == 'ConstraintNotSatisfiedError' && error.constraintName == 'deviceId') {
    // do nothing, will fail back to defaults
  }
  else {
    console.log('navigator.getUserMedia error: ', error.name);
    error_connecting = true;
    swal({ title: 'Your call cannot be placed', text: error,  type: "error", showCancelButton: false, confirmButtonClass: "btn-primary", closeOnConfirm: false}, function(){ if(rtc) {endCall();}  else {location.reload();} } ); 
  }
  */
}

function updateSelectedDropdown(element_id, selected_value) {
  var sel = document.getElementById(element_id);
  if (sel) {
    var opts = sel.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      console.log('checking ' + opt.value + ' against ' + selected_value);
      if (opt.value == selected_value) {
        sel.selectedIndex = j;
        break;
      }
    }
  }
}

function selectHasValue(element_id, selected_value) {
  var sel = document.getElementById(element_id);
  if (sel) {
    var opts = sel.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.value == selected_value) {
        return true;
      }
    }
    return false;
  }
}

function checkMediaDefaults() {
  console.log('checkMediaDefaults');
  if (loadDefaults) {
    if (from_observer){
      defaultAudio = $('#d_audio_admin').text() ;
      defaultVideo = $('#d_video_admin').text() ;
      defaultOutput = defaultOutput || $('#d_output_admin').text() ;
    }
    else {
      defaultAudio = $('#d_audio').text() ;
      defaultVideo = $('#d_video').text() ;
      defaultOutput = defaultOutput || $('#d_output').text() ;
    }
    console.log('HERE WE ARE ASSIGNING assigning media defaults.. defaultVideo = ' + defaultVideo);
    console.log('speaker is ' + defaultOutput);
    if (defaultAudio == 'default') {
      audioSource = audioInputSelect.value;
    } 
    else {
      if (selectHasValue('audioSource', defaultAudio)){
        audioSource = defaultAudio; 
        audioInputSelect.value = defaultAudio;
        updateSelectedDropdown('audioSource', defaultAudio);
      }
      else {
        audioSource = audioInputSelect.value;
      }
    }
    if (defaultOutput == 'default') {
      audioOutput = audioOutputSelect.value;
    } 
    else {
      if (selectHasValue('audio_output_select', defaultOutput)){
        audioOutput = defaultOutput; 
        audioOutputSelect.value = defaultOutput;
        updateSelectedDropdown('audioOutput', defaultOutput);
      }
      else {
        audioOutput = audioOutputSelect.value;
      }
    }
    if (defaultVideo == 'default') {
      videoSource = videoSelect.value;
    }
    else {
      if (selectHasValue('videoSource', defaultVideo)){
        videoSource = defaultVideo; 
        videoSelect.value = defaultVideo;
        updateSelectedDropdown('videoSource', defaultVideo);
      }
      else {
        videoSource = videoSelect.value;
      }
    }
    loadDefaults = false;
  }
  else {
    audioSource = audioInputSelect.value;
    videoSource = videoSelect.value;
    audioOutput = audioOutputSelect.value;
  }

  console.log(" 1 LOG AUDIO: " + audioSource + ", LOG VIDEO: " + videoSource + ", LOG OUTPUT: " + audioOutput);
}



 function open_country_dropdown(rule, idx) {
    switch(rule) {
      case 1:
        if (document.getElementById("country_phone_select1_"+idx).style.display == "block"){
          $('#country_phone_select1_'+idx).addClass("hidden");  
          document.getElementById("country_phone_select1_"+idx).style.display = "none";
        }
        else{
          $('#country_phone_select1_'+idx).removeClass("hidden");  
          document.getElementById("country_phone_select1_"+idx).style.display = "block";
        }
        break;
      case 2:
        if (document.getElementById("country_phone_select2_"+idx).style.display == "block"){
          $('#country_phone_select2_'+idx).addClass("hidden");  
          document.getElementById("country_phone_select2_"+idx).style.display = "none";
        }
        else{
          $('#country_phone_select2_'+idx).removeClass("hidden");  
          document.getElementById("country_phone_select2_"+idx).style.display = "block";
        }
        break;
      case 3:
        if (document.getElementById("country_phone_select3_"+idx).style.display == "block"){
          $('#country_phone_select3_'+idx).addClass("hidden");  
          document.getElementById("country_phone_select3_"+idx).style.display = "none";
        }
        else{
          $('#country_phone_select3_'+idx).removeClass("hidden");  
          document.getElementById("country_phone_select3_"+idx).style.display = "block";
        }
     }
  }

  function set_country_phone(rule, abbv, idx) {
    switch(rule) {
      case 1: // Clinician Flag 1
        document.getElementById("flag1_value_"+idx).value =  abbv;
		    
        
        $("#flag1_"+idx).removeClass();
        $("#flag1_"+idx).addClass('flag-icon');
        $("#flag1_"+idx).addClass('flag-icon-'+abbv);
        $("#country_phone_select1_"+idx).addClass("hidden"); 

        if ($("#clinician_phone2_"+idx).hasClass('hidden')){
  	  $("#flag2_"+idx).removeClass();
          $("#flag2_"+idx).addClass('flag-icon');
          $("#flag2_"+idx).addClass('flag-icon-'+abbv);
	}
        if ($("#clinician_phone3_"+idx).hasClass('hidden')){
	  $("#flag3_"+idx).removeClass();
          $("#flag3_"+idx).addClass('flag-icon');
          $("#flag3_"+idx).addClass('flag-icon-'+abbv);
        }
        if (document.getElementById("clinician_phone2_"+idx).style.display == "none"){
         $("#flag2_"+idx).removeClass();
          $("#flag2_"+idx).addClass('flag-icon');
          $("#flag2_"+idx).addClass('flag-icon-'+abbv);
        }		    
        if (document.getElementById("clinician_phone3_"+idx).style.display == "none"){
          $("#flag3_"+idx).removeClass();
          $("#flag3_"+idx).addClass('flag-icon');
          $("#flag3_"+idx).addClass('flag-icon-'+abbv);
        }

        document.getElementById("country_phone_select1_"+idx).style.display = "none";
        break;

      case 2: // Clinician Flag 2
        document.getElementById("flag2_value_"+idx).value =  abbv;

	$("#flag2_"+idx).removeClass();
        $("#flag2_"+idx).addClass('flag-icon');
        $("#flag2_"+idx).addClass('flag-icon-'+abbv);
        $('#country_phone_select2_'+idx).addClass("hidden");  
        document.getElementById("country_phone_select2_"+idx).style.display = "none";
        break;
      case 3: // Clinician Flag 3
        document.getElementById("flag3_value_"+idx).value =  abbv;


          $("#flag3_"+idx).removeClass();
          $("#flag3_"+idx).addClass('flag-icon');
          $("#flag3_"+idx).addClass('flag-icon-'+abbv);
          $('#country_phone_select3_'+idx).addClass("hidden");  
          document.getElementById("country_phone_select3_"+idx).style.display = "none";
         break;
      case 4: // Technician Flag
          document.getElementById("flag1_value_"+idx).value =  abbv;


          $("#flag1_"+idx).removeClass();
          $("#flag1_"+idx).addClass('flag-icon');
          $("#flag1_"+idx).addClass('flag-icon-'+abbv);
          $('#country_phone_select1_'+idx).addClass("hidden");  
          document.getElementById("country_phone_select1_"+idx).style.display = "none";
     }

  }

   function phoneNumberMask() {
     $(".phone_number_field").inputmask({"mask": "(999) 999-9999"});
   }

   function checkPhoneLength(path) {
     phone = $('#'+ path).val();
     phone = phone.replace("(","").replace(")", "").replace(" ","").replace("-", "").replace("_","")
     if (phone.length != 10) {
       if (phone.length != 0) {
         alert("Phone numbers must be 9 digits")		  
       }
     }
   }
 
   function openPhone(rule, idx) {
     switch(rule) {
       case 1:
	   $('#clinician_phone2_'+idx).removeClass("hidden");  
           document.getElementById("clinician_phone2_"+idx).style.display = "block";

	   $('#add_phone2_'+idx).addClass("hidden");  
           document.getElementById("add_phone2_"+idx).style.display = "none";
           $('#add_phone3_'+idx).removeClass("hidden");  
           document.getElementById("add_phone3_"+idx).style.display = "block"
        break;
       case 2:
           $('#clinician_phone3_'+idx).removeClass("hidden");  
           document.getElementById("clinician_phone3_"+idx).style.display = "block";

           $('#add_phone3_'+idx).addClass("hidden");  
           document.getElementById("add_phone3_"+idx).style.display = "none";	
      }
   }

   function remove_additional_phone(rule, clinician_id, idx) {
     switch(rule) {
       case 1:
           if ($('#clinician_phone3_'+idx).hasClass("hidden")){          
	     $('#clinician_phone2_'+idx).addClass("hidden");  
             document.getElementById("clinician_phone2_"+idx).style.display = "none";

  	     $('#clinician_phone_two_'+idx).val("");
  	     if (clinician_id != "") {
               $.ajax("/admin_panel/client/delete_clinician_phone/?clinician_id=" + clinician_id + "&phone=" + 2);
	     }
           }
           else { 
             $('#clinician_phone3_'+idx).addClass("hidden");  
             document.getElementById("clinician_phone3_"+idx).style.display = "none";
	     $('#clinician_phone_two_'+idx).val($('#clinician_phone_three_'+idx).val())	
	     $('#clinician_phone_two_'+idx).val($('#clinician_phone_three_'+idx).val())	

             $("#flag2_"+idx).removeClass();

             var classList = document.getElementById('flag3_'+idx).className.split(/\s+/);
             for (var i = 0; i < classList.length; i++) {
               $('#flag2_'+idx).addClass(classList[i]);
	     }
		   
  	     if (clinician_id != "") {
               $.ajax("/admin_panel/client/delete_clinician_phone/?clinician_id=" + clinician_id + "&phone=" + 3);
	     }

	   }

           $('#add_phone3_'+idx).addClass("hidden");  
           document.getElementById("add_phone3_"+idx).style.display = "none";

           $('#add_phone2_'+idx).removeClass("hidden");  
           document.getElementById("add_phone2_"+idx).style.display = "block";

  	   $('#clinician_phone_three_'+idx).val("")	

         break;
       case 2:
	   $('#clinician_phone3_'+idx).addClass("hidden");  
           document.getElementById("clinician_phone3_"+idx).style.display = "none";
           $('#clinician_phone_three_'+idx).val("")		 
		     
          $('#add_phone3_'+idx).removeClass("hidden");  
           document.getElementById("add_phone3_"+idx).style.display = "block";
      }
   }

