$selected = '#ffffff';
$not_selected = '#ffffff';
$selected_opacity = '1';
$hover_opacity = '0.9';
$not_selected_opacity = '0.7';

function open_add_person(element_name) {
}
function toggle_footer() {
}

function toggle_account() {
  if ($('#account_sidebar').hasClass('hidden')) {
    $('#settings_sidebar').addClass('hidden')
    $('#favorites_sidebar').addClass('hidden')
    $('#account_sidebar').removeClass('hidden'); 
  }
}

function open_media_settings() {
  initiateMedia();
  if ($('#settings_sidebar').hasClass('hidden')) {
    $('#settings_sidebar').removeClass('hidden')
    $('#account_sidebar').addClass('hidden'); 
    $('#favorites_sidebar').addClass('hidden'); 
  }
}

function open_favorites_sidebar() {
  if ($('#favorites_sidebar').hasClass('hidden')) {
    $('#favorites_sidebar').removeClass('hidden')
    $('#account_sidebar').addClass('hidden'); 
    $('#settings_sidebar').addClass('hidden'); 
  }
}

function editFavorites() {
  var removeFavorite = $('.removeFavorite');
  var callFavorite = $('.callFavorite');
  var editFavoriteButton = $('#edit_favorite_rooms');
 
  if ($(removeFavorite[0]).hasClass('hidden')) {
    removeFavorite.each(function() {
      $(this).removeClass("hidden");
    });
    callFavorite.each(function() {
      $(this).addClass('hidden');
    });
    editFavoriteButton.attr('aria-pressed', 'true');
  }
  else {
    removeFavorite.each(function() {
      $(this).addClass("hidden");
    });
    callFavorite.each(function() {
      $(this).removeClass('hidden');
    });
    editFavoriteButton.attr('aria-pressed', 'false');
  }
}

function toggle_favorite() {
  var endpoint_id = document.getElementById("endpoint_id").innerHTML;
  var user_id = document.getElementById("endpoint_id").innerHTML;

  var favorite_inactive = $("#favorite_inactive");
  var favorite_active = $("#favorite_active");

  if (favorite_active.hasClass('hidden')) {
    favorite_inactive.addClass('hidden');
    favorite_active.removeClass('hidden');
    var url_string = "/home/update_favorite?add_favorite=true&endpoint_id=" + endpoint_id
    $.get(url_string);
    $('#toggle_favorite_button').attr("aria-pressed","true");
    show_in_call_notification("Room Saved");
  } 
  else {
    favorite_active.addClass('hidden');
    favorite_inactive.removeClass('hidden');
    var url_string = "/home/update_favorite?remove_favorite=true&endpoint_id=" + endpoint_id 
    $.get(url_string);
    $('#toggle_favorite_button').attr("aria-pressed","false");
    show_in_call_notification("Room removed from Saved");
  }
}

function dial_favorite(e_id) {
  close_c_sidebar();
  var url_string = "/fetch_conf?endpoint_id=" + e_id
  $.get(url_string);
}

function deleteFavorite(favorite_id) {
    var url_string = "/home/update_favorite?remove_favorite=true&favorite_id=" + favorite_id 
    $.get(url_string);
}

function close_c_sidebar() {
  if (!$('#settings_sidebar').hasClass('hidden')) {
    $('#settings_sidebar').addClass('hidden')
  }
  if (!$('#account_sidebar').hasClass('hidden')) {
    $('#account_sidebar').addClass('hidden'); 
  }
  if (!$('#favorites_sidebar').hasClass('hidden')) {
    $('#favorites_sidebar').addClass('hidden'); 
  } 
}

function save_account() {
  var cb_val = 1;
  var cb = document.getElementById("text_flag").checked != true;
  if (cb) { cb_val = 0; }
  $.ajax({
     url:"/endpoint/eu?t=" + $('#ut').val() + '&fn=' + $('#ufn').val() + '&ln=' + $('#uln').val() + '&dn=' + $('#udn').val() + '&text_flag=' + cb_val, 
     dataType: "JSON",
     success: function(data) {
       $('#top_dr_name').text($('#udn').val());
       $("#save_account_btn").addClass('hidden');
       show_in_call_notification("Account updated");
     }
  });
}

function openMobileSettings() {
  close_participant();
  closeChat();
  chooseToggleButton('settings');
  var msettings = document.getElementById('settings_sidebar');
  if (msettings) {
    msettings.classList.remove('hidden');
    $('#settings_sidebar').css('position','static');
  }
}

function closeMobileSettings() {
  var msettings = document.getElementById('settings_sidebar');
  if (msettings) {
    msettings.classList.add('hidden');
  }
}

function closeParticipantView() {
  var list = document.getElementById('p_list');
  list.style.opacity = 0;
  list.style.display = 'none';
  list.classList.add('hidden');
}
function openChat(){
  closeMobileSettings();
  close_participant();
  chooseToggleButton('chat');
  var c_list = document.getElementById('c_list');
  $('.chat_list').width("284px");
  c_list.style.opacity = 1;
  c_list.style.display = 'block';
  c_list.classList.remove('hidden');
  closeParticipantView();
  chatCount = 0;
  var chatBox = document.getElementById('chat');
  chatBox.scrollTop = chatBox.scrollHeight;
  $('#chat_notification').addClass('hidden');
  document.getElementById('chat_js_count').innerHTML = chatCount;
}

function closeChat(){
  var list = document.getElementById('p_list');
  var c_list = document.getElementById('c_list');
  $('.chat_list').width("0px");
  list.style.opacity = 1;
  list.style.display = 'block';
  list.classList.remove('hidden');
  c_list.style.opacity = 0;
  c_list.style.display = 'none';
  c_list.classList.add('hidden');
}

function toggle_sidebar_panel(panel) {
  if ($('#sidebar_').hasClass('open')) {
    $('#sidebar_').addClass('hidden');
    $('#sidebar_').animate({width:"0px"});
    $('#sidebar_').removeClass('open');
    closeChat();
  }
  else {
    $('#sidebar_').removeClass('hidden');
    $('#sidebar_').animate({width:"284px"});
    $('#sidebar_').addClass('open');
  
    /* Series of overrides - this order is on purpose */
    if ((invited || epic_patient)) {
      panel = 'chat';
    }
    if (is_mobile()) {
      panel = 'settings';
    }
    if (chatCount > 0) {
      panel = 'chat';
    }
    /* End of overrides */

    if (panel == 'chat') {
      openChat();
    }
    if (panel == 'participant') {
      open_participant();
    }
    if (panel == 'settings') {
      openMobileSettings();
    }
  }
}

function chooseToggleButton(button_){
  switch(button_) {
    case 'part':
      $('#part_toggle_button').addClass('selected');
      $('#chat_toggle_button').removeClass('selected');
      $('#settings_toggle_button').removeClass('selected');
      break;
    case 'chat':
      $('#chat_toggle_button').addClass('selected');
      $('#part_toggle_button').removeClass('selected');
      $('#settings_toggle_button').removeClass('selected');
      break;
    case 'settings':
      $('#settings_toggle_button').addClass('selected');
      $('#part_toggle_button').removeClass('selected');
      $('#chat_toggle_button').removeClass('selected');
      break;
    default:
      $('#settings_toggle_button').removeClass('selected');
      $('#part_toggle_button').removeClass('selected');
      $('#chat_toggle_button').removeClass('selected');
  } 
}

function open_participant() {
  closeMobileSettings();
  closeChat();
  chooseToggleButton('part');
  var list = document.getElementById('p_list');
  var c_list = document.getElementById('c_list');
  var participant_list = document.getElementById('participant_list');
  var participant_bar_icon = document.getElementById('participant_bar_icon');
  
  $('.participant_list').addClass('open');
  $('#videocontainer').addClass('c_smaller');
  fadeIn(list, 'block'); 
  $('#participant_bar_icon').animate({left:"18%"});   
  $('#participants_button').attr("aria-expanded","true");

  var add_participant = document.getElementById('add_participant');
  var add_translator = document.getElementById('sidebar_translator');
  var participant_display_list = document.getElementById('side_part_list_scroll')

  // Set size of participant lists
  // If translation service is on
  calibrate_participant_sidebar();
}

function close_participant() {
  var list = document.getElementById('p_list');
  var c_list = document.getElementById('c_list');
  var participant_list = document.getElementById('participant_list');
  var participant_bar_icon = document.getElementById('participant_bar_icon');
  
  closeChat();
  $('#p_list').addClass('hidden'); 
  fadeOut(list); 
  $('.participant_list').removeClass('open');
  $('#videocontainer').removeClass('c_smaller');
  $('#participant_bar_icon').animate({left:"10px"});    
  $('#participants_button').attr("aria-expanded","false");
}

function toggle_header() {
  var h = document.getElementById('header_left');
  if ($('.header_bar').hasClass('down')){
    $('.header_bar').animate({height: "54px"});
    $('.header_bar').removeClass('down');
    $('#header_bar_icon').removeClass('up');
    $('#header_bar_icon').animate({'margin-top':"17px"});
    fadeIn(h, 'block');
    fadeIn($('#room_time'), 'block');
    fadeIn($('#r_name'), 'block');
  }
  else {
    $('.header_bar').animate({height: "0px"}),3000;
  //  $('.header_left').animate({height: "0px"}),1000;
    $('.header_bar').addClass('down');
    $('#header_bar_icon').addClass('up');
    $('#header_bar_icon').animate({'margin-top':"5px"}, 1000);
    fadeOut(h);
    fadeOut($('#room_time'));
    fadeOut($('#r_name'));
  }
}


function updateVolume(val) {
  var vid = document.getElementById("video");
  vid.volume =  (val/20) ;
}

function hover_me(button_name) {
  var button = document.getElementById(button_name);
  button.style.opacity = $selected_opacity;
}

// Query and manipulate the video camera dropdown to ensure the settings reflect the new camera
function toggle_camera() {
  currentIndex = document.getElementById('videoSource').selectedIndex;
  if (currentIndex + 1 >= document.getElementById('videoSource').length) {
    // Overflow, back to beginning
    currentIndex = -1;
  }
  document.getElementById('videoSource').selectedIndex = currentIndex + 1;
  startLocalStream();
  saveSelections();
}

function toggle_widget(element_name, button_name){
  /* Don't forget to add style manually in this script for button */

  if (element_name == 'bookmark_partial') {
    loadBookmarks();
  }
  if (element_name == 'control_partial') {
    loadControls();
  }

  var ele = document.getElementById(element_name);
  if (button_name != '') {
    var button = document.getElementById(button_name);
    var b_opacity = 0;
    if (button) {
      b_opacity = button.style.opacity;
    }
  }

  if (ele.style.opacity > .8)
  { 
    fadeOut(ele);
    if (button && button_name != '') {
      $(button).attr("aria-expanded","false");
      button.style.color= $not_selected
    }
  }
  else
   {
    fadeIn(ele);
    if (button && button_name != '') {
      $(button).attr("aria-expanded","true");
      button.style.color = $selected
    }
  }
}



function confirm_bookmark() {
  var bookmark_pin = document.getElementById("make_bookmark");
  var bookmark = document.getElementById("confirm_bookmark");
  if (rgb2hex(bookmark_pin.style.color) == $not_selected) {
    bookmark_pin.style.color= $selected
    fadeIn(bookmark, 'block');
  }
  else{
    bookmark_pin.style.color= $not_selected
    fadeOut(bookmark, 'block');
  }
}


function move_camera_northwest() {
  if (document.getElementById("compass_button").style.color =='rgb(198, 198, 71)')
  { pan('upleft');}	
};
function move_camera_northeast() {
  if (document.getElementById("compass_button").style.color =='rgb(198, 198, 71)')
  { pan('upright');}	
};
function move_camera_north() {
  if (document.getElementById("compass_button").style.color =='rgb(198, 198, 71)')
  { pan('up');}	
};
function move_camera_west() {
  if (document.getElementById("compass_button").style.color =='rgb(198, 198, 71)')
  { pan('left');}	
};
function move_camera_east() {
  if (document.getElementById("compass_button").style.color =='rgb(198, 198, 71)')
  { pan('right');}	
};

function move_camera_southwest() {
  if (document.getElementById("compass_button").style.color =='rgb(198, 198, 71)')
  { pan('downleft');}	
};

function move_camera_southeast() {
  if (document.getElementById("compass_button").style.color =='rgb(198, 198, 71)')
  { pan('downright');}	
};

function addPerson() {
  var vmr = document.getElementById("call_alias").innerHTML;
  var p_alias = document.getElementById("search-box").value;
  var invite_type = document.getElementById("invite_type_select").value
  $('#add_caller_phone').addClass('hidden');
  $('#dial_phone').removeClass('hidden');
  setTimeout(function(){  $('#add_caller_phone').removeClass('hidden');   $('#dial_phone').addClass('hidden'); }, 2000);
  addExternalPart(p_alias, invite_type, null); 
}

function addTranslator(client_code) {
  var add_on = ''
  if ( $('.gender_ul') ) {
    if ($('#gender_male')[0].checked){
      add_on = $('#gender_male')[0].value;
    }
    if ($('#gender_female')[0].checked){
      add_on = $('#gender_female')[0].value;
    }
    if ($('#gender_all')[0].checked){
      add_on = $('#gender_all')[0].value;
    }
  }
 
  var select_list =  document.getElementById("translator_select");
  var language = select_list.options[select_list.selectedIndex].text.trim();
  var translation_mapping = document.getElementById("translation_mapping").innerHTML;
  var stratus_billing_code = document.getElementById("stratus_billing_code") == null ? null : document.getElementById("stratus_billing_code").innerHTML;
  var p_alias = select_list.value
  var invite_type = 'SIP'
  var t_domain = $('#translation_domain')[0].value

  switch(translation_mapping) {
    case '0':
      // InDemand 
      addExternalPart(p_alias + add_on + client_code + t_domain, invite_type, language + ' Interpreter'); 
      break;
    case '1':
      // Stratus and Mapping
      addExternalPart(p_alias, invite_type, language + ' Interpreter', stratus_billing_code);
      break;
    case '2':
      // Cloudbreak
      var invite_type = 'CLOUDBREAK_INVITE';
      addExternalPart("-1", invite_type, null); 
      break;
    case '3':
      // PSTN translator
      var invite_type = 'pstn';
      addExternalPart(p_alias, invite_type, language + ' Interpreter');
      break;
  }

  proAlert("Calling Interpreter", "success", "Interpreter invitation has been sent.", "OK", "close", "addTranslatorBtn");


  // InDemand = prefix + gender + client_code + domain
  //            [11011010][2][99999][@indemand.com]
  
  // If mapping is true then it's directly mapped to the uri
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: 0}).animate({deg: angle}, args);
  });
};

function focus_on_sip(element_name) {
  document.getElementById(element_name).focus();
}

function testResponse() {
  document.getElementById("iii").style.webkitAnimationName = "anim-effect-ivana-2";
}

function collapse_participant_sidebar(working_partial) {
 
  var participant_list = document.getElementById('participant_list');
  var add_participant = document.getElementById('add_participant');
  var add_translator = document.getElementById('sidebar_translator');
  var participant_display_list = document.getElementById('side_part_list_scroll');

  var partipant_list_scrollbox = participant_list.clientHeight; 

  var mobile_padding = 0;
  if (isMobile()) {
    mobile_padding = 11;
  }
  
  //Collapsing of participant	
  if (working_partial == "participant") {
    if ($('#add_participant').hasClass('hidden')) {// Open Part
      $('#add_participant').removeClass('hidden'); 
      $('#participant_fa').addClass('fa-minus'); 
      $('#participant_fa').removeClass('fa-plus');
      $('#participant_fa').attr('title', 'Minimize');
      $('#participant_fa').attr("aria-label","minimize participant invite");


      if ($('#sidebar_translator').length) { //  Translator Exists
        if ($('#sidebar_translator').hasClass('hidden')) {  // Open part when Translator is closed
          var partipant_list_scrollbox = participant_list.clientHeight - (eval(add_participant.clientHeight) + 49) + mobile_padding;
          add_translator.style.height = "269px";
          add_translator.style.paddingTop = "0px"; 

	}
        else  { // Open part when Translator is  Open
          add_translator.style.height = "269px";
          add_translator.style.paddingTop = "0px"; 		
          var partipant_list_scrollbox = participant_list.clientHeight - (eval(add_participant.clientHeight) + eval(add_translator.clientHeight) + 25) + mobile_padding;	
	}
      }
      else {
        var partipant_list_scrollbox = partipant_list_scrollbox -  eval(add_participant.clientHeight) - 25 + mobile_padding;        
      }
    }
    else { // CLOSE Part
      $('#add_participant').addClass('hidden'); 
      $('#participant_fa').addClass('fa-plus'); 
      $('#participant_fa').removeClass('fa-minus'); 
      $('#participant_fa').attr('title', 'Maximize');
      $('#participant_fa').attr("aria-label","maximize participant invite");

    
      if ($('#sidebar_translator').length) { // Translator  On 
        if ($('#sidebar_translator').hasClass('hidden')) {  // Close part when Translator is closed
          var partipant_list_scrollbox = participant_list.clientHeight - (23 + 23) - 27  + mobile_padding;
	}
	else { // Close part when translator is open
          var partipant_list_scrollbox = participant_list.clientHeight - (eval(add_translator.clientHeight) + 23 + 23) + mobile_padding;
	  add_translator.style.height = "290px";
          add_translator.style.paddingTop = "23px"; 
   	}
      }
      else { // Translator turned off
        var partipant_list_scrollbox = partipant_list_scrollbox - 49 + mobile_padding;  
      }
    }
  }
 
  //Collapsing of translator	
  if (working_partial == "translator") {
    if ($('#sidebar_translator').hasClass('hidden')) {//Open
      $('#sidebar_translator').removeClass('hidden'); 
      $('#translator_fa').addClass('fa-minus'); 
      $('#translator_fa').removeClass('fa-plus')
      $('#translator_fa').attr('title', 'Minimize');
      $('#translator_fa').attr("aria-label","minimize interpreter invite");

      if ($('#add_participant').hasClass('hidden')) {  // Open  Translator when Participant is closed
        add_translator.style.height = "269px";
        add_translator.style.paddingTop = "0px"; 	
        var partipant_list_scrollbox = participant_list.clientHeight - (eval(add_translator.clientHeight) + 23 + 23) + mobile_padding;
	add_translator.style.height = "290px";
        add_translator.style.paddingTop = "23px";	      
      }
      else  { // Open Translator when Participant is  Open
        add_translator.style.height = "269px";
        add_translator.style.paddingTop = "0px"; 		
        var partipant_list_scrollbox = participant_list.clientHeight -  (eval(add_participant.clientHeight) + eval(add_translator.clientHeight) + 25) + mobile_padding;
      }
    }
    else {//Close
      $('#sidebar_translator').addClass('hidden'); 
      $('#translator_fa').addClass('fa-plus'); 
      $('#translator_fa').removeClass('fa-minus'); 
      $('#translator_fa').attr('title', 'Maximize');
      $('#translator_fa').attr("aria-label","maximize interpreter invite");

      if ($('#add_participant').hasClass('hidden')) {  //  Closed  Translator when Participant is closed
        var partipant_list_scrollbox = participant_list.clientHeight - 73 + mobile_padding;	
      }
      else { //  Closed  Translator when Participant is open
        var partipant_list_scrollbox = participant_list.clientHeight -  (eval(add_participant.clientHeight)  +  49) + mobile_padding;	    
      }
    }
  }
  // Calculate height for participant_list
  partipant_list_scrollbox = partipant_list_scrollbox + "px";
  participant_display_list.style.height = partipant_list_scrollbox;
}

function calibrate_participant_sidebar() {
  var has_participant_been_openeed = document.getElementById('initial_participant_sidebar_toggle');

  var mobile_padding = 0;
  if (isMobile()) {
    mobile_padding = 11;
  }

  if (has_participant_been_openeed.innerText != "true") {
    var participant_list = document.getElementById('participant_list');
    var add_participant = document.getElementById('add_participant');
    var add_translator = document.getElementById('sidebar_translator');
    var invite_participant_section = $('#invite_participant_section'); /* Invite Section */
    var translator_section = $('#translator_section'); /* Translator Section */

    var participant_display_list = document.getElementById('side_part_list_scroll');
    var partipant_list_scrollbox = participant_list.clientHeight; 

    if (invite_participant_section.hasClass('hidden') && translator_section.hasClass('hidden')) {
      var partipant_list_scrollbox = partipant_list_scrollbox - 25 + mobile_padding;              
    }
    else if (add_translator) { // Translator  On 
      var partipant_list_scrollbox = partipant_list_scrollbox - 269 - 269 - 25 + mobile_padding;        
    }
    else {
      var partipant_list_scrollbox = partipant_list_scrollbox - 269 - 25 + mobile_padding;;        
    }

    // Calculate height for participant_list
    partipant_list_scrollbox = partipant_list_scrollbox + "px";
    has_participant_been_openeed.innerText = "true";
    participant_display_list.style.height = partipant_list_scrollbox;
  }
}

/* Dialing a room Validation */
 
function dialRoomValidateInput(previous_obj, obj) {
  var obj_element = $(obj);
  var last_obj_element = $(previous_obj);
  var next_required_element = null;
  
  if (last_obj_element.val() == '0') {
    if (locationSelect.value == '0') {
      next_required_element = $(locationSelect);
    }
    else if (buildingSelect.value == '0') {
      next_required_element = $(buildingSelect);
    }
    else if (roomSelect.value == '0') {
      next_required_element = $(roomSelect);
    }
    else if (endpointSelect.value == '0') {
      next_required_element = $(endpointSelect);
    }
    next_required_element.addClass('invalid');
  }
}

function dialRoomSubmitValidation() {
  var ls = $('#locationSelect');
  var bs = $('#buildingSelect');
  var rs = $('#roomSelect');
  var es = $('#endpointSelect');

  if (ls.val() == "0" || bs.val() == "0" || rs.val() == "0" || es.val() == "0") {
    if (ls.val() == "0") {
      ls.addClass('invalid');
      $("#locationSelectRequired").removeClass('hidden');
      ls.focus();
    }
    else if (bs.val() == "0"){
      bs.addClass('invalid');
      $("#buildingSelectRequired").removeClass('hidden');
      bs.focus();
    }
    else if (rs.val() == "0"){
      rs.addClass('invalid');
      $("#roomSelectRequired").removeClass('hidden');
      rs.focus();
    }
    else if (es.val() == "0"){
      es.addClass('invalid'); 
      $("#endpointSelectRequired").removeClass('hidden');
      es.focus();
    }
  }  
  else {
    dial_conf(); 
  }
}

function clearValidation(obj){
  var element = $(obj);
  var elementRequired = $('#' + obj.id + "Required")
  if (element.hasClass('invalid')) {
    element.removeClass('invalid');
    if (!elementRequired.hasClass("hidden")) {
      elementRequired.addClass("hidden");
    }
  }
}

/* Devise Validation */ 
function formValidation(form) {
  var elements = form.elements;
  var submit = true;
  var firstEmptyElement = null;

  for (var i = 0, element; element = elements[i++];) {
    if (element.type === "text" || element.type === 'password' || element.type === 'email') {
      var ele = $(element);
      var eleError = element.id+"Error";

      if (ele.val() === "") {
        ele.addClass('invalid');
        if ($('#'+eleError).hasClass('hidden')) {
          $('#'+eleError).removeClass('hidden');
        }
        submit = false;
        if(firstEmptyElement == null) {
          firstEmptyElement = ele;
        }
      }
      else {
        if(ele.hasClass('invalid')) {
          ele.removeClass('invalid');
          $('#'+eleError).addClass('hidden');
        }
      }
    }
    else if ((element.type === 'select-one' || element.type === 'select-multiple') && element.value === ""){
      var ele = $(element);
      var eleError = element.id+"Error";
      ele.addClass('invalid');
      if ($('#'+eleError).hasClass('hidden')) {
        $('#'+eleError).removeClass('hidden');
      }
      submit = false;

      if(firstEmptyElement == null) {
        firstEmptyElement = ele;
      }
    }
  }
  if (submit) {
    return true;
  }
  else {
    firstEmptyElement.focus();
    return false;
  } 
}

function initializeCallRating(user_id) {
  var stars = $(".fa-star");
  var star_inputs = $("input[type='radio']");
  var ratingValue = $("#ratingValue");

  var Star = {
    onClicked: function() {
      star_rating = this.id[this.id.length -1];

      // Manage Radio Stars
      star_inputs.each(function( index ) {
        if ($(this).val() != star_rating ) {
          $(this).prop('checked', false);
        }
        else {
          $(this).prop('checked', true);
        }
      });
       
      // Calibrate Stars
      stars.each(function( index ) {
        $(this).removeClass('clickedStars');
      });
      stars.each(function( index ) {
        if (this.id[this.id.length -1] <= star_rating) {
          $(this).addClass('clickedStars');
        }
      });
  
      // Stash temporary rating
      ratingValue.val(star_rating);
    },
    onHovered: function() {
      star_rating = this.id[this.id.length -1];
    
      stars.each(function( index ) {
        if (this.id[this.id.length -1] <= star_rating) {
          $(this).addClass('hoveredStars');
        }
      });
    },
    unHover: function() {
      star_rating = this.id[this.id.length -1];
    
      stars.each(function( index ) {
        if (this.id[this.id.length -1] <= star_rating) {
          $(this).removeClass('hoveredStars');
        }
      });
      }
    };
	
  stars.click(Star.onClicked);
  stars.hover(Star.onHovered, Star.unHover);

  // Reset Link 
  $("#resubmitRating").click(function(){
    $("#ratingSubmitted").addClass('hidden');
    $("#ratingSystem").removeClass('hidden');
  }); 

  // Submit Rating
  $("#rating_button").click(function(){
    submitRating(user_id)
  }); 
}

function submitRating(user_id) {
  var submit_buttton = $("#rating_button");
  var ratingValue = $("#ratingValue");
  var ratingText = $("#ratingText");

  if (ratingValue.val() != "" ) {
    $.ajax({
      url:"/home/update_call_quality_rating?call_rating="+star_rating+"&user_id=" + user_id, 
      method: "POST",
      dataType: "JSON",
      success: function() {
        stars = $(".fa-star");
        star_inputs = $("input[type='radio']");
 
        stars.each(function( index ) {
          $(this).removeClass('clickedStars');
        });
        star_inputs.each(function( index ) {
          $(this).prop('checked', false);
        });

        ratingText.text(star_rating + " Star Rating");
        $("#ratingSystem").addClass('hidden');
        $("#ratingSubmitted").removeClass('hidden');
        $("#ratingValue").val('');
   
        if ( $('#ratingError').hasClass("error")) {
          $('#ratingError').addClass("hidden");
          $('#stars').removeClass("error");
        }
      }
    });
  }
  else {
    $('#ratingError').removeClass("hidden");
    $('#stars').addClass("error");
  }
}
