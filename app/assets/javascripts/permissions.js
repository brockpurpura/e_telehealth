if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    // Firefox 38+ seems having support of enumerateDevicesx
    navigator.enumerateDevices = function(callback) {
        navigator.mediaDevices.enumerateDevices().then(callback);
    };
}

var MediaDevices = [];
var isHTTPs = location.protocol === 'https:';
var canEnumerate = false;

if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
    canEnumerate = true;
} else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
    canEnumerate = true;
}

var hasMicrophone = false;
var hasSpeakers = false;
var hasWebcam = false;

var isMicrophoneAlreadyCaptured = false;
var isWebcamAlreadyCaptured = false;

function checkDeviceSupport(callback) {
    if (!canEnumerate) {
        return;
    }

    if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
        navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
    }

    if (!navigator.enumerateDevices && navigator.enumerateDevices) {
        navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
    }

    if (!navigator.enumerateDevices) {
        if (callback) {
            callback();
        }
        return;
    }

    MediaDevices = [];
    navigator.enumerateDevices(function(devices) {
        devices.forEach(function(_device) {
            var device = {};
            for (var d in _device) {
                device[d] = _device[d];
            }

            if (device.kind === 'audio') {
                device.kind = 'audioinput';
            }

            if (device.kind === 'video') {
                device.kind = 'videoinput';
            }

            var skip;
            MediaDevices.forEach(function(d) {
                if (d.id === device.id && d.kind === device.kind) {
                    skip = true;
                }
            });

            if (skip) {
                return;
            }

            if (!device.deviceId) {
                device.deviceId = device.id;
            }

            if (!device.id) {
                device.id = device.deviceId;
            }

            if (!device.label) {
                device.label = 'Please invoke getUserMedia once.';
                if (!isHTTPs) {
                    device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
                }
            } else {
                if (device.kind === 'videoinput' && !isWebcamAlreadyCaptured) {
                    isWebcamAlreadyCaptured = true;
                }

                if (device.kind === 'audioinput' && !isMicrophoneAlreadyCaptured) {
                    isMicrophoneAlreadyCaptured = true;
                }
            }

            if (device.kind === 'audioinput') {
                hasMicrophone = true;
            }

            if (device.kind === 'audiooutput') {
                hasSpeakers = true;
            }

            if (device.kind === 'videoinput') {
                hasWebcam = true;
            }

            // there is no 'videoouput' in the spec.

            MediaDevices.push(device);
        });

        if (callback) {
            callback();
        }
    });
}

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var video = document.querySelector('video');

hasGetUserMedia();

checkDeviceSupport();
// check for microphone/camera support!
//checkDeviceSupport(function() {
//    document.write('hasWebCam: ', hasWebcam, '<br>');
//    document.write('hasMicrophone: ', hasMicrophone, '<br>');
//    document.write('isMicrophoneAlreadyCaptured: ', isMicrophoneAlreadyCaptured, '<br>');
//    document.write('isWebcamAlreadyCaptured: ', isWebcamAlreadyCaptured, '<br>');
//});


function errorMessage(message, e) {
    setTimeout(function(){swal({title:message, text: e})}, 5000);
}

function fatalErrorMessage(message, e) {
    fadeDial();
    message = message + "";
    if (e.indexOf("Permission") > 0 || e.indexOf("permission") > 0 ) {
      errorMessage(message, e);
    }
    else {
      if (!api_call && message.indexOf("Overconstrained") < 0) {
    setTimeout(function(){swal({ title: "Call cannot be placed", text: 'Media: ' +  message,  showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false, closeOnCancel: false}, function(isConfirm){ if (isConfirm) { endCall();  } else {swal.close();}})}, 5000);
      }
    }
}

function makeSureHaveBoth(stream) {
  var vid_len = stream.getVideoTracks().length ;
  var aud_len = stream.getAudioTracks().length ;
  console.log('Media: video = ' + vid_len + ' audio = ' + aud_len);
  if(vid_len == 0 && aud_len == 0){
    errorMessage('You do not have any audio or video', 'Please check permissions and setup');
    if (rtc){rtc.audio_source = false; rtc.video_source = false;}
  }else{
    if (aud_len == 0) {
      errorMessage('You have no audio available', 'Please check permissions and setup');
      if (rtc){rtc.audio_source = false;}
    }
    else {
      if (vid_len == 0) {
        errorMessage('You have no video available', 'Please check permissions and setup');
        if (rtc){rtc.video_source = false;}
      }
    }
    //code for when both devices are available
  }
}

function getErrorForPexip(){
        if (location.protocol === 'https:') {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            if (navigator.getUserMedia) {
                navigator.getUserMedia({ audio: true, video: true }, function (stream) {
                    var mediaStreamTrack = stream.getAudioTracks()[0];
                    if (typeof mediaStreamTrack != "undefined") {
                        mediaStreamTrack.onended = function () {//for Chrome.
                            errorMessage('Your webcam is busy!')
                        }
                    } else errorMessage('Permission denied!');
                }, function (e) {
                    var message;
                    switch (e.name) {
                        case 'NotFoundError':
                        case 'DevicesNotFoundError':
                            message = 'Please setup your webcam first.';
                            break;
                        case 'SourceUnavailableError':
                            message = 'Your webcam is busy';
                            break;
                        case 'PermissionDeniedError':
                        case 'SecurityError':
                            message = 'Permission denied!';
                            break;
                        default: errorMessage('Reeeejected!', e);
                            return;
                    }
                    errorMessage(message);
                });
            } else errorMessage('Uncompatible browser!');
        } else errorMessage('Use https protocol for open this page.')
}
