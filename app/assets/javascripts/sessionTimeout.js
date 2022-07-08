// Session Auto Timeout is controlled by this, Admin.should_timeout?, and admin_controller timeout_in()
var sessionTimeoutDuration = null;
var sessionTimeout = null;
var sessionTimeoutWarning = null;
var sessionTimer = 0;

// Contructer
function sessionAutoTimeout(duration){ 
  setSessionTimeoutDuration(duration);
} 

// Turn on Session Auto Timeout Process
function activateSessionTimeout() {
  setSessionTimer(70);
  setSessionTimeout(setTimeout(function () {
    proAlert('Session Expiring', 'warning', 'Do you wish to extend this?', 'Extend', 'extend_session', false);
    setSessionTimeoutWarning(setInterval(function(){
      setSessionTimer(getSessionTimer() - 1);
      if (getSessionTimer() <= 60) {
        $("#pro_alert_message").text(getSessionTimer() + " seconds remaining");
      }
      if(getSessionTimer() < 0){
        $.ajax("/timeout");
        resetSessionTimeout(false);
        proAlert('Session Expired', 'error', 'Your session has expired.', 'Sign in', 'end_session', false);
      }
    }, 1000));
  }, (getSessionTimeoutDuration() * 60 * 1000)));
}

// Reset All Timers for refresh or expired.
function resetSessionTimeout(refreshSessionTimeout) {
  clearInterval(getSessionTimeoutWarning());
  clearTimeout(getSessionTimeout());
  
  setSessionTimeout(undefined);
  setSessionTimeoutWarning(undefined);
  setSessionTimer(70);

  closeProAlert('');
  if (refreshSessionTimeout) {
    activateSessionTimeout();
  }
}

// Getters for singleton
function getSessionTimeoutDuration() {
  return sessionTimeoutDuration;
}
function getSessionTimeout() {
  return sessionTimeout;
}
function getSessionTimeoutWarning() {
  return sessionTimeoutWarning;
}
function getSessionTimeoutWarning() {
  return sessionTimeoutWarning;
}
function getSessionTimer() {
  return sessionTimer;
}

// Setters for singleton
function setSessionTimeoutDuration(duration) {
  sessionTimeoutDuration = duration;
}
function setSessionTimeout(timeout) {
  sessionTimeout = timeout;
}
function setSessionTimeoutWarning(timeoutWarning) {
  sessionTimeoutWarning = timeoutWarning;
}
function setSessionTimer(timer) {
  sessionTimer = timer;
}

