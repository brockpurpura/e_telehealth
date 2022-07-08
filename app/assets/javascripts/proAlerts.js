// Pro Alerts - Replacement for Sweet Alerts 


function proAlert(title, type, alertMessage, buttonMessage, buttonAction, focusRedirect) { 

  if (establishPrioirty(type)) {
    clearExistingButtonFunctions();
    controlIcons(type);
    assignMessageFocus(title, alertMessage);
    controlTabbing(true);
    assignButtons(buttonAction, buttonMessage, focusRedirect);
  }
}

// Functions

function assignMessageFocus(title, alertMessage) {
  $("#pro_alert_title").text(title);
  $("#pro_alert_message").text(alertMessage);
}

function establishPrioirty(type) {
  if ($('#pro_alert_priorty').val() == "") {
    $('#pro_alert_priorty').val(type);
    return true;
  }
  else {
    if ($('#pro_alert_priorty').val() == 'error') {
      return false; // A proAlert is already up with an error. Do Nothing. 2nd errors during join call should be rendered n/a.
    }
    else{
      if (type == 'error') {
        // Show error proAlert
        $('#pro_alert_priorty').val(type);
        return true; 
      }
      else {
        // Low level proAlert, do not replace. Priority proAlert remains. 
        // Note - Info alert exists. If we need a new 3nd tier of classification((1: error, 2: warning)), we can add info*
        return false; 
      }
    }
  }
}

function clearExistingButtonFunctions() {
  var submit_button = $("#pro_alert_submit");
  var cancel_button = $("#pro_alert_cancel");

  submit_button.unbind('click');
  cancel_button.unbind('click');
  submit_button.off('click');
  cancel_button.off('click');
}

function assignButtons(buttonAction, buttonMessage, focusRedirect) {

  var submit_button = $("#pro_alert_submit");
  var cancel_button = $("#pro_alert_cancel");
  var showCancel = false;

 // Apply Actions for Buttons
 if(buttonAction == 'close') {
    submit_button.click(function() {
      closeProAlert(focusRedirect);
    });  
  }
  else if (buttonAction == "home_bookmark") {
    showCancel = true;
    cancel_button.click( function(){ 
       closeProAlert(focusRedirect);
    });
    submit_button.click(function() {
      ok_save_home_bookmark();
      confirmedProAlert('repin_home'); 
    });  
  }
  else if (buttonAction == "join_busy_call") {
    showCancel = true;
    cancel_button.click( function(){ 
      location.reload();
    });
    submit_button.click(function() {
      closeProAlert(focusRedirect);
      processCall(true);
    });
  }
  else if (buttonAction == "extend_session") {
    submit_button.click(function() {
      $.ajax("/active");
      resetSessionTimeout(true);
    });
  }
  else if (buttonAction == "pexip_handle_error") {
    submit_button.click(function() {
      //remoteDisconnect('pexipHandleError'); 
      endCall();
    });
  }
  else if (buttonAction == "continue_call") {
    submit_button.click(function() {
      if (rtc) {
        var c_user_id = document.getElementById("current_user_id").innerHTML;
        var endpoint_id =  document.getElementById('endpoint_id').innerHTML;
        obj = {endpoint_id: endpoint_id};
        send_command_by_user_id(c_user_id, 'checkForMultiCall', obj);
        runMutePatient();
        closeProAlert(focusRedirect);
      } 
      else {
        console.log('no call to continue - rtc null');
        location.reload();
      }
    });
  }
  else if (buttonAction == "handle_meeting_button") {
    submit_button.click(function() {
      //remoteDisconnect('pexipHandleError'); 
      //endCall();
      if (rtc) {
        console.log('disconnecting via pexip');
        rtc.disconnect();
        endCall();
      }
      else {console.log('no rtc');}
    });
  }
  else if (buttonAction == "end_session") {
    submit_button.click(function() {
      location.reload();
    });
  }
  else if (buttonAction == "call_disconnected") {
    submit_button.click(function() {
      sign_out_user();
    });
  }
  else if (buttonAction == "end_call") {
    showCancel = true;
    cancel_button.click( function(){ 
      closeProAlert(focusRedirect);
    });
    submit_button.click(function() {
      endCall();
    });
  }
  else {//Termination Actions
    submit_button.click(function() {
      if (window.location.pathname.includes('encrypted_call')) {
        window.close();
      }
      else {
        if (api_call || mobile_api_call || e_api_call) {
          document.location.href="/home/dial";
        }
        else {
          location.reload();
        }
      }
    });  
  }
 
  submit_button.text(buttonMessage);
  submit_button.attr('tabindex', 0);


  if(showCancel) {
    cancel_button.removeClass("hidden")
    cancel_button.attr('tabindex', 0);
  }

  $("#pro_alert_overlay").removeClass("hidden");
  $("#pro_alert_main").removeClass("hidden");

  $("#pro_alert_submit").focus();

}

function closeProAlert(focus_object) {
  clearExistingButtonFunctions();

  controlTabbing(false);
  controlIcons('reset'); 
  $("#pro_alert_overlay").addClass("hidden");
  $("#pro_alert_main").addClass("hidden");
  $('#pro_alert_priorty').val('');

  if(focus_object != false) {
    var focus_obj = $("#"+ focus_object);
    focus_obj.focus();
  }
}

function confirmedProAlert(focusRedirect) {
  closeProAlert(false);

  var title = "Saved!";
  var type = "success";
  var alertMessage = "New home location set.";
  var buttonMessage = "OK";
  var buttonAction = 'close';
  var showCancel = false;
  
  controlIcons('reset');
  
  proAlert(title, type, alertMessage, buttonMessage, buttonAction, focusRedirect);
}

function controlIcons(type) {
  if (type == "reset") {
    $("#pro_alert_icon_error").addClass("hidden"); 
    $("#pro_alert_icon_success").addClass("hidden");
    $("#pro_alert_icon_warning").addClass("hidden");
    $("#pro_alert_icon_info").addClass("hidden");
    $("#pro_alert_cancel").addClass("hidden");
  }
  else if (type == "error") { 
    $("#pro_alert_icon_error").removeClass("hidden"); 
  }
  else if (type == "success") { 
    $("#pro_alert_icon_success").removeClass("hidden");
  }
  else if (type == "warning") { 
    $("#pro_alert_icon_warning").removeClass("hidden");
  }
  else if (type == "info") { 
    $("#pro_alert_icon_info").removeClass("hidden");
  }
}


function controlTabbing(order) {    
  /* Items force hidden for keyboard traversal  */

  var a_tags = document.getElementsByTagName("A");
  var button_tags = document.getElementsByTagName("Button");
  var input_tags = document.getElementsByTagName("Input");
  var select_tags = document.getElementsByTagName("Select");
  var mover_ids = ["#move_bookmark", "#move_snapshot", "#move_alert", "#move_slider", "#move_joystick", "#move_self_view", "#move_help", "#move_content_sharing"];
  var slider_ids = ["#flat-slider-vertical-1", "#flat-slider-vertical-2", "#flat-slider-vertical-3", "#flat-slider-vertical-4", "#flat-slider-vertical-5", "#flat-slider-vertical-6", "#flat-slider-vertical-7"];
 
  var i;
  if(order) {
    for (i = 0; i < a_tags.length; i++) {
      $(a_tags[i]).attr('tabindex', -1);
    }
    for (i = 0; i < button_tags.length; i++) {
      $(button_tags[i]).attr('tabindex', -1);
    }
    for (i = 0; i < input_tags.length; i++) {
      $(input_tags[i]).attr('tabindex', -1);
    }
    for (i = 0; i < select_tags.length; i++) {
      $(select_tags[i]).attr('tabindex', -1);
    }

    for (i = 0; i < mover_ids.length; i++) {
      $(mover_ids[i]).attr('tabindex', -1);
    }
    for (i = 0; i < slider_ids.length; i++) {
      $($(slider_ids[i]).children()[1]).attr('tabindex', -1);
    }
  }
  else {
    for (i = 0; i < a_tags.length; i++) {
      $(a_tags[i]).attr('tabindex', 0);
    }
    for (i = 0; i < button_tags.length; i++) {
      $(button_tags[i]).attr('tabindex', 0);
    }
    for (i = 0; i < input_tags.length; i++) {
      $(input_tags[i]).attr('tabindex', 0);
    }
    for (i = 0; i < select_tags.length; i++) {
      $(select_tags[i]).attr('tabindex', 0);
    }

    for (i = 0; i < mover_ids.length; i++) {
      $(mover_ids[i]).attr('tabindex', 0);
    }
    for (i = 0; i < slider_ids.length; i++) {
      $($(slider_ids[i]).children()[1]).attr('tabindex', 0);
    }

    $("#double_click_me").attr('tabindex', -1);
    $("#hold_me_down").attr('tabindex', -1);
    $("#hold_me_down_backwards").attr('tabindex', -1);
  }
}
