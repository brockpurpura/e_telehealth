var userMediaError = false;


function univago_adjust_selected_source(pexip_object){
  // Adjust for Univago selected source
  // Overwrites assignment of Pexip of pexip_object.video_source and pexip_object.audio_source to pre-defined settings

 audioSource = document.getElementById('d_audio').innerHTML;
 videoSource = document.getElementById('d_video').innerHTML;

  console.log("PexRTC.call_type: [" + pexip_object.call_type + "]")
  if (pexip_object.call_type !== 'screen' && pexip_object.call_type !== 'presentation') {
    if (typeof audioSource == 'undefined') {
      console.log('In pexrtc: MISSING AUDIO SELF SOURCES');
      pexip_object.audio_source = pexip_object.parent.audio_source;
    } 
    else {
      console.log('In pexrtc: SETTING SELF SOURCES');
      var audioSourceID = audioHash[audioSource];
      pexip_object.audio_source = audioSourceID; 
      
    }
    if (typeof videoSource == 'undefined') {
      console.log('In pexrtc: MISSING VIDEO SELF SOURCES');
      pexip_object.video_source = pexip_object.parent.video_source;
    } 
    else {
      console.log('In pexrtc: SETTING SELF VIDEO SOURCES');
      console.log('videoSource is: ' + videoSource);
      console.log('videoSource ID is: ' + videoHash[videoSource]);
      var videoSourceID = videoHash[videoSource];
      pexip_object.video_source = videoSourceID;
    }

    if (noCamera) { 
      pexip_object.video_source = false;
    }
    if (noAudio) { 
      pexip_object.audio_source = false;
    }  // end of Univago adjustment
  }

  return pexip_object;
}

function univago_print_custom_bandwidth(pexip_object, videoConstraints){
  if (pexip_object.custom_bandwidth) {
    console.log("*** Custom_BW=" + pexip_object.custom_bandwidth);
    console.log('Current Video constraints: *** Custom BW :' + JSON.stringify(videoConstraints));
    tunnel("DEBUG video custom constraints: " + JSON.stringify(videoConstraints),null);
  }
  console.log("*** mobile: " + is_mobile() + " chrome_ver:" + pexip_object.chrome_ver + " safari_ver:" + pexip_object.safari_ver
    + " firefox_ver:" + pexip_object.firefox_ver + " edge_ver:" + pexip_object.edge_ver);
  console.log("*** android:" + pexip_object.is_android + " electron:" + pexip_object.is_electron + " force_hd:" + pexip_object.force_hd
    + " screenshare: " + pexip_object.is_screenshare);
}

function univago_add_custom_bandwidth_pex_object(pexip_object, videoConstraints){
  if (pexip_object.custom_bandwidth) {
    // <all_devices:1><res_type:1><frame_type:1><bandwidth:4>
    var bandwidth = parseInt(pexip_object.custom_bandwidth)%10000;
    var res_type = Math.floor(parseInt(pexip_object.custom_bandwidth)/10000);
    var frame_type = res_type%10;
    var all_devices = Math.floor(res_type/100);
    res_type = Math.floor(res_type/10)%10;
    console.log("*** BW=" + bandwidth + " res_type=" + res_type
        + " frame_type=" + frame_type + " all_devices=" + all_devices);
    console.log("*** BW_in=" + pexip_object.bandwidth_in + " BW_out=" + pexip_object.bandwidth_out);
    
    if ((all_devices==1) || is_mobile()) {
        // set bandwidth
        console.log("*** Bandwidth=" + bandwidth);
        pexip_object.bandwidth_in = bandwidth;
        pexip_object.bandwidth_out = bandwidth;
    } 

  }
  return pexip_object;
}

function univago_add_custom_bandwidth(pexip_object, videoConstraints){

  // Univago: add custom bandwidth
  if (pexip_object.custom_bandwidth) {
    // <all_devices:1><res_type:1><frame_type:1><bandwidth:4>
    var bandwidth = parseInt(pexip_object.custom_bandwidth)%10000;
    var res_type = Math.floor(parseInt(pexip_object.custom_bandwidth)/10000);
    var frame_type = res_type%10;
    var all_devices = Math.floor(res_type/100);
    res_type = Math.floor(res_type/10)%10;
    console.log("*** BW=" + bandwidth + " res_type=" + res_type
        + " frame_type=" + frame_type + " all_devices=" + all_devices);
    console.log("*** BW_in=" + pexip_object.bandwidth_in + " BW_out=" + pexip_object.bandwidth_out);
    
    if ((all_devices==1) || is_mobile()) {
        // set bandwidth
        console.log("*** Bandwidth=" + bandwidth);
        pexip_object.bandwidth_in = bandwidth;
        pexip_object.bandwidth_out = bandwidth;
    
        // set resolution, 0: don't change, 1: 1280x720, 2: 768x448, 3: 480x360, 4: 352x240
        if (res_type==1) {
    	console.log("*** Resolution=720p");
    	videoConstraints.width = {'max': 1280};
    	videoConstraints.height = {'max': 720};
        } else if (res_type==2) {
    	console.log("*** Resolution=448p");
    	videoConstraints.width = {'max': 768};
    	videoConstraints.height = {'max': 448};
        } else if (res_type==3) {
    	console.log("*** Resolution=360p");
    	videoConstraints.width = {'max': 480};
    	videoConstraints.height = {'max': 360};
        } else if (res_type==4) {
    	console.log("*** Resolution=240p");
    	videoConstraints.width = {'max': 352};
    	videoConstraints.height = {'max': 240};
        }
    
        // set frame rate, 0: don't change, 1: 24, 2: 15, 3: 10
        if (frame_type==1) {
    	console.log("*** Frame Rate=24");
    	videoConstraints.frameRate = {'max': 24};
        } else if (frame_type==2) {
    	console.log("*** Frame Rate=15");
        	videoConstraints.frameRate = {'max': 15};
        } else if (frame_type==3) {
    	console.log("*** Frame Rate=10");
        	videoConstraints.frameRate = {'max': 10};
        }
     }
   }
   return videoConstraints;
}

function univago_add_custom_bandwidth_two(pexip_object, videoConstraints){
  if (pexip_object.custom_bandwidth) {
    // <all_devices:1><res_type:1><frame_type:1><bandwidth:4>                                                                                                                  
    var bandwidth = parseInt(pexip_object.custom_bandwidth)%10000;
    var res_type = Math.floor(parseInt(pexip_object.custom_bandwidth)/10000);
    var frame_type = res_type%10;
    var all_devices = Math.floor(res_type/100);
    res_type = Math.floor(res_type/10)%10;
    console.log("*** BW=" + bandwidth + " res_type=" + res_type
       + " frame_type=" + frame_type + " all_devices=" + all_devices);
    console.log("*** BW_in=" + pexip_object.bandwidth_in + " BW_out=" + pexip_object.bandwidth_out);

    if ((all_devices==1) || is_mobile()) {
      // set bandwidth                                                                                                                                                       
      console.log("*** Bandwidth=" + bandwidth);
      pexip_object.bandwidth_in = bandwidth;
      pexip_object.bandwidth_out = bandwidth;

      // set resolution, 0: don't change, 1: 1280x720, 2: 768x448, 3: 480x360, 4: 352x240                                                                                    
      if (res_type==1) {
        console.log("*** Resolution=720p");
        videoConstraints.maxWidth = "1280";
        videoConstraints.maxHeight = "720";
      } else if (res_type==2) {
        console.log("*** Resolution=480p");
        videoConstraints.maxWidth = "640";
        videoConstraints.maxHeight = "480";
      } else if (res_type==3) {
        console.log("*** Resolution=360p");
        videoConstraints.maxWidth = "480";
        videoConstraints.maxHeight = "360";
      } else if (res_type==4) {
        console.log("*** Resolution=240p");
        videoConstraints.maxWidth = "320";
        videoConstraints.maxHeight = "240";
      }
    }
  }
  return videoConstraints;
}

function univago_user_media_error(pexip_object, userMediaError, constraints, return_object){
  if (userMediaError) {
//    if (noCamera || noAudio) {
//      if (noAudio) {
//         if (noCamera) {
//           constraints = {audio: false, video: false}; // better to fail?
//           console.log('userMediaError with constraints: ' + JSON.stringify(constraints));
//           tunnel("DEBUG userMediaError with constraints: " + JSON.stringify(constraints),null);
//           pexip_object.video_source = false;
//           pexip_object.audio_source = false;
//         }
//         else {
//           constraints = {audio: false, video: true}; 
//           console.log('userMediaError with constraints: ' + JSON.stringify(constraints));
//           tunnel("DEBUG userMediaError with constraints: " + JSON.stringify(constraints),null);
//           pexip_object.audio_source = false;
//           pexip_object.video_source = pexip_object.parent.video_source;
//         }
//       }
//       else {
         // default all errors to no video for now
         constraints = {audio: true, video: false};
         console.log('userMediaError with constraints: ' + JSON.stringify(constraints));
         tunnel("DEBUG userMediaError with constraints: " + JSON.stringify(constraints),null);
         pexip_object.audio_source = pexip_object.parent.audio_source;
         pexip_object.video_source = false;
//       }
//     }
//     else {
//       constraints = {audio: true, video: true};
//       console.log('userMediaError with constraints: ' + JSON.stringify(constraints));
//       tunnel("DEBUG userMediaError with constraints: " + JSON.stringify(constraints),null);
//       pexip_object.video_source = pexip_object.parent.video_source;
//       pexip_object.audio_source = pexip_object.parent.audio_source;
//     }
  }

  if (return_object) {
    return pexip_object;
  } 
  else {
    return constraints;
  }
}

function univago_display_errors(pexip_object, err){

  tunnel("DEBUG getUserMedia error: " + err,null);
  tunnel("DEBUG getUserMedia error json: " + JSON.stringify(err) , null);

  if (pexip_object.call_type !== 'screen') {
    if (is_safari) {
      if (!api_call && !err.message.includes('constrain') ) {
        proAlert("Error setting up your Camera or Microphone", "warning", "Please check camera and microphone set up and permissions", "OK", "close", false);
      }
    }
    else {
      if (!api_call && !err.name.includes('Overconstrained') && !err.name.includes('Constraint')) {
        proAlert("Error setting up your Camera or Microphone", "warning", "Please check camera and microphone set up and permissions", "OK", "close", false);
      }
      pexip_object.video_source = false;
      pexip_object.audio_source = false;
    }
  }
  return pexip_object;
}
