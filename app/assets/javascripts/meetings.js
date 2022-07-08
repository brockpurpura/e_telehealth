function isMeetingHost(){
  if (epic_patient){
    return false;
  }
}

function isMeetingPatient(){
  return epic_patient;
}

function toggleMeetingPOH(){
  mychart_session_tunnel.send_command({command:'toggle_meeting_poh'});
}

// JS for managing the meeting stopwatch
var meeting_stopwatch_running = false, seconds = 0, minutes = 0, hours = 0, t;

function meeting_stopwatch_add() {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
  }
  $("#meeting_stopwatch").text((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
  increment_counter();
}

function increment_counter() {
  t = setTimeout(meeting_stopwatch_add, 1000);
}

function start_stopwatch() {
  if (!meeting_stopwatch_running) {
    meeting_stopwatch_running = true;
    increment_counter();
  }
}

function stop_stopwatch() {
  meeting_stopwatch_running = false;
  clearTimeout(t);
}