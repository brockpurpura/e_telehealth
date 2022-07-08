function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function isMobile(){
  if (navigator.userAgent.indexOf("Mobile") != -1){
     return true; 
  }
  else {
    return false; 
  }
}

function isAndroid(){
  return (getMobileOperatingSystem() == "Android")
}

function getChromeVersion() { 
  if (getEdgeVersion() == 1000000 && navigator.userAgent.indexOf("Chrome") != -1) {   
    return parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
  }
  else {
    return 1000000;
  } 
}

function getEdgeVersion() {
  if (navigator.userAgent.indexOf("Edge") != -1) {
    return parseInt(window.navigator.userAgent.match(/Edge\/\d+\.(\d+)/)[1], 10);
  }
  else {
    return 1000000;
  }
}

function getSafariVersion(){
 if (getChromeVersion() == 1000000 && getEdgeVersion() == 1000000 && navigator.userAgent.indexOf("Safari") != -1) {
   if (navigator.userAgent.indexOf("Mobile") == -1){
     return parseInt(window.navigator.appVersion.match(/Safari\/(\d+)\./)[1], 10);
   }
   else {
     /* Mobile but now not sure of browser */ 
     return 1000000;
   }
 }
 else {
   return 1000000;
 } 
}

function getFirefoxVersion() {
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    return parseInt(window.navigator.userAgent.match(/Firefox\/(\d+)\./)[1], 10);
  }
  else {
    return 1000000;
  }
}


console.log('Chrome version is: ' + getChromeVersion());
console.log('Safari version is: ' + getSafariVersion());
console.log('Firefox version is: ' + getFirefoxVersion());
console.log('Edge version is: ' + getEdgeVersion());