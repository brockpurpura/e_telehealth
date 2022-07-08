var call_in_place = false;
var listen_is_on = false;
var in_alert = false;
var end_initiated = false;
var layout_changed = false;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;

var tabs = ['rooms','layout','ob_alerts','advanced','end_session', 'av_settings'];

var selected_rooms = Array();
var room_array = Array();
var endpoint_array = Array();
var selected_layout = '';

var static_current_admin_id;
var dialedMachines = {};

var runEndpointUpdate = true;

function browserClosed(event){
  if (!end_initiated) {
    endAllObservations(true);
  }
 //var obj = new Object;
 //var vids = document.getElementsByClassName('ob_video');
 //for (var i=0; i<vids.length; i++){
 //  send_command_by_machine_name(vids[i].id, 'go_standby', obj);
 //}
}

window.addEventListener('beforeunload', browserClosed);

// Observation Session
function transferObserverSession(endpoint_array){
  static_current_admin_id = document.getElementById('current_admin_id').innerHTML;
  this_data = {admin_id: static_current_admin_id, endpoint_array: endpoint_array};
  $.ajax({
    url:"/observation/transfer_session",
    method: "POST",
    data: this_data,
    dataType: "JSON",
    success: function(data) {
      var transfer_id = data.transfer_id;
      document.getElementById('stored_transfer_id').innerHTML = transfer_id;
    },
    error: function(data) {
      $('#transfer_button').removeClass('hidden');
      $('#transfer_notification').addClass('hidden');
      $('#transfer_wait').addClass('hidden');

      swal('Transfer failed');
    }
  });
}

function takeOverObserverSession(){
  var transfer_id = document.getElementById('transfer_selection').value;
  document.getElementById('final_transfer_id').innerHTML = transfer_id; // save for later
  $.ajax({
    url:"/observation/take_over_session",
    method: "POST",
    data: {admin_id: document.getElementById('current_admin_id').innerHTML,  transfer_id: transfer_id},
    dataType: "JSON",
    success: function(data) {
      console.log(data['endpoints']);
      console.log(data['client_id']);
      document.getElementById('locationSelect').value = data['client_id'];
      document.getElementById('observation_session_id').innerHTML = data['new_observer_session_id'];

      checkObsBuildings(data);
    },
    error: function(data) {
      swal('Error processing transfer');
     }
   });
}


function finishTransfer(data){
   console.log('finish transfer');
      // reset all to not checked
      var check_boxes = document.getElementsByClassName('ob_check_box_class');
      for (var j=0; j<check_boxes.length; j++) {
        check_boxes[j].checked  = false;
      }
      // check the ones in transfer
      for (var i=0; i<data.endpoints.length; i++) {
        changeObserverCheckbox(data.endpoints[i]);
        //var cb = document.getElementById('checkbox_' + data.endpoints[i]);
        //if (cb) {cb.checked=true;}
      }
      layout_checkbox('#default_layout_check');
      refresh_ob_page();
      var transfer_recieve_email = data.r_email;
      var obj = new Object;
      obj = {r_email: document.getElementById('current_admin_email').innerHTML};
      send_command_by_user(data.r_email, 'request_transfer_info', obj);
      $('#import_session_div').addClass('hidden');
}

function cancelTransfer() {
  this_data = {admin_id: static_current_admin_id, endpoint_array: endpoint_array, transfer_id: document.getElementById('stored_transfer_id').innerHTML};
  $.ajax({
    url:"/observation/cancel_transfer_session",
    method: "POST",
    data: this_data,
    dataType: "JSON",
    success: function(data) {
      document.getElementById('stored_transfer_id').innerHTML = '';
      $('#transfer_button').removeClass('hidden');
      $('#transfer_notification').addClass('hidden');
      $('#transfer_wait').addClass('hidden');
    },
    error: function(data) {}
   });
}

// Observation Room
function startRoomObservation(admin_id, observation_session_id, machine_name, moverDetails){
  $.ajax({
    url:"/observation/start_room_observation",
    method: "POST",
    data: {admin_id: admin_id, observation_session_id: observation_session_id,  machine_name: machine_name, risk_priority: moverDetails["risk_priority"],  risk_type: moverDetails["risk_type"],  notes: moverDetails["notes"],  patient_name: moverDetails["patient_name"], location_desc: "", notification_contact: moverDetails["patient_contact_number"]},
    dataType: "JSON",
    success: function(data) {},
    error: function(data) {}
   });
}

function endRoomObservation(admin_id, machine_name){
  $.ajax({
    url:"/observation/end_room_observation",
    method: "POST",
    data: {admin_id: admin_id, machine_name: machine_name},
    dataType: "JSON",
    success: function(data) {},
    error: function(data) {}
   });
}

// Observation Activity
function endObservationActivity(alert_type) {
  if (alert_type == "alert") {
    $.ajax({
      url:"/observation/end_observation_activity",
      method: "POST",
      data: {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'Alert', reason: document.getElementById('alert_intervention_reason').value },
      dataType: "JSON",
      success: function(data) {},
      error: function(data) {}
    });
    close_observation_popup('alerts_documentation_popup');
  }

  else if(alert_type == "talk") {
    $.ajax({
      url:"/observation/end_observation_activity",
      method: "POST",
      data: {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'Talk', reason: document.getElementById('talk_intervention_reason').value },
      dataType: "JSON",
      success: function(data) {},
      error: function(data) {}
     });
    close_observation_popup('talk_documentation_popup')
  }
  else if (alert_type == "listen") {
    $.ajax({
      url:"/observation/end_observation_activity",
      method: "POST",
      data: {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'Listen', reason: document.getElementById('listen_intervention_reason').value },
      dataType: "JSON",
      success: function(data) {},
      error: function(data) {}
     });
    close_observation_popup('listen_documentation_popup')
  }
}

function assignTransferId(admin_id){
  $.ajax({
    url:"/observation/assign_transfer_id",
    method: "POST",
    data: {admin_id: admin_id},
    dataType: "JSON",
    success: function(data) {},
    error: function(data) {}
   });
}

function returnRoomArray(){
  var check_boxes = document.getElementsByClassName('ob_check_box_class');
  var selectedRooms = [];
  for (var j=0; j<check_boxes.length; j++) {
    if(check_boxes[j].checked) {
      selectedRooms.push(check_boxes[j].id.replace('checkbox_',''));
    }
  }
  return selectedRooms;
}

function roomCount(machine_name) {  // handle room selection details
  var check_boxes = document.getElementsByClassName('ob_check_box_class');
  var room_count = 0;
  for (var j=0; j<check_boxes.length; j++) {
    if(check_boxes[j].checked) {
      room_count++;
    }
  }

  if (room_count > 3){ if (!$('#three_room_layouts').hasClass('hidden')) {$('#three_room_layouts').addClass('hidden');} }
  else { $('#three_room_layouts').removeClass('hidden');}
  if (room_count > 6){ if (!$('#six_room_layouts').hasClass('hidden')) {$('#six_room_layouts').addClass('hidden'); }}
  else { $('#six_room_layouts').removeClass('hidden');}

  if (room_count > 12) {
    unCheckObserverCheckbox(machine_name);
    swal('You cannot select more then 12 rooms per session');
    return;
  }

  if (!selected_layout || selected_layout === 'default_layout') {
    return;
  }
  switch (selected_layout) {
    case '1x2_left':
    case '1x2_right':
    case '1x2':
      if (room_count < 4) {
        return;
      } else if (room_count >= 4 && room_count < 7) {
        layout_checkbox('#2x3_check');
        return
      } else if (room_count >= 7 && room_count <= 12) {
        layout_checkbox('#4x3_check');
        return;
      }
      break;
    case '1x5_left':
    case '2x3':
    case '1x5_right':
    case '2x4':
      if (room_count < 7) {
        return;
      } else if (room_count >= 7 && room_count <= 12) {
        layout_checkbox('#4x3_check');
        return;
      }
      break;
    default:
      return;
  }
  layout_checkbox('#default_layout_check');
  // if (room_count <  3) {  layout_checkbox('#1x2_left_check'); }
  // if (room_count > 3 && room_count < 7) { layout_checkbox('#2x3_check'); }
  // if (room_count > 6) { layout_checkbox('#4x3_check'); }


}


function changeObserverCheckbox(machine_name){
  console.log('machine name list: ' + machine_name);
  $('#selected_endpoint_row_' + machine_name).removeClass('hidden');
  $('#end_button_' + machine_name).removeClass('hidden');
  var checkbox = document.getElementById('checkbox_' + machine_name);
  if (checkbox && !checkbox.checked) {
    checkbox.checked = true;
  }

  var room_selection_list = document.getElementById('room_selection');
  var alert_room_selection_list = document.getElementById('alert_room_selection');

  var check_boxes = document.getElementsByClassName('ob_check_box_class');

  roomCount(machine_name);

  removeOptions(room_selection_list);
  removeOptions(alert_room_selection_list);

  room_array = [];
  // rebuild drop downs
  for (var j=0; j<check_boxes.length; j++) {
    if(check_boxes[j].checked) {
      var option = document.createElement("option");
      var roomName = check_boxes[j].id.replace('checkbox_','');
      option.value = roomName;
      option.text = document.getElementById('r_name_' + roomName).innerHTML;
      var option_copy = document.createElement("option");
      option_copy.value = roomName
      option_copy.text = document.getElementById('r_name_' + roomName).innerHTML;
      room_selection_list.appendChild(option);
      alert_room_selection_list.appendChild(option_copy);
      room_array.push(roomName);
    }
  }
  loadRoomInformation(room_array);
  loadAlertInformation(room_array);
}


function adjustRooms(select_name) {
  selectAndShowRoom(document.getElementById(select_name).value);
}

function selectAndShowRoom(machine_name){
  console.log('running selectAndShowRoom for machine_name ' + machine_name);
  var room_selection_list = document.getElementById('room_selection');
  var alert_room_selection_list = document.getElementById('alert_room_selection');
  room_selection_list.value = machine_name;
  alert_room_selection_list.value = machine_name;
  var div_list = document.getElementsByClassName('endpoint_info_class');
  for (var i=0; i< div_list.length; i++) {
    if (!div_list[i].classList.contains('hidden')) {
      div_list[i].classList.add('hidden');
    }
  }
  $('#endpoint_info_'+machine_name).removeClass('hidden');
  var alert_div_list = document.getElementsByClassName('endpoint_alert_class');
  for (var i=0; i< alert_div_list.length; i++) {
    if (!alert_div_list[i].classList.contains('hidden')) {
      alert_div_list[i].classList.add('hidden');
    }
  }
  $('#endpoint_alert_'+machine_name).removeClass('hidden');

  var room_name = '';
  if (document.getElementById('ep_room_name_' + machine_name)) {
    room_name = document.getElementById('ep_room_name_' + machine_name).innerHTML;
  }
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}


function unCheckObserverCheckbox(machine_name){
  $('#selected_endpoint_row_' + machine_name).addClass('hidden');

  let thisDiv = document.getElementById('info_for_' + machine_name);
  if (thisDiv){
      thisDiv.parentNode.removeChild(thisDiv);
  }

  var checkbox = document.getElementById('checkbox_' + machine_name);
  checkbox.checked = false;
  $('#end_button_' + machine_name).addClass('hidden');
  roomCount(machine_name);

  $("#room_selection option[value='" + machine_name + "']").remove();
  $("#alert_room_selection option[value='" + machine_name + "']").remove();

  // reset alert and room info tabs
  var n = room_array.indexOf(machine_name);
  if (n != -1) {
    room_array.splice(n,1);
  }
  loadRoomInformation(room_array);
  loadAlertInformation(room_array);
}

function endAllObservations(hangup) {
  return new Promise( function(resolve, reject) {
    for(var i=0; i<selected_rooms.length; i++) {
      if (streaming.isConnected()) {
        turn_off_esitter(selected_rooms[i], hangup);
       }
     }
    streaming.closeUserSession();
    end_initiated = true;
    resolve();
  });
}

function confirmEndSession(){
  swal({ title: "End All Sessions?", text: "Are you sure you want to end all sessions?", type: "warning", showCancelButton: true, confirmButtonClass: "btn-primary", confirmButtonText: "End Now", closeOnConfirm: false, closeOnCancel: false},
    function(isConfirm){
      if (isConfirm) {
        endAllObservations(true).then(window.location.reload(false));
      }
      else { swal.close(); }
    }
  );
}

function startTransferNowConfirm(){
  swal({ title: "Begin Session Transfer?", text: "Start Transfer Now?", type: "warning", showCancelButton: true, confirmButtonClass: "btn-primary", confirmButtonText: "Start Now", closeOnConfirm: false, closeOnCancel: false},
    function(isConfirm){
      if (isConfirm) {
        takeOverObserverSession();
        swal.close();
      }
      else { swal.close(); }
    }
  );
}

function confirmCancelTransfer(){
  swal({ title: "Cancel Session Transfer?", type: "warning", showCancelButton: true, confirmButtonClass: "btn-primary", confirmButtonText: "Cancel Now", closeOnConfirm: false, closeOnCancel: false},
    function(isConfirm){
      if (isConfirm) {
        cancelTransfer();
        swal.close();
      }
      else { swal.close(); }
    }
  );
}

function startTransferConfirm(){
  swal({ title: "Transfer your session?", text: "Are you sure you want to transfer this session?", type: "warning", showCancelButton: true, confirmButtonClass: "btn-primary", confirmButtonText: "Transfer Now", closeOnConfirm: false, closeOnCancel: false},
    function(isConfirm){
      if (isConfirm) {
        document.getElementById('final_transfer_id').innerHTML = '';
        var check_boxes = document.getElementsByClassName('ob_check_box_class');
        var fail = true;
        endpoint_array = [];
        if (streaming.isConnected()) {
          for (var j=0; j<check_boxes.length; j++) {
            var c_id = check_boxes[j].id;
            var existing_video = document.getElementById(machineName(c_id));
            if (existing_video) {  // need to transfer
              endpoint_array.push(machineName(c_id));
              fail=false;
            }
          }
          if (fail) {
            swal('No sessions to transfer');
          }
          else {
            transferObserverSession(endpoint_array);
            $('#transfer_button').addClass('hidden');
            $('#transfer_notification').removeClass('hidden');
            $('#transfer_wait').removeClass('hidden');
            //assignTransferId(document.getElementById('current_admin_id').innerHTML);
            swal.close();
            //hideSettings(); // disable settings too?
            swal('Waiting for transfer, please do not refresh your browser');
          }
        }
        else {
          swal('You are not connected');
        }
      }
      else { swal.close(); }
    }
  );
}

// Construct a redirect URL for TRP
function openReporting() {

  trp_url       = document.getElementById('trp_url').innerHTML;
  trp_url_jwt   = document.getElementById('trp_url_jwt').innerHTML;
  trp_url_param = document.getElementById('trp_url_param').innerHTML;

  if (trp_url && trp_url_jwt && trp_url_param) {
    redirect_url = trp_url + "?" + trp_url_param + "=" + trp_url_jwt;
    console.log("Redirecting to: " + redirect_url);
    const win = window.open(redirect_url, '_blank');
    win.focus();
  } else {
    if (!trp_url) {
      console.log("ERROR: Configurable 'trp_redirect_url' not set");
    }
    if (!trp_url_param) {
      console.log("ERROR: Configurable 'trp_redirect_token_param' not set");
    }
    if (!trp_url_jwt) {
      console.log("ERROR: JWT token not generated");
    }
  }

}


function open_observation_popup(id, popup_close_id) {
  var el_with_id = '#' + id;
  $(el_with_id).removeClass("hidden");
  document.getElementById(id).style.display = 'block'
  //$('#popup_overlay').css('height', $('.univago_admin').height());
  $('#popup_overlay').removeClass("hidden");
  //document.getElementById("admin_body_tag").style.overflow = "hidden";
  //$('html, body').animate({ scrollTop: 0 }, 'fast');

  if (popup_close_id != '') {
    close_observation_popup(popup_close_id);
    $('#popup_overlay').removeClass("hidden");
    //document.getElementById("admin_body_tag").style.overflow = "hidden";
  }
}


function close_observation_popup(id) {
  var el_with_id = '#' + id;
  $(el_with_id).addClass("hidden");
  $('#popup_overlay').addClass("hidden");
  //document.getElementById("admin_body_tag").style.overflow = "overlay";
}

function toggle_obs_icr() {
  var obj = new Object;

  if ($('#icr_'+activeMachineName()).text() == 'no') {
    obj = {on: 'true'};
    $('#icr_'+activeMachineName()).text('yes');
  }
  else {
    obj = {on: 'false'};
    $('#icr_'+activeMachineName()).text('no');
  }
  send_command_by_machine_name(activeMachineName(), 'night_view', obj);
}

function activeMachineName() {
  var layout_div = document.getElementById(getSelectedLayout());
  var boxes = layout_div.getElementsByClassName('vid_box');
  for (var i=0; i<boxes.length; i++) {
    if (boxes[i].classList.contains('vid_selected')) {
      return machineName(boxes[i].id);
    }
  }
  // else select first box
  boxes[0].classList.add('vid_selected');
  var machineNameInBox = machineName(boxes[0].id);
  if (boxes[0].classList.contains('default_vid_box')) {
    var elem = document.getElementById('location_' + machineNameInBox);
    if (elem) {
      elem.classList.add('vid_selected');
    }
  }

  return machineNameInBox;
}

function sendAlert() {
  machine_name = activeMachineName();
  var obj = new Object;
  obj = {}

  if ($("#location_" + activeMachineName()).hasClass('alert_frame')) {
    //no alert - stop alert
    in_alert = false;
    $("#location_" + activeMachineName()).removeClass('alert_frame');
    open_observation_popup("alerts_documentation_popup", "");
    send_command_by_machine_name(activeMachineName(), 'stop_play_alert', obj);
    if (!call_in_place && !listen_is_on){
      turnOnDragging();
    }
  }
  else{
    in_alert = true;
    turnOffDragging();
    $("#location_" + activeMachineName()).addClass('alert_frame');
    if (document.getElementById('ep_send_text_check_' + machine_name).checked) {
      if (document.getElementById('ep_send_text_' + machine_name).value.length > 0) {
        textRoom(document.getElementById('ep_send_text_' + machine_name).value, activeMachineName());
      }
    }
    if (document.getElementById('ep_play_alarm_check_' + machine_name).checked) {
      send_command_by_machine_name(activeMachineName(), 'play_alert', obj);
    }

    $.ajax({
      url:"/observation/start_observation_activity",
      method: "POST",
      data: {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'Alert', reason: document.getElementById('talk_intervention_reason').value },
      dataType: "JSON",
      success: function(data) {},
      error: function(data) {}
    });
  }
}


function turnOnSound() {
  if (!call_in_place) {
    var machine_name = activeMachineName();
    if( $("#" + machine_name).prop('muted') ) {
       console.log('turning on audio ' + machine_name);
       $("#" + machine_name).prop('muted', false);
       listen_is_on = true;
       activateButtons(false);
       turnOffDragging();

      $.ajax({
        url:"/observation/start_observation_activity",
        method: "POST",
        data: {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'Listen', reason: document.getElementById('talk_intervention_reason').value },
        dataType: "JSON",
        success: function(data) {},
        error: function(data) {}
      });
    }
    else {
       console.log('turning off audio ' + machine_name);
       $("#" + machine_name).prop('muted', true);
       listen_is_on = false;
       deactivateButtons(false);
       if (!in_alert) {
         turnOnDragging();
       }
       open_observation_popup("listen_documentation_popup", "");
    }
  }
}

function talkToRoom() {
  var machine_name = activeMachineName();
  if (call_in_place){
    if (!listen_is_on) {
      $("#" + machine_name).prop('muted', true);
    }
    streaming.endCall('camera_' + machine_name);
    call_in_place = false;
    deactivateButtons(true);
    setTimeout(function(){negotiatePeer('camera_'+machine_name);}, 800);
    setTimeout(function(){negotiatePeer('camera_'+machine_name);}, 3000);
    open_observation_popup("talk_documentation_popup", "");
    if (!in_alert && !listen_is_on) {
      turnOnDragging();
    }
  }
  else {
    // turn on sound
    $("#" + machine_name).prop('muted', false);
    streaming.startCall('camera_' + machine_name, 'audioCall');
    call_in_place = true;
    activateButtons(true);
    turnOffDragging();
    $.ajax({
      url:"/observation/start_observation_activity",
      method: "POST",
      data: {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'Talk', reason: document.getElementById('talk_intervention_reason').value },
      dataType: "JSON",
      success: function(data) {},
      error: function(data) {}
    });
  }
}

function turnOffDragging(){
   var elements = document.getElementsByClassName('mover');
   for(var i=0; i<elements.length; i++) {
     document.getElementById(elements[i].id).ondragstart = function(e){ e.preventDefault();return false;} ;
     document.getElementById(elements[i].id).ondrop = function(e){ e.preventDefault();return false;} ;
   }
}

function turnOnDragging(){
   var elements = document.getElementsByClassName('mover');
   for(var i=0; i<elements.length; i++) {
     document.getElementById(elements[i].id).ondragstart = null;
     document.getElementById(elements[i].id).ondrop = null;
     $(elements[i].id).draggable({helper:'clone'});
   }
}

function trigger_layout_checkbox(id) {
  //first_run = true; // trigger reconnect of streams to accomodate layout change
  layout_checkbox(id);
}

function layout_checkbox(id) {
  var boxes = document.getElementsByClassName('camera_layouts');
  for (var i=0; i<boxes.length; i++ ) {
    boxes[i].classList.remove('layout_selected');
    if (boxes[i].htmlFor === id.replace('#','')) {
      boxes[i].classList.add('layout_selected');
    }
    $('#'+boxes[i].htmlFor)[0].checked = false;
  }
  $(id)[0].checked = true;
}

function getSelectedLayout() {
  var layout_list = document.getElementsByClassName('layout_selected');
  if (layout_list.length === 0) {
    return 'default_layout';
  }
  else {
    for (var i=0; i< layout_list.length; i++) {
      //should only be one
      return layout_list[i].htmlFor.replace('_check','');
    }
  }
}

function unhideLayout() {
  var layout_list = document.getElementsByClassName('layout_type');
  for (var i=0; i< layout_list.length; i++) {
    if (!layout_list[i].classList.contains('hidden')) {
      layout_list[i].classList.add('hidden')
    }
    if (layout_list[i].classList.contains(getSelectedLayout())) {
      layout_list[i].classList.remove('hidden')
    }
  }
}

function adjustToOneMotion(machine_name){
  if (document.getElementById('ep_motion_detect_check_'+machine_name).checked) {
    var m_checks = document.getElementsByClassName('motionCheck')
    for (var i=0; i<m_checks.length; i++) {
      if (m_checks[i].id != 'ep_motion_detect_check_'+machine_name) {
         m_checks[i].checked=false;
      }
    }
  }
}

function send_command_by_user(user_email, command, params_p) {
  var obj = new Object();
  obj.email = user_email
  obj.command = command
  obj.params_p = params_p
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"endpoint/send_command_to_user",
     method: "POST",
     data: jsonString,
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
       console.log('successfully sent to user ' + user_email + ' ' + command);
     }
  });
}

$(document).ready(function() {
  phoneNumberMask();
});

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

function updateTabs(toDefault) {
  const el1 = document.querySelector('#ob_pop_up .tab_range');
  const el2 = document.querySelector('#observer_data_expand_screen .tab_range_side');
  if (toDefault) {
    if (el1) {
      el1.classList.add('hidden');
    }
    if (el2) {
      el2.classList.remove('hidden');
    }
  } else {
    if (el1) {
      el1.classList.remove('hidden');
    }
    if (el2) {
      el2.classList.add('hidden');
    }
  }

  const parent = toDefault
      ? document.querySelector('.room_info .tab_content_default_layout')
      : document.querySelector('#ob_pop_up .tab_content');

  tabs.forEach((tab, index) => {
    const elemTabContent = document.getElementById(tab);
    const elemTab = document.getElementById(tab + '_tab_d');
    parent.append(elemTabContent);
    if (index === 0) {
      elemTabContent.classList.remove('hidden');
      elemTab.classList.add('selected');
    } else {
      elemTabContent.classList.add('hidden');
      elemTab.classList.remove('selected');
    }
  });
}

function show_tab(tab_name, defaultLayout) {
  for (var i=0; i<tabs.length; i++) {
    const elem = document.getElementById(tabs[i]);
    if (!elem.classList.contains('hidden')) {
      document.getElementById(tabs[i]).classList.add('hidden');
      document.getElementById(tabs[i] + '_tab_d').classList.remove('selected');
    }
  }
  document.getElementById(tab_name).classList.remove('hidden');
  document.getElementById(tab_name + '_tab_d').classList.add('selected');
  updateRoomData();
  selectAndShowRoom(document.getElementById('alert_room_selection').value);
}

var first_run = true;

function disableEnableButton(className, disable) {
  const btns = document.getElementsByClassName(className);
  for (let i = 0; i < btns.length; i++) {
    if (disable) {
      btns[i].setAttribute("disabled", true);
    } else {
      btns[i].removeAttribute("disabled");
    }
  }
}

window.onerror = (...args) => {
  console.warn('[ERROR-HANDLER]', args.join(', '))

  disableEnableButton('apply_footer_btn', false);
}

function refresh_ob_page() {
  disableEnableButton('apply_footer_btn', true);

  updateRoomData();
  if (selected_layout == ''){ // first run
    selected_layout = getSelectedLayout();
    updateTabs(selected_layout === 'default_layout');
  }
  if (getSelectedLayout() != selected_layout) {
    //endAllCalls(selected_layout);
    layout_changed = true;
    selected_layout = getSelectedLayout();
    const isDefaultSelected = selected_layout === 'default_layout';
    updateTabs(isDefaultSelected);
    if (!isDefaultSelected) {
      const elem = document.querySelector('.vid_box.default_vid_box');
      if (elem) {
        const elemMover = document.getElementById('mover_big_' + machineName(elem.id));
        if (elemMover) {
          elemMover.remove();
        }
      }
    }
  }
  if (selected_layout !== 'default_layout' && !$('#observer_data_expand_screen_menu').hasClass('hidden')) {
    $('#observer_data_screen').removeClass('hidden');
  } else if (selected_layout === 'default_layout' && !$('#observer_data_screen').hasClass('hidden')) {
    $('#observer_data_screen').addClass('hidden');
  }

  var this_admin = document.getElementById('current_admin').innerHTML;
  if (!streaming.isConnected()) {
    swal('Please wait while we connect.  Retry.');
    //streaming.logout(this_admin); console.log('logged out');
    disableEnableButton('apply_footer_btn', false);
  }
  else {
    /*if (!first_run) {
      console.log('logging out');
      streaming.logout();
      console.log('streaming logout');
    }
    else {
      first_run = false;
    }*/
    if (first_run) {
      streaming.closeUserSession();
      transferred_session = '';
      if (document.getElementById('observation_session_id').innerHTML != "") {
        transferred_session = document.getElementById('observation_session_id').innerHTML;
      }
      $.ajax({//Generate new Observer Session
        url:"/observation/start_observation_session",
        method: "POST",
	      data: {admin_id: admin_id, transferred_session: transferred_session},
        dataType: "JSON",
        success: function(data) {
          document.getElementById('observation_session_id').innerHTML = data.observation_session_id;
        },
        error: function(data) {}
      });
    }

   var check_boxes = document.getElementsByClassName('ob_check_box_class');
   var elements = $('.vid_box');

   // go through not needed first
   for (var j=0; j<check_boxes.length; j++) {
     if (streaming.isConnected()) {
       var c_id = check_boxes[j].id;
       if (!check_boxes[j].checked) {
         var n = selected_rooms.indexOf(machineName(c_id));
         if(n != -1) {
           selected_rooms.splice(n, 1);
           $('#mover_'+machineName(c_id)).remove();
           const elemMover = document.getElementById('mover_big_' + machineName(c_id));
           if (elemMover) {
             elemMover.remove();
             const elemBig = document.getElementById('location_big_' + machineName(c_id));
             if (elemBig) {
               elemBig.innerHTML = '';
             }
           }
           turn_off_esitter(machineName(c_id), true);
           // cleanup if old
           var old_videos = document.getElementsByClassName('ob_video');
            for(var i=old_videos.length-1; i>=0; i--) {
              if (old_videos[i].id == machineName(c_id)) {
                console.log('clearing ' + old_videos[i].id);
                remoteVideo.delete('camera_' + old_videos[i].id);
              }
            }
         }
       }
       else { // turning off if checked? reset
         //turn_off_esitter(machineName(c_id), false);
       }
     }
    }

    unhideLayout();
    setTimeout(function(){
      // go through checked next
      if (layout_changed) {
        move_videos();
        layout_changed = false;
      }
      var select_default = true;
      var s_default = '';
      for (var j=0; j<check_boxes.length; j++) {
        if (check_boxes[j].checked) { // we want this video
          var c_id = check_boxes[j].id;
          var send_home = true;
          if (document.getElementById('mover_'+machineName(c_id))) { // already have this video
            //send_home = false;
          }
          else {
            turn_on_esitter(machineName(c_id), true);
            startRoomObservation(document.getElementById('current_admin_id').innerHTML, document.getElementById('observation_session_id').innerHTML, machineName(c_id), getMoverDetails(machineName(c_id)));
         }
          updateMoverWithNewInfo(machineName(c_id));
          if (!selected_rooms.includes(machineName(c_id))){
            selected_rooms.push(machineName(c_id));
          }
         }
      }

      startSitting();
      if (!select_default) {
        selectThisVideo( 'camera_' + machineName(c_id));
      }
      disableEnableButton('apply_footer_btn', false);
    }, 800);
  }
}

function move_videos() {
   var existing_elements = $('.current_vid');
   var video_pairs = [];
   for(var y=0; y<existing_elements.length; y++) {
     let mName = existing_elements[y].id.replace('location_', 'camera_');
     let mShortName = existing_elements[y].id.replace('location_', '');
     let videoBox = document.getElementById(mShortName);
     var videoStream = null;
     if (videoBox) {
       videoStream = videoBox.srcObject;
       existing_elements[y].classList = 'vid_box';
     }
     var old_video = document.getElementById('location_' + mShortName);
     if (old_video) {
       $('location_'+mShortName).empty();
       old_video.innerHTML = '';
       old_video.id = "";
     }
     if (videoBox && videoStream){
       video_pairs[mName] = videoStream;
       //assignVideoToBox(mName, videoStream, true);
     }
   }
   Object.keys(video_pairs).forEach(function(key, index) {
     assignVideoToBox(key,this[key], true);
   }, video_pairs);
}

function updateMoverWithNewInfo(machine_name){
  if (document.getElementById('mover_'+machine_name)) {
    const realMachineName = machineName(machine_name);
    //var el_risk_words = document.getElementById('risk_words_' + machine_name);

    var el = document.getElementById('ep_priority_'+realMachineName);
    var this_priority = el ? el.value : '1';

    var risk_type = '';
    el = document.getElementById('ep_profile_check_'+realMachineName);
    if (el && el.checked) {
      risk_type = document.getElementById('ep_profile_' + realMachineName).value || '';
    }

   //  if (this_priority == '2') {
   //    if (risk_type != '') {
   //      risk_type = "<font color='white'>"+risk_type+"</font>";
   //    }
   //   }
   //
   //  if (this_priority == '3') {
   //    if (risk_type != '') {
   //      risk_type = "<font color='white'>"+risk_type+"</font>";
   //    }
   // }

    //el_risk_words.innerHTML = risk_type;

    //var el_center_words = document.getElementById('center_words_' + machine_name);
    var use_notes = document.getElementById('ep_notes_check_' + realMachineName);
    el = document.getElementById('ep_notes_' + realMachineName);
    var notes = (el && el.value) || '';
    if (use_notes && use_notes.checked) {
      if ($('#notes_pad_' + machine_name).hasClass('hidden')) {
        $('#notes_pad_' + machine_name).removeClass('hidden');
      }
    }
    else {
      if (!($('#notes_pad_' + machine_name).hasClass('hidden'))) {
        $('#notes_pad_' + machine_name).addClass('hidden');
      }
    }

    if (!($('#notes_div_' + machine_name).hasClass('hidden'))) {
      $('#notes_div_' + machine_name).addClass('hidden')
    }

    if (notes == "") {
      $('#notes_pad_' + machine_name).addClass('hidden')
    }


    //el_center_words.innerHTML = notes;
    el = document.getElementById('notes_text_' + machine_name);
    if (el) {
      el.innerHTML = notes;
    }

    var dot_class = '';
    if (risk_type != "") {
      if (this_priority == '1') { dot_class = 'low'; }
      if (this_priority == '2') { dot_class = 'medium'; }
      if (this_priority == '3') { dot_class = 'high'; }
    }
    var patient_name = '';
    el = document.getElementById('ep_bed_name_check_' + realMachineName);
    if (el && el.checked) {
      patient_name = document.getElementById('ep_bed_name_' + realMachineName).value || 'Bed name';
      patient_name += ' / ';
    }
    el = document.getElementById('ep_name_check_' + realMachineName);
    if (el && el.checked) {
      patient_name += document.getElementById('ep_name_' + realMachineName).value || 'Patient';
      patient_name += ' / ';
    }
    var el_mover = document.getElementById('room_' + machine_name);
    if (risk_type == "") {
      el_mover.innerHTML =  ("<span class='dot " + dot_class + " '></span><span>"
        + patient_name
        + (document.getElementById('ep_room_name_' + realMachineName).innerHTML || 'Patient')
        + "</span>");
    } else {
      el_mover.innerHTML =  ("<span class='dot " + dot_class + " '></span><span>"
        + patient_name
        + risk_type + " / "
        + (document.getElementById('ep_room_name_' + realMachineName).innerHTML || 'Patient')
        + "</span>");
    }
    el_mover.title = el_mover.children[1].innerText;

    // redraw the big one as well
    if (!machine_name.startsWith('big_')) {
      updateMoverWithNewInfo('big_' + machine_name);

      var detailsChanged = compareMoverDetails(machine_name);
      detailsChanged["admin_id"] = document.getElementById('current_admin_id').innerHTML;
      detailsChanged["machine_name"] = machine_name;
      $.ajax({
        url: "/observation/update_room_observation",
        method: "POST",
        data: detailsChanged,
        dataType: "JSON",
        success: function (data) {
        },
        error: function (data) {
        }
      });

      // Store mover_data
      document.getElementById('mover_data_' + machine_name).innerHTML = JSON.stringify(getMoverDetails(machine_name));
    }
  }
}

function compareMoverDetails(machine_name) {
  var updatedDetails = "";
  var updateDetailsJson = {};

  var currentDetails = getMoverDetails(machine_name);
  var oldDetails = JSON.parse(document.getElementById('mover_data_' + machine_name).innerHTML);

  for (var key in currentDetails) {
    if (oldDetails.hasOwnProperty(key)) {
      if (currentDetails[key] != oldDetails[key]) {
       updatedDetails = updatedDetails + key + ": " + currentDetails[key] + ", ";
       updateDetailsJson[key] = currentDetails[key];
      }
    }
  }
  if (updatedDetails != "") {
    updatedDetails = updatedDetails.substring(0, updatedDetails.length - 2);
  }
  return updateDetailsJson;
}

function go_esitter_home(){
  // DO NOT use this for first call to go to home position when first calling into a room
  // To do that use 'esitter_base'
  var obj = new Object;
  obj = {bookmark: 'esitter_home'}; // this will default to home if bookmark doesn't exist
  send_command_by_machine_name(activeMachineName(), 'go_to_bookmark', obj);
}

function turn_on_esitter(machine_name, send_home) {

  var this_admin = document.getElementById('current_admin').innerHTML;

  console.log('...linking ' + machine_name);

  var motionDetect = document.getElementById('ep_motion_detect_check_'+machine_name);

  if (motionDetect && motionDetect.checked) {
    if (document.getElementById('ep_motion_detect_'+machine_name).value == 'Calibrate') {
      console.log('linking for calibrate');
      streaming.directLink('camera_' + machine_name , this_admin, {calibrateMotion: true});
    }
    else {
      console.log('linking for motion');
      streaming.directLink('camera_' + machine_name , this_admin, {calibrateMotion: false});
      streaming.monitorMotion('camera_' + machine_name , this_admin);
    }
  }
  else {
    console.log('standard linking');
    streaming.directLink('camera_' + machine_name , this_admin, {calibrateMotion: false});
  }

  //if (send_home) {  - now handled by patient unit
    var obj = new Object;
    obj = {bookmark: 'esitter_base'}; // this will default to home if bookmark doesn't exist
    send_command_by_machine_name(machine_name, 'go_to_bookmark', obj);
  //}
}

function transfer_esitter(machine_name) {
  transferObserverSession(admin_id, machine_name);
}

function turn_off_esitter(machine_name, hangup) {
  console.log('...unlinking ' + machine_name);
  var this_admin = document.getElementById('current_admin').innerHTML;
  var mDetect = document.getElementById('motion_'+machine_name);
  if (mDetect) {  // if not that video has never come through so wasn't linked
    var motionDetect = mDetect.innerHTML;
    if (motionDetect != 'none') {
      if (motionDetect == 'Calibrate') {
        console.log('ending calibration');
        streaming.directUnlink('camera_' + machine_name , this_admin, {calibrateMotion: true});
      }
      else {
        console.log('ending motion detect');
        streaming.unmonitorMotion('camera_' + machine_name , this_admin);
        streaming.directUnlink('camera_' + machine_name , this_admin, {calibrateMotion: false});
      }
    }
    else {
      console.log('ending link only');
      streaming.directUnlink('camera_' + machine_name , this_admin, {calibrateMotion: false});
    }
  }

  var obj = new Object;
  obj = {}
  if (hangup) {
    endRoomObservation(admin_id, machine_name);
    var obj = new Object;
    obj = {esitter: 'yes'};
    send_command_by_machine_name(machine_name, 'stop_play_alert', obj);
    send_command_by_machine_name(machine_name, 'end_observer');
  }

  remoteVideo.delete('camera_' + machine_name);

  // remove video if necessary
  var old_video = document.getElementById('location_' + machine_name);
  if (old_video) {
    $('location_'+machine_name).empty();
    old_video.innerHTML = '';
    old_video.id = "location_";

    var bigVideo = document.getElementById('location_big_' + machine_name);
    if (bigVideo) {
      $('location_big_' + machine_name).empty();
      bigVideo.innerHTML = '';
      bigVideo.id = '';
    }
   }
}

/*funciton checkForMotionChange(){
  var motionDetect = document.getElementById('ep_motion_detect_check_'+machine_name);
  if (motionDetect && motionDetect.checked) {
    m_p.innerHTML = document.getElementById('ep_motion_detect_'+machine_name).value;
  }

  var motionDetect = document.getElementById('motion_'+machine_name).innerHTML;
  if (motionDetect != 'none') {
    if (motionDetect == 'calibrate') {
      console.log('ending calibration');
      streaming.directUnlink('camera_' + machine_name , this_admin, {calibrateMotion: true});
    }
    else {
      console.log('ending motion detect');
      streaming.unmonitorMotion('camera_' + machine_name , this_admin);
      streaming.directUnlink('camera_' + machine_name , this_admin, {calibrateMotion: false});
    }
  }
  else {
    console.log('ending link only');
    streaming.directUnlink('camera_' + machine_name , this_admin, {calibrateMotion: false});
  }
}*/


/* Camera controls */
function pan(dir) {
  var obj = new Object;
  obj = {dir: dir};
  send_command_by_machine_name(activeMachineName(), 'pan', obj);
}

function zoom(dir) {
  var obj = new Object;
  obj = {dir: dir};
  send_command_by_machine_name(activeMachineName(), 'zoom', obj);
}

function pan_stop() {
  send_command_by_machine_name(activeMachineName(), 'stop', null);
}

function goToPoint(event, toZoom) {
  var x = event.offsetX;
  var y = event.offsetY;

  runAnime(event, toZoom);

  const frameInfo = event.target.getBoundingClientRect();
  const headerHeight = $('#info_div_' + activeMachineName()).height();
  y -= (1.0 * headerHeight);

  var xOrigin = ((frameInfo.width - 1) / 2) / 1.7;
  var yOrigin = ((frameInfo.height - 1 - headerHeight) / 2) / 1.7;
  x = (x + 1 - xOrigin) / xOrigin;
  y = (yOrigin - y) / xOrigin;

  sendGoToPoint(x, y, toZoom);
}

function sendGoToPoint(x, y, zoom) {
  var obj = { x_val: x, y_val: y, zoom_val: '' + !!zoom.valueOf() };
  send_command_by_machine_name(activeMachineName(), 'go_to_point', obj);
}

function setLongClick(elem) {
  var pressTimer;

  const mouseUpHandler = (e) => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = 0;
    } else {
      send_command_by_machine_name(activeMachineName(), 'zoom', { dir: "stop" });
    }

    window.removeEventListener('mouseup', mouseUpHandler);
    return false;
  };

  elem.onmousedown = (e) => {
    pressTimer = window.setTimeout(function() {
      if (e.button < 1) {
        goToPoint(e, true);
      } else {
        runAnime(e, true, true);
        zoom('wide');
      }
      pressTimer = 0;
    }, 1000);

    window.addEventListener('mouseup', mouseUpHandler);

    return false;
  };
}

function resetAnime() {
  var anime =  document.getElementById("observer_zoom");
  if (anime) {
    anime.style.visibility = 'hidden';
    anime.style.left = "0px";
    anime.style.top = "-100px";
  }
  var anime2 =  document.getElementById("observer_double_tap");
  if (anime2) {
    anime2.style.visibility = 'hidden';
    anime2.style.left = "0px";
    anime2.style.top = "-100px";
  }
}

function runAnime(event, zoom, zoomOut) {
  var x = event.pageX;
  var y = event.pageY;

  var anime =  document.getElementById(zoom ? "observer_zoom" : "observer_double_tap");
  if (anime) {
    anime.style.display = 'block';
    anime.style.visibility = 'visible';
    anime.style.left = x + "px";
    anime.style.top = y  + "px";
  }
  setTimeout(function () {resetAnime();}, 1000);
}

function send_command_by_machine_name(machine_name, command, params_p) {
  var obj = new Object();
  obj.machine_name = machine_name
  obj.command = command
  obj.params_p = params_p
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"endpoint/send_command_by_machine_name",
     method: "POST",
     data: jsonString,
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(data) {
       console.log('successfully sent by machine name ' + machine_name + ' ' + command);
     }
  });
}

function machineName(elem_id) {
  return elem_id
      .replace('big_', '')
      .replace('camera_', '')
      .replace('location_', '')
      .replace('mover_', '')
      .replace('room_', '')
      .replace('checkbox_', '')
      .replace('info_div_', '')
      .replace('mic_', '')
      .replace('cam_', '')
      .replace('sound_', '')
      .replace('patient_', '')
      .replace('r_name_', '');
}

/**
 * Setups the title of the video box and the
 * @param machine_name
 * @param titleOnly
 */
function create_mover(machine_name, showControls) {
  const m_div = document.createElement('div');
  const mover = document.createElement('div');
  const current_mover_data = document.createElement('p');

  m_div.classList.add('mover');
  m_div.id = 'mover_' + machine_name;
  mover.id = 'room_' + machine_name;
  mover.classList.add('info');
  current_mover_data.id = 'mover_data_' + machine_name;
  current_mover_data.classList.add('hidden')
  //mover.classList.add('backClear');

  m_div.onclick = function() { selectThisVideo('camera_' + machine_name);}
  // style lower bar
  const info_div = document.createElement('div');
  info_div.classList.add('info_div');
  info_div.classList.add('buttons');
  if (!showControls) {
    info_div.classList.add('hidden');
  }
  info_div.id = 'info_div_' + machine_name;
  info_div.ondblclick = function() { setBigVideo(machine_name, true); };
  const info_contents = document.createElement('div');
  info_contents.classList.add('info_contents');
  info_div.appendChild(info_contents);

  const info_div_dial = info_div.cloneNode(true);
  info_div_dial.id = 'info_div_dial_' + machine_name;
  info_div_dial.classList.add('hidden');
  const info_contents_dial = info_div_dial.firstChild;

  //const risk_div = document.createElement('div');
  //risk_div.classList.add('info_div');
  //risk_div.classList.add('risk_div');
  //const risk_words = document.createElement('p');
  //risk_words.id = 'risk_words_' + machine_name;
  //risk_words.classList.add('leftside');

  var this_priority = '';
  const realMachineName = machineName(machine_name);
  if (document.getElementById('ep_priority_'+realMachineName)) {
    this_priority = document.getElementById('ep_priority_'+realMachineName).value || ''; }

  var risk_type = '';

  if (document.getElementById('ep_profile_check_'+realMachineName)) {
    if (document.getElementById('ep_profile_check_'+realMachineName).checked) {
      risk_type = document.getElementById('ep_profile_' + realMachineName).value || '';
    }
  }

  // if (this_priority == '2') {
  //   if (risk_type != '') {
  //     risk_type = "<font color='white'>" +risk_type+"</font>";
  //   }
  // }
  //
  // if (this_priority == '3') {
  //   if (risk_type != '') {
  //     risk_type = "<font color='white'>"+risk_type+"</font>";
  //   }
  // }

  //risk_words.innerHTML = risk_type;
  //risk_div.appendChild(risk_words);

  // CENTER DIV ?
  // const center_div = document.createElement('div');
  // center_div.classList.add('center_div');
  // const center_info = document.createElement('div');
  // center_info.classList.add('center');
  // center_info.classList.add('center_info');
  // const center_words = document.createElement('p');
  // center_words.id = 'center_words_' + machine_name;
  // center_words.classList.add('backClear');
  // center_words.classList.add('centerWords');
  var use_notes = document.getElementById('ep_notes_check_' + realMachineName);
  var notes = '';
  if (use_notes && use_notes.checked) {
    notes = document.getElementById('ep_notes_' + realMachineName).value || '';
  }
  // center_words.innerHTML = notes;
  // center_info.appendChild(center_words);
  // center_div.appendChild(center_info);

  // links
  // refresh camera
  const refreshCamera = document.createElement('a');
  refreshCamera.title = 'Refresh Camera';
  refreshCamera.id = "sync_" + machine_name;
  info_contents.appendChild(refreshCamera);
  refreshCamera.classList.add('mover-button');
  refreshCamera.classList.add('refresh');
  refreshCamera.appendChild(document.createElement('img'));
  refreshCamera.onclick= function() {
    sendRefreshCamera(machineName(machine_name));
  };
  if (machine_name.startsWith('big_')) {
    // check if the refresh button is currently disabled for this machine
    const origMachineBtn = document.getElementById('sync_' + machineName(machine_name));
    if (origMachineBtn && origMachineBtn.classList.contains('disabled')) {
      refreshCamera.classList.add('disabled');
      refreshCamera.onclick = function() {};
    }
  }

  // links
  // BOOKMARK
  const notes_pad = document.createElement('a');
  notes_pad.title = 'Notes';
  notes_pad.id = "notes_pad_" + machine_name;
  info_contents.appendChild(notes_pad);
  notes_pad.classList.add('mover-button');
  notes_pad.classList.add('notes');
  notes_pad.appendChild(document.createElement('img'));
  notes_pad.onclick= function() {
    open_close_notes_popup('notes_div_' + machine_name);
  };

  //bookmark.onclick= function() {
  //  var obj = new Object;
  //  obj = {b_name: 'esitter_base'};
  //  send_command_by_machine_name(machine_name, 'set_as_bookmark', obj);
  //  swal({ title: "Home Position", text: "Home position has been set", type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false});
  //};

  // POPOUT
  const popout = document.createElement('a');
  popout.title = 'Call';
  popout.classList.add('mover-button');
  popout.classList.add('call');
  const dialBtn = document.createElement('img');
  popout.appendChild(dialBtn);
  popout.classList.add('dial_' + realMachineName);
  if (dialedMachines[realMachineName]) {
    popout.classList.add('icon_green');
  }
  const onclickFunc = function() {
    if (machine_name !== realMachineName) {
      setBigVideo(machine_name, true);
    }
    if (dialedMachines[realMachineName]) {
      dialedMachines[realMachineName].focus();
    } else {
      dialRoom(machine_name);
    }
  };
  popout.onclick = onclickFunc;
  const popout_dial = popout.cloneNode(false);
  popout_dial.classList.add('icon_green');
  popout_dial.classList.add('nonselected');
  if (!dialedMachines[realMachineName]) {
    popout_dial.classList.add('invisible');
  }
  popout_dial.onclick = onclickFunc;
  info_contents.appendChild(popout);
  info_contents_dial.appendChild(popout_dial);

  // BOOKMARK
  //const bookmark = document.createElement('a');
  //info_contents.appendChild(bookmark);
  //bookmark.href = "#";
  //const thumbtack = document.createElement('i');
  //thumbtack.classList.add('fas');
  //thumbtack.classList.add('fa-2x');
  //thumbtack.classList.add('fa-thumbtack');
  //thumbtack.classList.add('left_buffer');
  //bookmark.appendChild(thumbtack);
  //bookmark.onclick= function() {
  //  var obj = new Object;
  //  obj = {b_name: 'esitter_base'};
  //  send_command_by_machine_name(machine_name, 'set_as_bookmark', obj);
  //  swal({ title: "Home Position", text: "Home position has been set", type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false});
  //};

  // ALERT
  //const alert_a = document.createElement('a');
  //info_contents.appendChild(alert_a);
  //alert_a.href = "#";
  //const alert_ = document.createElement('i');
  //alert_.classList.add('fas');
  //alert_.classList.add('fa-2x');
  //alert_.classList.add('fa-exclamation-triangle');
  //alert_.classList.add('header_alert');
  //alert_.classList.add('left_buffer');
  //alert_a.appendChild(alert_);
  //alert_a.onclick= function() {
  //  sendAlert();
  //};

  // MENU
  //const menu_a = document.createElement('a');
  //info_contents.appendChild(menu_a);
  //menu_a.href = "#";
  //const menu = document.createElement('i');
  //menu.classList.add('fas');
  //menu.classList.add('fa-2x');
  //menu.classList.add('fa-cog');
  //menu.classList.add('left_buffer');
  //menu_a.appendChild(menu);
  //menu_a.onclick= function() {
  //   showSettings();
  //};

  /*const sound = document.createElement('a');
  info_contents.appendChild(sound);
  sound.href = "#";
  const ear = document.createElement('i');
  ear.classList.add('fa');
  ear.classList.add('fa-2x');
  ear.classList.add('fa-volume-up');
  ear.classList.add('left_buffer');
  ear.id = 'sound_'+machine_name;
  sound.appendChild(ear);
  sound.onclick= function() {
    if( $("#" + machine_name).prop('muted') ) {
      $("#" + machine_name).prop('muted', false);
      $("#sound_"+machine_name).addClass('icon_green');
    }
    else {
      $("#" + machine_name).prop('muted', true);
      $("#sound_"+machine_name).removeClass('icon_green');
    }
  }

  const speak = document.createElement('a');
  info_contents.appendChild(speak);
  speak.href = "#";
  const mic = document.createElement('i');
  mic.classList.add('fa');
  mic.classList.add('fa-2x');
  mic.classList.add('fa-microphone');
  mic.classList.add('left_buffer');
  mic.id = 'mic_'+machine_name;
  speak.appendChild(mic);
  speak.onclick= function() {
    if ($('#mic_alert').hasClass('hidden')) { //mic is not on
      $('#mic_alert').removeClass('hidden');
    }
    else {
      $('#mic_alert').addClass('hidden');
    }
  }

  const start_video = document.createElement('a');
  info_contents.appendChild(start_video);
  start_video.href = "#";
  const cam = document.createElement('i');
  cam.classList.add('fa');
  cam.classList.add('fa-2x');
  cam.classList.add('fa-video-camera');
  cam.classList.add('left_buffer');
  cam.id = 'cam_'+machine_name;
  start_video.appendChild(cam);
  start_video.onclick= function() {
    if ($('#vid_alert').hasClass('hidden')) { //vid is not on
      $('#vid_alert').removeClass('hidden');
    }
    else {
      $('#vid_alert').addClass('hidden');
    }
  }
  */

  var dot_class = '';
  if (risk_type) {
    if (this_priority == '1') { dot_class = 'low'; }
    if (this_priority == '2') { dot_class = 'medium'; }
    if (this_priority == '3') { dot_class = 'high'; }
  }

  var patient_name = '';
  if (document.getElementById('ep_bed_name_check_' + realMachineName)){
    if (document.getElementById('ep_bed_name_check_' + realMachineName).checked) {
      patient_name = document.getElementById('ep_bed_name_' + realMachineName).value || 'Bed name';
      patient_name = patient_name + ' / ';
    }
  }
  if (document.getElementById('ep_name_check_' + realMachineName)){
    if (document.getElementById('ep_name_check_' + realMachineName).checked) {
      patient_name += document.getElementById('ep_name_' + realMachineName).value || 'Patient';
      patient_name += ' / ';
    }
  }

  var rn = '';
  if (document.getElementById('ep_room_name_' + realMachineName)) {
    rn = document.getElementById('ep_room_name_' + realMachineName).innerHTML;
  }

  if (!risk_type) {
    mover.innerHTML = ("<span class='dot " + dot_class + " '></span><span>" + patient_name + (rn || 'Patient') + "</span>");
  }
  else {
    mover.innerHTML =  ("<span class='dot " + dot_class + " '></span><span>"+ patient_name + risk_type + " / " + (rn || 'Patient') +"</span>");
  }
  mover.title = mover.children[1].innerText;
  mover.ondblclick = function() { setBigVideo(machine_name, true); };

 //Notes
  const notes_div = document.createElement('div');
  notes_div.classList.add('hidden');

  //const notes_title = document.createElement('span');
  //notes_title.classList.add('center');
  //notes_title.innerHTML = patient_name;

  notes_div.classList.add('note_pad_display');

  const notes_text = document.createElement('p');
  const notes_br = document.createElement('br');

  const notes_title = document.createElement('span');

  notes_title.innerHTML = "Notes : ";

  notes_text.innerHTML = notes;
  const notes_caret = document.createElement('i');

  notes_caret.classList.add('fa');
  notes_caret.classList.add('fa-caret-up');
  notes_caret.classList.add('fa-2x');

  //const notes_mover = document.createElement('i');
  //notes_mover.classList.add('fa');
  //notes_mover.classList.add('fa-arrows');
  //notes_mover.classList.add('fa-2x');
  //notes_mover.classList.add('hud_visuals');
  //notes_mover.classList.add('fade');
  //notes_mover.classList.add('leftside');

  //const notes_close = document.createElement('i');
  //notes_close.classList.add('fa');
  //notes_close.classList.add('fa-times-circle');
  //notes_close.classList.add('fa-2x');
  //notes_close.classList.add('close_widget');
  //notes_close.classList.add('hud_visuals');
  //notes_close.classList.add('fade');
  //notes_close.classList.add('rightside');
  //notes_close.onclick= function() {
  //  close_notes_popup('notes_div' + machine_name );
  //};

  notes_div.id = 'notes_div_' + machine_name;
  notes_text.id = 'notes_text_' + machine_name;

  notes_div.appendChild(notes_title);
  //notes_div.appendChild(notes_mover);
  //notes_div.appendChild(notes_close);
  notes_div.appendChild(notes_br);
  notes_div.appendChild(notes_text);
  notes_div.appendChild(notes_caret);

  //document.body.appendChild(notes_div);
  info_div.appendChild(notes_div);

  if (notes == "") {
    notes_pad.classList.add('hidden');
  }

  // Store mover_data
  current_mover_data.innerHTML = JSON.stringify(getMoverDetails(machine_name));
  m_div.appendChild(current_mover_data);

  m_div.addEventListener('mouseover', () => hoverMover('camera_'+machine_name));
  m_div.addEventListener('mouseleave', () => hoverMoverRemover('camera_'+ machine_name));

  m_div.appendChild(mover);
  m_div.appendChild(info_div_dial);
  m_div.appendChild(info_div);

  //m_div.appendChild(center_div);
  //m_div.appendChild(risk_div);
  m_div.id = 'mover_' + machine_name;
  document.body.appendChild(m_div);
}

function getMoverDetails(machine_name) {
  machine_name = machineName(machine_name);

  var el = document.getElementById('ep_priority_'+machine_name);
  var risk_priority_raw = el && el.value;
  el = document.getElementById('ep_profile_' + machine_name);
  var risk_type = (el && el.value) || '';
  var risk_priority;
  if (risk_priority_raw == '1') { risk_priority = 'Normal' }
  else if (risk_priority_raw == '2' ) { risk_priority = 'Medium' }
  else if (risk_priority_raw == '3' ) { risk_priority = 'High' }
  el = document.getElementById('ep_notes_' + machine_name);
  var notes = (el && el.value) || '';
  el = document.getElementById('ep_name_' + machine_name);
  var patient_name = (el && el.value) || 'Patient';
  el = document.getElementById('ep_send_text_' + machine_name);
  var patient_contact_number = (el && el.value) || '';
  var moverDetails = {
    "risk_priority": risk_priority, "risk_type": risk_type, "notes": notes,
    "patient_name": patient_name, "patient_contact_number": patient_contact_number
  }

  return moverDetails;
}

function hideCamera() {
  //$('#camera_controls').animate({bottom: '-120px'}, 25, function(){});
  // $('#camera_joystick').animate({bottom: '-120px'}, 25, function(){});
  //if (!$('#mic_alert').hasClass('hidden')) { $('#mic_alert').addClass('hidden') }
  //if (!$('#vid_alert').hasClass('hidden')) { $('#vid_alert').addClass('hidden') }
}
function showCamera() {
  //$('#camera_controls').animate({bottom: '0'}, 25, function(){});
  //$('#camera_joystick').animate({bottom: '0'}, 25, function(){});
}

function dialRoom(machine_name) {
  var obj = new Object();
  obj.machine_name = machineName(machine_name);
  obj.admin_id = document.getElementById('current_admin_id').innerHTML;
  var jsonString = JSON.stringify(obj);
  $.ajax({
    url:"../endpoint/get_endpoint_details",
    method: "POST",
    data: jsonString,
    dataType: "JSON",
    format: 'js',
    contentType: "application/json",
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    success: function(rdata) {
      var api_username = rdata.api_username;
      var e_string = rdata.e_string;
      var url_string = 'https://'+document.getElementById('server_name').innerHTML+'/api/encrypted_call?hl=true&api_username='+api_username+'&data='+e_string;
      openDialRoomPopup(url_string, obj.machine_name);
      $.ajax({
        url:"/observation/start_observation_activity",
        method: "POST",
        data: {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'VideoCall'},
        dataType: "JSON",
        success: function(rdata) {
          //$.ajax({
          //   url:"../observation/end_observation_activity",
          //   method: "POST",
          //   data:  {current_admin_id: document.getElementById('current_admin_id').innerHTML, machine_name: activeMachineName(), a_type: 'VideoCall' },
          //   dataType: "JSON",
          //   success: function(rdata) {}
          //});
        }
      });
    }
  });
}

function setUpRemoveMachinePopupsInterval() {
  if (dialedMachines && !dialedMachines.interval) {
    dialedMachines.interval = setInterval(function() {
      let machineNames = Object.keys(dialedMachines);
      machineNames.forEach(function(machineName) {
        if (machineName !== 'interval' && (!dialedMachines[machineName] || dialedMachines[machineName].closed)) {
          console.log('[temp] setUpRemoveMachinePopupsInterval delete', machineName);
          delete dialedMachines[machineName];

          const btns = document.querySelectorAll('.dial_' + machineName);
          btns.forEach(function (btn) {
            if (btn.classList.contains('nonselected')) {
              btn.classList.add('invisible');
            } else {
              btn.classList.remove('icon_green');
            }
          });
        }
      });
      machineNames = Object.keys(dialedMachines);
      if (machineNames.length <= 1) {
        console.log('[temp] setUpRemoveMachinePopupsInterval clean up');
        clearInterval(dialedMachines.interval);
        dialedMachines.interval = null;
      }
    }, 2000);
  }
}

function openDialRoomPopup(url, machineName) {
  const elem = document.querySelector('.vid_box.default_vid_box');
  if (elem) {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();
    const offset = elemRect.left - bodyRect.top;
    const windowToOpen = window.open(url, 'iObserver','left='+ offset +',width=' + elemRect.width + ',height=600');
    setUpRemoveMachinePopupsInterval();

    dialedMachines[machineName] = windowToOpen;
  } else {
    window.open(url, 'iObserver','width=1000');
  }

  const btns = document.querySelectorAll('.dial_' + machineName);
  btns.forEach(function (btn) {
    if (btn.classList.contains('nonselected')) {
      btn.classList.remove('invisible');
    } else {
      btn.classList.add('icon_green');
    }
  });
}

function textRoom(t_number, machine_name) {
  var obj = new Object();
  obj.machine_name = machine_name;
  obj.t_number = t_number;
  obj.admin_id = document.getElementById('current_admin_id').innerHTML
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"../endpoint/text_endpoint_invite",
     method: "POST",
     data: jsonString,
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },
     success: function(rdata) {
     }
  });
}

// On window load calls:
window.addEventListener("resize", function(){ reposition_movers();}, true);

function toggleFullScreen() {
  console.log('toggling full screen');
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
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


function activateButtons(both) {
  $("#location_" + activeMachineName()).addClass('talk_listen_frame');
  if (both) {
    $(".talk_button").addClass('ob_button_green');
  }
  else {
    $(".listen_button").addClass('ob_button_green');
  }
}

function deactivateButtons(both) {
  if (!listen_is_on) {
    $("#location_" + activeMachineName()).removeClass('talk_listen_frame');
  }
  if (both) {
    $(".talk_button").removeClass('ob_button_green');
  }
  else {
    $(".listen_button").removeClass('ob_button_green');
  }
}

function deactivateBothButtons(amn) {
  $("#location_" + amn).removeClass('talk_listen_frame');
  $(".talk_button").removeClass('ob_button_green');
  $(".listen_button").removeClass('ob_button_green');
  call_in_place = false;
  listen_is_on = false;
}


function endCall(machineName){
  var machine_name = activeMachineName();
  deactivateButtons(true);
  streaming.endCall(machine_name);
}

function hoverMover(mediaId) {
  $('#mover_' + machineName(mediaId)).addClass('moverHover');
  //$('#room_' + machineName(mediaId)).removeClass('backClear');
}

function hoverMoverRemover(mediaId) {
  if (!$('#location_' + machineName(mediaId)).hasClass('vid_selected')){
    $('#mover_' + machineName(mediaId)).removeClass('moverHover');
    //$('#room_' + machineName(mediaId)).addClass('backClear');
  }
}

function open_settings_box(open){
    if (open) {
      muteAllCalls();
      $('#settings_pop_up').removeClass("hidden");
      document.getElementById('settings_pop_up').style.display = "block";
    }
    else {
      $('#settings_pop_up').addClass("hidden");
      document.getElementById('settings_pop_up').style.display = "none";
    }
}

function position_mover(machine_name) {
  if(machine_name.length > 0) {
    if (document.getElementById('location_' + machine_name)) {
      var mover_width = document.getElementById('mover_' + machine_name).offsetWidth;
      var div_width = document.getElementById('location_' + machine_name).offsetWidth;
      var variable_diff = (div_width - mover_width) / 2;
      var div_top = $('#location_' + machine_name).offset().top ;
      var div_left = $('#location_' + machine_name).offset().left;
      $("#mover_" + machine_name).css({'top': div_top , 'left':div_left, 'width':div_width - 2 });
    }
  }
}

function reposition_movers() {
  var movers = document.getElementsByClassName('mover');
  for (var i = 0; i<movers.length; i++) {
    const machine_name = machineName(movers[i].id);
    position_mover(machine_name);

    if (document.getElementById('mover_big_' + machine_name) != null) {
      position_mover('big_' + machine_name);
    }
  }
}

function update_static_mover(hide) {
  const movers = document.getElementsByClassName('static-video');
  for (let i = 0; i < movers.length; i++) {
    if (hide) {
      movers[i].classList.add('hidden');
    } else {
      movers[i].classList.remove('hidden');
    }
  }
}

function muteAllCalls(){
  if (call_in_place){
    talkToRoom();
  }
  else if (listen_is_on){
    turnOnSound();
  }
  else {
    console.log('mute - active machine is: ' + activeMachineName());
    var layout_div = document.getElementById(getSelectedLayout());
    var boxes = layout_div.getElementsByClassName('vid_box');
    for (var i=0; i<boxes.length; i++) {
      if (document.getElementById(machineName(boxes[i].id))) {
        if( !document.getElementById(machineName(boxes[i].id)).muted) {
          streaming.endCall("camera_" + machineName(boxes[i].id));
        }
        document.getElementById(machineName(boxes[i].id)).muted = true;
        deactivateBothButtons(machineName(boxes[i].id));  // this sets call & sound to false
      }
    }
  }
}

function endAllCalls(old_layout){
  var layout_div = document.getElementById(old_layout);
  var boxes = layout_div.getElementsByClassName('vid_box');
  for (var i=0; i<boxes.length; i++) {
    if (document.getElementById(machineName(boxes[i].id))) {
      if( !document.getElementById(machineName(boxes[i].id)).muted) {
        streaming.endCall("camera_" + machineName(boxes[i].id));
      }
      document.getElementById(machineName(boxes[i].id)).muted = true;
      deactivateBothButtons(machineName(boxes[i].id));  // this sets call & sound to false
    }
   $(boxes[i].id).empty();
   boxes[i].innerHTML = '';
   boxes[i].id = "";
   $('#mover_'+boxes[i].id).remove();
  }
  var old_videos = document.getElementsByClassName('ob_video');
   for(var i=old_videos.length-1; i>=0; i--) {
     console.log('clearing ' + old_videos[i].id);
     remoteVideo.delete('camera_' + old_videos[i].id);
   }
}

function clearSelected() {
  var layout_div = document.getElementById(getSelectedLayout());
  var boxes = layout_div.getElementsByClassName('vid_box');
  for (var i=0; i<boxes.length; i++) {
    boxes[i].classList.remove('vid_selected')
    boxes[i].classList.remove('motion_detection')
    //if (! $('#info_div_'+machineName(boxes[i].id)).hasClass('hidden')) {
    //  $('#info_div_'+machineName(boxes[i].id)).addClass('hidden');}
    //if (! $('#room_'+machineName(boxes[i].id)).hasClass('backClear')) {
    //  $('#room_'+machineName(boxes[i].id)).addClass('backClear');}
  }
  hideCamera();
}

function updateAllVideo(mediaId) {
  updateVideo(localVideoGroup, !mediaId && !tryingToListen(localVideoGroup));
  for (let [checkMediaId, videoGroup] of remoteVideo) {
    updateVideo(videoGroup, checkMediaId === mediaId && !tryingToListen(videoGroup));
  }
}

function selectVideo(mediaId, className) {
  var videos = document.getElementsByClassName('ob_video');
  for (var i=0; i < videos.length; i++) {
    if (videos[i].classList.contains(className)) { videos[i].classList.remove(className); }
    if (videos[i].id == mediaId) { videos[i].classList.add(className); }
  }
}

function selectVideoParentParent(mediaId, className) {
  var videos = document.getElementsByClassName('ob_video');
  for (var i=0; i < videos.length; i++) {
    if (videos[i].parentNode.parentNode.classList.contains(className)) { videos[i].parentNode.parentNode.classList.remove(className); }
    if (videos[i].id == mediaId) { videos[i].parentNode.parentNode.classList.add(className); }
  }
}

function startSitting() {
  var this_admin = document.getElementById('current_admin').innerHTML;
  //document.getElementById('loading').classList.remove('hidden');
  if (first_run) {
    setTimeout(function(){
      console.log('logging in ' + this_admin);
      streaming.login(this_admin).then(function(){logged_in = true; console.log('logged in turned to true');}).catch(err => console.log('USER LOGIN ERROR!!' + err));
    }, 500);
    first_run = false;
  }
  //hideSettings();
}

function toggleSelectCameraFunction(){
  if ($("#selectable_camera_function").hasClass("hidden")){
    $("#selectable_camera_function").removeClass("hidden");
    document.getElementById('selectable_camera_function').style.display = "block";
  }
  else {
    $("#selectable_camera_function").addClass("hidden");
    document.getElementById('selectable_camera_function').style.display = "none";
  }
}

function selectCameraFunction(action){
  $("#nightvision").addClass("hidden");
  document.getElementById('nightvision').style.display = "none";
  $("#pin").addClass("hidden");
  document.getElementById('pin').style.display = "none";
  $("#clone").addClass("hidden");
  document.getElementById('clone').style.display = "none";


  if (action == "nightvision") {
    $("#nightvision").removeClass("hidden");
    document.getElementById('nightvision').style.display = "block";
  }
  if (action == "pin") {
    $("#pin").removeClass("hidden");
    document.getElementById('pin').style.display = "block";
  }
  if (action == "clone") {
    $("#clone").removeClass("hidden");
    document.getElementById('clone').style.display = "block";
  }

  $("#selectable_camera_function").addClass("hidden");
  document.getElementById('selectable_camera_function').style.display = "none";
}


function create_clone() {
  dialRoom(activeMachineName());
}

function create_bookmark() {
  var obj = new Object;
  obj = {b_name: 'esitter_base'};
  send_command_by_machine_name(activeMachineName(), 'set_as_bookmark', obj);
  swal({ title: "Home Position", text: "Home position has been set", type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false});
}

function open_close_notes_popup(id) {
  var el_with_id = '#' + id;
  if ( $(el_with_id).hasClass('hidden')) {
    document.getElementById(id).style.display = 'block';
    $(el_with_id).removeClass("hidden");

  }
  else {
    document.getElementById(id).style.display = 'none';
    $(el_with_id).addClass("hidden");
  }
}

function update_note_counter(field, e_id) {
  count = field.value.length;
  document.getElementById("notes_counter_" + e_id).innerHTML = count + "/120";
}

function update_name_counter(field, e_id, bedName) {
  const count = field.value.length;

  const id = bedName ? "bed_name_counter_" + e_id : "name_counter_" + e_id;
  document.getElementById(id).innerHTML = count + "/50";
}

var first_run= true;
function toggle_settings(){
  if ($('#settings_sidebar').hasClass('hidden')) {
    $('#change_speaker_button').addClass('hidden');
    $('#change_mic_button').addClass('hidden');
    document.getElementById('change_mic_button').opacity = 0;
    //if (!rtc) {
    //  start(false);
    //}
    //else {
    //  if (first_run) {
    //    start(false);
    //  }
    //}
    $('#settings_sidebar').removeClass('hidden');
  }
  else {
    //stop();
    $('#settings_sidebar').addClass('hidden');
  }
}


function check_option_iobserver(room_names, room_machine_names) {
    $('#no_rooms').addClass('hidden');
    var endpoint_names = [];
    var endpoint_machine_names = [];

    endpoint_names = room_names.split(",");
    endpoint_machine_names = room_machine_names.split(",");

    var input_val = $("#autocomplete").val();
    $("#autocomplete").val("");

    var i;
    for (i = 0; i < endpoint_names.length; i++ ){
      if (input_val == endpoint_names[i]){
         changeObserverCheckbox(endpoint_machine_names[i]);
      }
    }
}

function init_iobserver_valid_endpoints(endpoint_dropdown){
  /* OBSOLETE
  var endpoint_names = [];
  if (endpoint_dropdown == "") {
    $( "#autocomplete" ).autocomplete({source: endpoint_names });
    $( "#autocomplete_new" ).autocomplete({source: endpoint_names });
  }
  else {
    endpoint_names = endpoint_dropdown.split(",");
    $( "#autocomplete" ).autocomplete({ minLength: 0, source: endpoint_names }).focus(function() {$(this).autocomplete("search", $(this).val());});
    $( "#autocomplete_new" ).autocomplete({ minLength: 0, source: endpoint_names }).focus(function() {$(this).autocomplete("search", $(this).val());});
  }
  */
}

function checkObsLocations() {
  if (runEndpointUpdate) {
    $.ajax({
       url:"/observation/get_obs_locations",
       dataType: "JSON",
       success: function(data) {
         locationSelect = document.getElementById("locationSelect");
         locationSelect.options.length = 0;
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Select Customer';
         locationSelect.appendChild(option);
         if (data.locations) {
           data.locations.sort((location1, location2) => location1.name.localeCompare(location2.name));

           for (var i=0; i != data.locations.length; ++i) {
             var locInfo = data.locations[i];
             var option = document.createElement('option');
             option.value = locInfo.id;
             option.text = locInfo.name;
             locationSelect.appendChild(option);
           }
         }
         if (data.locations.length == 1) {
           checkObsBuildings();
         }
       }
     });
   }
}

function checkObsBuildings(obs_data) {
  var e=  document.getElementById("locationSelect");
  var loc_id = e.options[e.selectedIndex].value;
  var selectedRooms =  returnRoomArray();
  if (obs_data) {
    selectedRooms = obs_data.endpoints;
  }
  $.ajax({
     type: "POST",
     url:"/observation/get_observer_endpoints_for_customer",
     method: "POST",
     data: {loc_id: loc_id, selected_rooms: selectedRooms, partial_only: true},
     success: function(data){
       if (obs_data){
         finishTransfer(obs_data);
       }
     },
     error: function() {
       console.log('checkObsBuildings ERROR');
     }
  });
}

function initAutocomplete() {
   $("#autocomplete").val("");
   checkObsBuildings();
   $("#autocomplete").autocomplete({
     minLength: 0,
     source: function( request, response ) {
      var e=  document.getElementById("locationSelect");
      var loc_id = e.options[e.selectedIndex].value;
      var selectedRooms =  returnRoomArray();

      console.log('running initAutocomplete for loc_id ' + loc_id);
        $.ajax({
          type: "POST",
          url:"/observation/get_observer_endpoints_for_customer",
          data: {loc_id: loc_id, selected_rooms: selectedRooms, search: request.term},
          dataType: "json",
          error: function(data) { console.log('error ' + data); },
          success:function(data){
            console.log('got data');
            console.log(data);
            if (data.list == "") {
              response([]);
            }
            else {
              endpoint_list = data.list.split(",");
              response(endpoint_list);
            }
          }
        });
    }
    ,minChars: 0})
  .focus(function () {
    $(this).autocomplete('search', $(this).val())
  });
}

function collapse_data(){
  $('#observer_data_screen').addClass('hidden');
  $('#observer_data_expand_screen_menu').addClass('hidden');
  $('#observer_data_expand_screen').removeClass('hidden');
  reposition_movers();
}

function expand_data() {
  if (selected_layout && selected_layout !== 'default_layout') {
    $('#observer_data_screen').removeClass('hidden');
  }
  $('#observer_data_expand_screen_menu').removeClass('hidden');
  $('#observer_data_expand_screen').addClass('hidden');

  reposition_movers();
}

function sendRefreshCamera(machineName){
  var mn = machineName || activeMachineName();
  var admin_id = document.getElementById('current_admin_id').innerHTML
  var mn_jq = '#sync_' + mn;
  $(mn_jq).off('hover');
  var mn_jq_big = '#sync_big_' + mn;
  if (mn_jq_big) {
    $(mn_jq_big).off('hover');
  }
  send_command_by_machine_name(mn, 'reattach_video', {});
  var thisSync = document.getElementById('sync_' + mn);
  thisSync.classList.add('disabled');
  thisSync.onclick = function() {};
  if (mn_jq_big) {
    var thisSyncBig = document.getElementById('sync_big_' + mn);
    if (thisSyncBig) {
      thisSyncBig.classList.add('disabled');
      thisSyncBig.onclick = function() {};
    }
  }
  setTimeout(function(){reactivateRefreshCamera(mn);}, 60000);

  $.ajax({
     url:"/observation/refresh_camera_observation_activity",
     method: "POST",
     data: {machine_name: mn, current_admin_id: admin_id},
     dataType: "JSON",
     format: 'js',
     success: function(data) {}
  });
}

function reactivateRefreshCamera(machine_name) {
  var thisSync = document.getElementById('sync_' + machine_name);
  var mn_jq = '#sync_' + machine_name;
  $(mn_jq).on('hover');
  var mn_jq_big = '#sync_big_' + machine_name;
  if (mn_jq_big) {
    $(mn_jq_big).off('hover');
    var thisSyncBig = document.getElementById('sync_big_' + machine_name);
    if (thisSyncBig) {
      thisSyncBig.classList.remove('disabled');
      thisSyncBig.onclick = function() { sendRefreshCamera(machine_name); };
    }

  }
  thisSync.classList.remove('disabled');
  thisSync.onclick = function() { sendRefreshCamera(machine_name); };
}
