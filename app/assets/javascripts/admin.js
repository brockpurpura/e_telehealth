function submit_form(form_name){
  document.getElementById(form_name).submit();   
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
	   // Shows second phone entry	     
	   $('#clinician_phone2_'+idx).removeClass("hidden");  
           document.getElementById("clinician_phone2_"+idx).style.display = "block";

	   //Hide step -> 1 pagination     
	   $('#open_phone_entry1_'+idx).addClass("hidden");  
           document.getElementById("open_phone_entry1_"+idx).style.display = "none";
	   //Show step -> 2 pagination      
           $('#open_phone_entry2_'+idx).removeClass("hidden");  
           document.getElementById("open_phone_entry2_"+idx).style.display = "block"
        break;
       case 2:
	   // Shows last phone entry	     		     
           $('#clinician_phone3_'+idx).removeClass("hidden");  
           document.getElementById("clinician_phone3_"+idx).style.display = "block";

	   //Hide step-> 2 pagination    		     
           $('#open_phone_entry2_'+idx).addClass("hidden");  
           document.getElementById("open_phone_entry2_"+idx).style.display = "none";	
      }
   }

  function remove_additional_phone(rule, clinician_id, idx) {
    switch(rule) {
      case 1: // Toggled trashcan on entry 2. Hide entry 2
        // Third entry is already closed. Clear and close entry 2 
	      if ($('#clinician_phone3_'+idx).hasClass("hidden")){
	        $('#clinician_phone2_'+idx).addClass("hidden");  
          document.getElementById("clinician_phone2_"+idx).style.display = "none";
  	      $('#clinician_phone_two_'+idx).val("");
  	      if (clinician_id != "") {
            $.ajax("/admin_panel/client/delete_clinician_phone/?clinician_id=" + clinician_id + "&phone=" + 1);
	        }
          //Set pagination to step 1 Hide 2 regardless
          $('#open_phone_entry1_'+idx).removeClass("hidden");  
          document.getElementById("open_phone_entry1_"+idx).style.display = "block";

          $('#open_phone_entry2_'+idx).addClass("hidden");  
          document.getElementById("open_phone_entry2_"+idx).style.display = "none";
        }
        else {  //Clear second entry & shift entry three info -> entry two. Close entry three
          $('#clinician_phone3_'+idx).addClass("hidden");  
          document.getElementById("clinician_phone3_"+idx).style.display = "none";
	        $('#clinician_phone_two_'+idx).val($('#clinician_phone_three_'+idx).val())	
	        $('#flag2_value_'+idx).val($('#flag3_value_'+idx).val())	
          $("#flag2_"+idx).removeClass();
	        //Reassign flag from entry3 -> entry2	    
          var classList = document.getElementById('flag3_'+idx).className.split(/\s+/);
          for (var i = 0; i < classList.length; i++) {
            $('#flag2_'+idx).addClass(classList[i]);
	        }
		   
  	      if (clinician_id != "") {
            $.ajax("/admin_panel/client/delete_clinician_phone/?clinician_id=" + clinician_id + "&phone=" + 1);
	        }

          //Keep pagination to step 2 Hide 1
          $('#open_phone_entry1_'+idx).addClass("hidden");  
          document.getElementById("open_phone_entry1_"+idx).style.display = "none";

          $('#open_phone_entry2_'+idx).removeClass("hidden");  
          document.getElementById("open_phone_entry2_"+idx).style.display = "block";


	      }
  	    $('#clinician_phone_three_'+idx).val("")	
        break;
      case 2: // Clear and hide entry 3
	      $('#clinician_phone3_'+idx).addClass("hidden");  
        document.getElementById("clinician_phone3_"+idx).style.display = "none";

        $('#open_phone_entry1_'+idx).addClass("hidden");  
        document.getElementById("open_phone_entry1_"+idx).style.display = "none";

	      $('#open_phone_entry2_'+idx).removeClass("hidden");  
        document.getElementById("open_phone_entry2_"+idx).style.display = "block";

        if (clinician_id != "") {
          $.ajax("/admin_panel/client/delete_clinician_phone/?clinician_id=" + clinician_id + "&phone=" + 2);
          $('#clinician_phone_three_'+idx).val("");		 
		  
	      }
      }
   }

  function handleMobileSpecialtyChange() {
    // If Role = Patient and Specialty = InPatient
    //      - Use default password
    var mobileRoleSelect = document.getElementById('mobileRoleDropdown');
    var mobileRole = mobileRoleSelect.options[mobileRoleSelect.selectedIndex].value;
    var mobileSpecialtySelect = document.getElementById('mobileSpecialtyDropdown');
    var mobileSpecialty = mobileSpecialtySelect.options[mobileSpecialtySelect.selectedIndex].value;
    var passwordField = document.getElementById('password_block');
    
    // If on the 'create' form, handle the password field
    if (passwordField) {
      if (mobileRole == "Patient" && mobileSpecialty == "InPatient") {
        passwordField.classList.remove('hidden');
      } else {
        passwordField.classList.add('hidden');
      }
    }
  }

  function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
      selectElement.remove(i);
    }
  }
 

  function handleMobileRoleChange() {

    var mobileRoleSelect = document.getElementById('mobileRoleDropdown');
    var mobileRole = mobileRoleSelect.options[mobileRoleSelect.selectedIndex].value;
    var mobileChannelSelect = document.getElementById('channelDropDown');
    var mobileCustomerSelect = document.getElementById('customerDropDown');
    var mobileLocationSelect = document.getElementById('room_building_id');
    var mobileUnitSelect = document.getElementById('roomSelect');
    var locationsAndUnitBlock = document.getElementsByClassName("patient_only");
    var nonPatientBlock = document.getElementsByClassName("non_patient_only");

    // If Role = Patient
    //  - Do not allow wildcard channel or Customer
   
    // Reset dropdowns
    removeOptions(mobileCustomerSelect);
    removeOptions(mobileLocationSelect);
    removeOptions(mobileUnitSelect);

    // Reset Channels
    mobileChannelSelect.selectedIndex = 0;

    $.ajax({
      url:"/admin_panel/admin/get_specialties?mobile_role=" + mobileRole,
      dataType: "JSON",
      success: function(data) {
        mobileSpecialtySelect = document.getElementById('mobileSpecialtyDropdown');
        mobileSpecialtySelect.options.length = 0;

        if (data.specialties.length == 0) {
          var option = document.createElement('option');
          option.value = 0;
          option.text = "No specialties found";
          mobileSpecialtySelect.appendChild(option);
        }
        if (data.specialties) {
          for (var i=0; i != data.specialties.length; ++i) {
            var specialtyInfo = data.specialties[i];
            var option = document.createElement('option');
            option.value = specialtyInfo.id;
            option.text = specialtyInfo.name;
            mobileSpecialtySelect.appendChild(option);
          }
        }
      }
    })
    .done(function( data ) {

      handleMobileSpecialtyChange();
      
      // Make sure the channel/customer/location/unit are correct
      if (mobileRole == "Patient") {

        // Show Locations and Units dropdowns
        for(var i = 0; i < locationsAndUnitBlock.length; i++) {
          locationsAndUnitBlock[i].classList.remove('hidden');
        }

        // Hide Notification Portal role
        for(var i = 0; i < nonPatientBlock.length; i++) {
          nonPatientBlock[i].classList.add('hidden');
        }

        // Remove 'All Channels'
        for (var i = 0; i < mobileChannelSelect.length; i++) {
          if (mobileChannelSelect.options[i].value == "") {
            mobileChannelSelect.remove(i);
            break;
          }
        }

      } else {
        // Hide Locations and Units
        for(var i = 0; i < locationsAndUnitBlock.length; i++) {
          locationsAndUnitBlock[i].classList.add('hidden');
        }


        // show Notification Portal role
        for(var i = 0; i < nonPatientBlock.length; i++) {
          nonPatientBlock[i].classList.remove('hidden');
        }

        // Add 'All Channels'
        var allChannelsPresent = false;
        for (var i = 0; i < mobileChannelSelect.length; i++) {
          if (mobileChannelSelect.options[i].text == 'All Channels') {
            allChannelsPresent = true;
            break;
          }
        }
        if (!allChannelsPresent) {
          var channel_option = document.createElement('option');
          channel_option.value = "";
          channel_option.text = "All Channels";
          mobileChannelSelect.add(channel_option, mobileChannelSelect[0]);
          mobileChannelSelect.selectedIndex = 0;
        }
      }
      adminMobileCheckCustomers();
      
    }); 
  }

  function adminMobileCheckCustomers() {
    // load Customers for chosen Channel
    var mobileRoleSelect = document.getElementById('mobileRoleDropdown');
    var mobileRole = mobileRoleSelect.options[mobileRoleSelect.selectedIndex].value;
    var mobileLocationSelect = document.getElementById('room_building_id');
    var mobileUnitSelect = document.getElementById('roomSelect');
    var mobileChannelSelect = document.getElementById('channelDropDown');
    var mobileCustomerSelect = document.getElementById('customerDropDown');
    var SelectedChannel = mobileChannelSelect.options[mobileChannelSelect.selectedIndex].value;

    removeOptions(mobileCustomerSelect);
    removeOptions(mobileLocationSelect);
    removeOptions(mobileUnitSelect);

    $.ajax({
      url:"/admin_panel/admin/get_customers?channel_id=" + SelectedChannel,
      dataType: "JSON",
      success: function(data) {

        if (data.customers.length == 0) {
          var option = document.createElement('option');
          option.value = 0;
          option.text = 'No Customers Created yet';
          mobileCustomerSelect.appendChild(option);
        }
        if (data.customers.length > 0 && mobileRole != "Patient") {
          var option = document.createElement('option');
          option.text = "All Customers";
          mobileCustomerSelect.appendChild(option);
          mobileCustomerSelect.add(option, mobileCustomerSelect[0]);
          mobileCustomerSelect.selectedIndex = 0;
        }

        if (data.customers) {
          for (var i=0; i != data.customers.length; ++i) {
            var custInfo = data.customers[i];
            var option = document.createElement('option');
            option.value = custInfo.id;
            option.text = custInfo.name;
            mobileCustomerSelect.appendChild(option);
          }
        }
      }
    })
    .done(function( data ) {
      adminMobileCheckBuildings(null, null);
    });
    
  }

  function adminMobileCheckBuildings(building_id, room_id) {
    var e = document.getElementById("customerDropDown");
    var loc_id = e.options[e.selectedIndex].value;
    
    var mobileLocationSelect = document.getElementById("room_building_id");
    var mobileUnitSelect = document.getElementById('roomSelect');

    removeOptions(mobileLocationSelect);
    removeOptions(mobileUnitSelect);

    $.ajax({
       url:"/admin_panel/admin/get_buildings?loc_id=" + loc_id,
       dataType: "JSON",
       success: function(data) {

          if (data.buildings.length == 0) {
            var option = document.createElement('option');
            option.value = 0;
            option.text = 'No Locations Created yet';
            mobileLocationSelect.appendChild(option);
          }
          if (data.buildings) {
            for (var i=0; i != data.buildings.length; ++i) {
              var locInfo = data.buildings[i];
              var option = document.createElement('option');
              option.value = locInfo.id;
              option.text = locInfo.name;
              if (building_id && (locInfo.id == building_id)) {
                option.selected = true;
              }
              mobileLocationSelect.appendChild(option);
            }
          }
       }
     })
     .done(function( data ) {
        adminMobileCheckRooms(room_id);
    });
  }

  function adminMobileCheckRooms(room_id) {
    var e=document.getElementById("room_building_id");
    var loc_id = e.options[e.selectedIndex].value;
    var mobileUnitSelect = document.getElementById('roomSelect');

    removeOptions(mobileUnitSelect);

    $.ajax({
       url:"/admin_panel/admin/get_rooms?loc_id=" + loc_id,
       dataType: "JSON",
       success: function(data) {
          roomSelect = document.getElementById("roomSelect");
          roomSelect.options.length = 0;

          if (data.rooms.length == 0) {
            var option = document.createElement('option');
            option.value = 0;
            option.text = 'No Units Created yet';
            roomSelect.appendChild(option);
          }
          if (data.rooms) {
            for (var i=0; i != data.rooms.length; ++i) {
              var locInfo = data.rooms[i];
              var option = document.createElement('option');
              option.value = locInfo.id;
              option.text = locInfo.name;
              if (room_id && (locInfo.id == room_id)) {
                option.selected = true;
              }
              roomSelect.appendChild(option);
            }
          }
       }
     });
  }


  function checkAdminPermissions(idx) {
    var cdd_name = "customerDropDown";
    if (idx >= 0) {
      cdd_name = cdd_name + "_" + idx;
    }
    var ial_name = "invite_admin_level";
    if (idx >= 0) {
      ial_name = ial_name + "_" + idx;
    } 
    
    var chdd_name = "channelDropDown";
    if (idx >= 0) {
      chdd_name = chdd_name + "_" + idx;
    }

    var customerSelect = document.getElementById(cdd_name);
    var customer_id = customerSelect.options[customerSelect.selectedIndex].value;
    var channelSelect = document.getElementById(chdd_name);
    var channel_id = channelSelect.options[channelSelect.selectedIndex].value;
    var admin_select = document.getElementById(ial_name);
    admin_select.options.length = 0;
    if ((customer_id == "0" || customer_id == "") && (channel_id == "0" || channel_id == "")) {  // set to super
      // allow only NONE and CHANNEL_ADMIN
      var option = document.createElement('option');
      option.value = 'NONE';
      option.text = 'None';
      admin_select.appendChild(option);
      option = document.createElement('option');
      option.value = 'SUPER_ADMIN';
      option.text = 'Super Admin';
      admin_select.appendChild(option);
    }
    else {
      if ((customer_id == "0" || customer_id == "") && (channel_id != "0" && channel_id != "")) {  // set to all channels
        var option = document.createElement('option');
        option.value = 'NONE';
        option.text = 'None';
        admin_select.appendChild(option);
        option = document.createElement('option');
        option.value = 'CHANNEL_ADMIN';
        option.text = 'Channel Admin';
        admin_select.appendChild(option);
      }
      else {
        // only all NONE and CUSTOMER_ADMIN
        var option = document.createElement('option');
        option.value = 'NONE';
        option.text = 'None';
        admin_select.appendChild(option);
        option = document.createElement('option');
        option.value = 'CUSTOMER_ADMIN';
        option.text = 'Customer Admin';
        admin_select.appendChild(option);
      }
    }
  }

  function checkCustomers(loadBuildings, loadRooms, idx, cust_prompt) {
    var cdd_name = "customerDropDown";
    if (idx >= 0) {
      cdd_name = cdd_name + "_" + idx;
    }
    var chdd_name = "channelDropDown";
    if (idx >= 0) {
      chdd_name = chdd_name + "_" + idx;
    }
    var ial_name = "invite_admin_level";
    if (idx >= 0) {
      ial_name = ial_name + "_" + idx;
    } 

    var channelSelect = document.getElementById(chdd_name);
    var channel_id = channelSelect.options[channelSelect.selectedIndex].value;
    var admin_select = document.getElementById(ial_name);
    if (admin_select) {
      admin_select.options.length = 0;
      if (channel_id == "") {  // set to all channels
        // allow only NONE and SUPER_ADMIN
        var option = document.createElement('option');
        option.value = 'NONE';
        option.text = 'None';
        admin_select.appendChild(option);
        option = document.createElement('option');
        option.value = 'SUPER_ADMIN';
        option.text = 'Super Admin';
        admin_select.appendChild(option);
      }
      else {
        // allow only NONE and CHANNEL_ADMIN
        var option = document.createElement('option');
        option.value = 'NONE';
        option.text = 'None';
        admin_select.appendChild(option);
        option = document.createElement('option');
        option.value = 'CHANNEL_ADMIN';
        option.text = 'Channel Admin';
        admin_select.appendChild(option);
      }
    }
    $.ajax({
       url:"/admin_panel/admin/get_customers?channel_id=" + channel_id,
       dataType: "JSON",
       success: function(data) {
         customerSelect = document.getElementById(cdd_name);
         customerSelect.options.length = 0;
         if (data.customers.length > 0 && cust_prompt != -1) {
           var option = document.createElement('option');
           option.value = 0;
           option.text = cust_prompt;
           customerSelect.appendChild(option);
         }
         if (data.customers.length == 0) {
           var option = document.createElement('option');
           option.value = 0;
           option.text = 'No Customers Available';
           customerSelect.appendChild(option);
         }
         if (data.customers) {
           for (var i=0; i != data.customers.length; ++i) {
             var custInfo = data.customers[i];
             var option = document.createElement('option');
             option.value = custInfo.id;
             option.text = custInfo.name;
             customerSelect.appendChild(option);
           }
           if (loadBuildings) {
             adminCheckBuildings(loadRooms);
           }
         }
       }
     });
  }

function adminCheckBuildings(loadRooms) {
  var e=  document.getElementById("customerDropDown");
  var loc_id = e.options[e.selectedIndex].value;
  $.ajax({
     url:"/admin_panel/admin/get_buildings?loc_id=" + loc_id,
     dataType: "JSON",
     success: function(data) {
       buildingSelect = document.getElementById("room_building_id");
       buildingSelect.options.length = 0;
       if (data.buildings.length > 0) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Select Location';
         buildingSelect.appendChild(option);
       }
       if (data.buildings.length == 0) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'No Locations Created yet';
         buildingSelect.appendChild(option);
       }
       if (data.buildings) {
         for (var i=0; i != data.buildings.length; ++i) {
           var locInfo = data.buildings[i];
           var option = document.createElement('option');
           option.value = locInfo.id;
           option.text = locInfo.name;
           buildingSelect.appendChild(option);
         }
       }
       if (loadRooms) {
         adminCheckRooms();
       }
     }
   });
}

function adminCheckRooms() {
  var e=  document.getElementById("room_building_id");
  var loc_id = e.options[e.selectedIndex].value;
  $.ajax({
     url:"/admin_panel/admin/get_rooms?loc_id=" + loc_id,
     dataType: "JSON",
     success: function(data) {
       roomSelect = document.getElementById("roomSelect");
       roomSelect.options.length = 0;
       if (data.rooms.length > 0) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Select Unit';
         roomSelect.appendChild(option);
       }
       if (data.rooms.length == 0) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'No Units Created yet';
         roomSelect.appendChild(option);
       }
       if (data.rooms) {
         for (var i=0; i != data.rooms.length; ++i) {
           var locInfo = data.rooms[i];
           var option = document.createElement('option');
           option.value = locInfo.id;
           option.text = locInfo.name;
           roomSelect.appendChild(option);
         }
       }
     }
   });
}


  function configuredDeleteAlert() {
    //alert("This room is still configured. You must Factory Reset this device prior to deleting room!")
    swal({ title: "Delete failed", text: "This room is still configured. You must Factory Reset this device prior to deleting room!", type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false}); 
  }

  function check_delete_button_activation(delete_confirm_id) {
    var confirm_edittext = document.getElementById("delete_confirm_" + delete_confirm_id);
    var confirm_delete_btn = document.getElementById("delete_btn_" + delete_confirm_id);

    if (confirm_edittext.value.trim().toLowerCase() == "delete") {
      confirm_delete_btn.disabled = false;
      $("#delete_btn_"+delete_confirm_id).removeClass("inactive");
      
    }
    else {
      confirm_delete_btn.disabled = "disabled";
      $("#delete_btn_"+delete_confirm_id).addClass("inactive");
    }

  }

  function update_is_live(ep_id) {	
    var checked = document.getElementById("is-live-toggle").checked
    if (!checked) {
      $.ajax("/admin_panel/admin/update_is_live/?endpoint_id=" + ep_id + "&is_live=" + 0);
    }
    else {
      $.ajax("/admin_panel/admin/update_is_live/?endpoint_id=" + ep_id + "&is_live=" + 1);      
    }
  }

  function update_maintenance(ep_id) {	
    var checked = document.getElementById("maintenance-mode-toggle").checked
    if (!checked) {
      $.ajax("/admin_panel/admin/update_maintenance/?endpoint_id=" + ep_id + "&maintenance_off=" + 1);
    }
    else {
      $.ajax("/admin_panel/admin/update_maintenance/?endpoint_id=" + ep_id + "&maintenance_on=" + 1);      
    }
  }

  function update_acknowledged(ep_id) {	
    var checked = document.getElementById("acknowledged-toggle").checked
    if (!checked) {
      $.ajax("/admin_panel/admin/update_acknowledged/?endpoint_id=" + ep_id + "&acknowledged_off=" + 1);
      document.getElementById("acknowledged-by").classList.add("hidden");
    } else {
      $.ajax({
        url:"/admin_panel/admin/update_acknowledged/?endpoint_id=" + ep_id + "&acknowledged_on=" + 1,
        method: "POST",
        dataType: "JSON",
        format: 'js',
        contentType: "application/json",
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(rdata) {
          var ack_email = rdata.acknowledged_email;
          document.getElementById("acknowledged-by").innerHTML = ack_email;
          document.getElementById("acknowledged-by").classList.remove("hidden");
        }
     });
    }
  }

  function update_teamviewer(ep_id) {	
    var checked = document.getElementById("teamviewer-toggle").checked
    if (checked) {
      $.ajax({
        url:"/endpoint/adjust_teamviewer",
        method: "POST",
        data: {e_id:ep_id, tv_value:'on'},
        dataType: "JSON"
      });
    }
    else {
      $.ajax({
        url:"/endpoint/adjust_teamviewer",
        method: "POST",
        data: {e_id:ep_id, tv_value:'off'},
        dataType: "JSON"
      });
    }
  }

  function update_esitter(ep_id) {	
    var checked = document.getElementById("esitter-toggle").checked
    if (checked) {
      $.ajax({
        url:"/endpoint/adjust_esitter",
        method: "POST",
        data: {e_id:ep_id, e_value:'on'},
        dataType: "JSON"
      });
    }
    else {
      $.ajax({
        url:"/endpoint/adjust_esitter",
        method: "POST",
        data: {e_id:ep_id, e_value:'off'},
        dataType: "JSON"
      });
    }
  }

  function open_close_static(id) {
    var edit_static = document.getElementById("edit_static_id_" + id).innerHTML;
    if (edit_static.trim() == "Off") {
      document.getElementById("edit_static_id_" + id).innerHTML = "On";
      document.getElementById("edit_static_" + id).style.display = "block";
      $.ajax("/admin_panel/client/update_static_ip_status/?endpoint_id=" + id + "&status=" + 1);

    }
    else {
      document.getElementById("edit_static_id_" + id).innerHTML = "Off";
      document.getElementById("edit_static_" + id).style.display = "none";
      $.ajax("/admin_panel/client/update_static_ip_status/?endpoint_id=" + id + "&status=" + 0);      
    }
  }

  function sendAdminResetPasswordEmail(admin, idx, url) {
    var temp = JSON.parse(admin);
    var send_reset = $.ajax(url + temp.id);
    $.when(send_reset).done(function() {
      close_admin_popup("reset_popup_"+idx);
      window.location.reload(true); 
    });
  }

  function changeUser(idx){
    document.getElementById('new_login_' + idx).submit();
  }


  // Open Popup Widget
  function open_mobile_admin_popup(id, popup_close_id) {
    var el_with_id = '#' + id;	  
    $(el_with_id).removeClass("hidden"); 
    document.getElementById(id).style.display = 'block'
    $('#popup_overlay').css('height', $('.univago_admin').height());
    $('#popup_overlay').removeClass("hidden");  
    document.getElementById("admin_body_tag").style.overflow = "hidden";
    //$('html, body').animate({ scrollTop: 0 }, 'fast'); 
    
    if (popup_close_id != '') {
      close_admin_popup(popup_close_id);
      $('#popup_overlay').removeClass("hidden"); 
      document.getElementById("admin_body_tag").style.overflow = "hidden";
    }
  }

  function open_admin_popup(id, popup_close_id) {
    var el_with_id = '#' + id;	  
    $(el_with_id).removeClass("hidden"); 
    document.getElementById(id).style.display = 'block'
    $('#popup_overlay').css('height', $('.univago_admin').height());
    $('#popup_overlay').removeClass("hidden");  
    document.getElementById("admin_body_tag").style.overflow = "hidden";
    //$('html, body').animate({ scrollTop: 0 }, 'fast'); 
    
    if (popup_close_id != '') {
      close_admin_popup(popup_close_id);
      $('#popup_overlay').removeClass("hidden"); 
      document.getElementById("admin_body_tag").style.overflow = "hidden";
    }
  }


  function close_admin_popup(id) {
    var el_with_id = '#' + id;
    $(el_with_id).addClass("hidden"); 
    $('#popup_overlay').addClass("hidden");  
    document.getElementById("admin_body_tag").style.overflow = "overlay";

    if (id.includes("edit_clinician")) {
      $.ajax("/admin_panel/client/update_clinician/?refresh_for_clinician_numbers=true");
    }
  }


  function close_edit_user(idx) {
    document.getElementById("edit_user_form_" + idx).reset();
    close_admin_popup('edit_client_' + idx);
  }

  // Edit Popup Widgets

  function open_edit_cga_group_popup(gp, idx) {
    var group =  JSON.parse(gp)
    document.getElementById("edit_group_name_" + idx).value = group.name;
    document.getElementById("edit_group_layerx_" + idx).value = group.use_layerx
    document.getElementById("edit_group_layerx_username_" + idx).value = group.layerx_username;
    document.getElementById("edit_group_layerx_dashboard_" + idx).value = group.layerx_dashboard_id;
    open_admin_popup("edit_group_"+idx,'');
  }

  function open_edit_cga_client_popup(cl, idx, roles) {
    var client =  JSON.parse(cl)
    open_admin_popup("edit_client_"+idx,'');
  }


  function open_edit_client_popup(cl, idx, roles) {
    var client =  JSON.parse(cl)
    document.getElementById("edit_client_first_name_" + idx).value = client.first_name;
    document.getElementById("edit_client_last_name_" + idx).value = client.last_name;
    document.getElementById("edit_client_email_" + idx).value = client.email;
    var i = 0;
    if (roles.length > 0) {
      for (i = 0; i < roles.length; i++) {
        current_role = roles[i].role_type;
        if (current_role == "UHE") {
          $('#telehealth_checkbox_'+idx).attr('checked', 'checked');
        } 
	      if (current_role == "ESITTER") {
          $('#esitter_checkbox_'+idx).attr('checked', 'checked');
        } 
	      if (current_role == "TECH") {
          $('#tech_checkbox_'+idx).attr('checked', 'checked');
        } 

        //if (current_role == "CHANNEL_ADMIN") {
        //  $('#edit_client_admin_level_'+idx).val('CHANNEL_ADMIN');
        //} 
	
        if (current_role == "CUSTOMER_ADMIN") {
          $('#edit_client_admin_level_'+idx).val('CUSTOMER_ADMIN');
        } 

        // Super Admin should either not show in users or it should show with this uncommented 
	      //if (current_role == "SUPER_ADMIN") {
        //  $('#edit_client_admin_level_'+idx).val('CUSTOMER_ADMIN');
        //} 

      }
    }	  
    open_admin_popup("edit_client_"+idx,'');
  }

  function open_edit_clinician_popup(clinic, clinic_phones, idx) {
    var clinician =  JSON.parse(clinic)
    document.getElementById("edit_clinician_prefix_" + idx).value = clinician.prefix;    
    document.getElementById("edit_clinician_first_name_" + idx).value = clinician.first_name;
    document.getElementById("edit_clinican_last_name_" + idx).value = clinician.last_name;
    var i = 0
    for (i = 0; i < clinic_phones.length; i++) {
      switch(i) {
	case 0: 		      
          document.getElementById("clinician_phone_one_" + idx).value = clinic_phones[i].cell_phone.replace("+1","").replace("+61","").replace("+44","");
          $("#flag1_"+idx).removeClass();
          $("#flag1_"+idx).addClass('flag-icon');
          $("#flag1_"+idx).addClass("flag-icon-" + clinic_phones[i].country_phone_abbv);
          document.getElementById("flag1_value_"+idx).value =  clinic_phones[i].country_phone_abbv;
		      
          break;
	case 1:
	  document.getElementById("clinician_phone_two_" + idx).value = clinic_phones[i].cell_phone.replace("+1","").replace("+61","").replace("+44","");
	  //Set Flag Icon
          $("#flag2_"+idx).removeClass();
          $("#flag2_"+idx).addClass('flag-icon');
          $("#flag2_"+idx).addClass("flag-icon-" +clinic_phones[i].country_phone_abbv);
          //$("#clinician_phone2_"+idx).removeClass('hidden')
	  //Set Flag Value
          document.getElementById("flag2_value_"+idx).value =  clinic_phones[i].country_phone_abbv;

          //Set Add New Cursor 
          openPhone(1, idx);
        
          break;
	case 2:
      	  document.getElementById("clinician_phone_three_" + idx).value = clinic_phones[i].cell_phone.replace("+1","").replace("+61","").replace("+44","");
          $("#flag3_"+idx).removeClass();
          $("#flag3_"+idx).addClass('flag-icon');
          $("#flag3_"+idx).addClass("flag-icon-" +clinic_phones[i].country_phone_abbv);
          $("#clinician_phone3_"+idx).removeClass('hidden')
          document.getElementById("flag3_value_"+idx).value =  clinic_phones[i].country_phone_abbv;	
          openPhone(2, idx);
		      
      }
    }
  
    open_admin_popup('edit_clinician_'+idx,'')  
  }


  function open_edit_technician_popup(tech, idx) {
    var technician =  JSON.parse(tech)
    if (technician.phone_number != null) {
      document.getElementById("edit_tech_phone_" + idx).value = technician.phone_number.replace("+1","").replace("+61","").replace("+44","");
      $("#flag1_"+idx).removeClass();
      $("#flag1_"+idx).addClass('flag-icon');
      $("#flag1_"+idx).addClass("flag-icon-" +technician.country_phone_abbv);
    }
   
    document.getElementById("edit_tech_email_" + idx).value = technician.email;
    document.getElementById("edit_tech_first_name_" + idx).value = technician.first_name;
    document.getElementById("edit_tech_last_name_" + idx).value = technician.last_name;


    open_admin_popup("edit_technician_"+idx,'');	  
  }

  function open_edit_building_popup( idx) {
    var building =  JSON.parse(document.getElementById('build_' + idx).textContent);
    document.getElementById("edit_building_name_" + idx).value = building.name;
    document.getElementById("edit_building_address_" + idx).value = building.address1;
    document.getElementById("edit_building_city_" + idx).value = building.city;    
    document.getElementById("edit_building_state_" + idx).value = building.state;    
    document.getElementById("edit_building_zip_" + idx).value = building.zip;
    //document.getElementById("edit_building_country_" + idx).value = building.country;
    open_admin_popup("edit_building_"+idx,'');	  
  }

  function open_edit_room_popup( idx) {
    var room =  JSON.parse(document.getElementById('rm_' + idx).textContent);
    document.getElementById("edit_room_number_" + idx).value = room.name;
    open_admin_popup("edit_room_"+idx,'');	  
  }

  
  // Update popup widget

  function update_cga_group_info(gp, idx) {
    var group =  JSON.parse(gp)	
    var name = document.getElementById("edit_group_name_"+idx).value;
    var layerx = document.getElementById("edit_group_layerx_"+idx).value;
    var layerx_username = document.getElementById("edit_group_layerx_username_"+idx).value;
    var layerx_dashboard_id = document.getElementById("edit_group_layerx_dashboard_"+idx).value;
    var auto_reboot = document.getElementById("edit_group_auto_reboot_"+idx).value;
  
    close_admin_popup('edit_group_' + idx)
	  
    $.ajax({
       type: "GET", 
       url: "/admin_panel/admin/update_cga_group/?group_id=" + group.id + "&name=" + name + "&layerx=" + layerx + "&layerx_username=" + layerx_username + "&layerx_dashboard_id=" + layerx_dashboard_id + "&auto_reboot=" + auto_reboot, 
       error: function() {
	    if (name == "") {
              alert('Channel name cannot be empty.');
	    }
	    else {
              alert('Channel with name ' + name + ' already exists.');
	    }
        }});
  }
 
  function update_cga_client_info(cl, idx) {
    var client =  JSON.parse(cl)	
    var first_name = document.getElementById("edit_client_first_name_"+idx).value;
    var last_name = document.getElementById("edit_client_last_name_"+idx).value;
    var email = document.getElementById("edit_client_email_"+idx).value;	  
    var admin_level = document.getElementById("edit_client_admin_level_"+idx).value;
    var uhe = document.getElementById("telehealth_checkbox_"+idx).checked;
    var esitter = document.getElementById("esitter_checkbox_"+idx).checked;
    var tech = document.getElementById("tech_checkbox_"+idx).checked;

	  


    close_admin_popup('edit_client_' + idx);
	  
    $.ajax({
       type: "GET", 
       url: "/admin_panel/admin/update_cga_client/?client_id=" + client.id + "&first_name=" + first_name + "&last_name=" + last_name + "&email=" + email + "&admin_level=" + admin_level + "&uhe=" + uhe + "&esitter=" + esitter + "&tech=" + tech, 
       error: function() {
            alert('Admin with email ' + email + ' already exists');
        }});
  }
 
  function update_client_info(cl, idx) {
    var client =  JSON.parse(cl)	
    var first_name = document.getElementById("edit_client_first_name_"+idx).value;
    var last_name = document.getElementById("edit_client_last_name_"+idx).value;
    var email = document.getElementById("edit_client_email_"+idx).value;

    var admin_level = document.getElementById("edit_client_admin_level_"+idx).value;
    var uhe = document.getElementById("telehealth_checkbox_"+idx).checked;
    var esitter = document.getElementById("esitter_checkbox_"+idx).checked;
    var tech = document.getElementById("tech_checkbox_"+idx).checked;

	  
    close_admin_popup('edit_client_' + idx);
	  
	  
    $.ajax({
       type: "GET", 
       url: "/admin_panel/cga/update_client/?client_id=" + client.id + "&first_name=" + first_name + "&last_name=" + last_name + "&email=" + email + "&admin_level=" + admin_level + "&uhe=" + uhe + "&esitter=" + esitter + "&tech=" + tech, 
 
       error: function() {
            alert('Admin with email ' + email + ' already exists');
        }});
  }

  function update_clinician_info(clinic, idx) {
    var clinician =  JSON.parse(clinic)	
    var prefix = document.getElementById("edit_clinician_prefix_" + idx).value;
    var first_name = document.getElementById("edit_clinician_first_name_" + idx).value;
    var last_name = document.getElementById("edit_clinican_last_name_" + idx).value;

    var phone1 = document.getElementById("clinician_phone_one_" + idx).value ;
    var phone2 = document.getElementById("clinician_phone_two_" + idx).value;	  
    var phone3 = document.getElementById("clinician_phone_three_" + idx).value;

	  
    var flag1 = document.getElementById("flag1_value_" + idx).value;
    var flag2 = document.getElementById("flag2_value_" + idx).value;	  
    var flag3 = document.getElementById("flag3_value_" + idx).value;	
	  
    close_admin_popup('edit_clinician_' + idx);    
    $.ajax("/admin_panel/client/update_clinician/?clinic_id=" + clinician.id + "&prefix=" + prefix + "&first_name=" + first_name + "&last_name=" + last_name +  "&phone_number1=" + phone1 + "&flag_1=" + flag1 + "&phone_number2=" + phone2 + "&flag_2=" + flag2  + "&phone_number3=" + phone3 + "&flag_3=" + flag3);
	  
  }

   function update_building_info(building_id,idx) {
    var name = document.getElementById("edit_building_name_" + idx).value;
    var address = document.getElementById("edit_building_address_" + idx).value;
    var city = document.getElementById("edit_building_city_" + idx).value;
    var state = document.getElementById("edit_building_state_" + idx).value;
    var zip = document.getElementById("edit_building_zip_" + idx).value;
    //var country = document.getElementById("edit_building_country_" + idx).value;
    var country = ''	   
    close_admin_popup('edit_building_' + idx);    

    $.ajax({
      type: 'GET',
      url: "/admin_panel/admin/update_building/?build_id=" + building_id + "&name=" + clean_bad_characters(name) + "&address=" + address + "&city=" + city + "&state=" + state + "&zip=" + zip + "&country=" + country, 
      error: function() {
        if (name == "") {
          alert("Location name cannot be empty.");
        }
        else {
          alert('Location with name ' + name + ' already exists.');
	      }
      }});
  }

  function update_endpoint_info(rm, idx) {
    var name = document.getElementById("edit_room_number_"+idx).value;
    $.ajax({
       type: "GET", 
       url: "/admin_panel/admin/update_endpoint/?endpoint_id=" + rm + "&name=" + name + '&dnue=true', 
       success: function() { 
         if (window.location.href.includes("health")) {
           window.location.reload(true); 
         }
       },
       error: function() {
            alert('Room with name ' + name + ' already exists.');
        }});
  }

  function update_room_info(room_id, idx) {
    var name = document.getElementById("edit_room_number_"+idx).value;
    close_admin_popup('edit_room_' + idx);    

    $.ajax({
       type: "GET", 
       url: "/admin_panel/admin/update_room/?room_id=" + room_id + "&name=" + clean_bad_characters(name), 
       error: function() {
         if (name == "") {
           alert("Unit name cannot be empty.");
         }
         else {
            alert('Unit with name ' + name + ' already exists.');
	      }
        }});
  }

  function update_tech_info(tech, idx) {
    var technician =  JSON.parse(tech)	
    var number = document.getElementById("edit_tech_phone_" + idx).value;
    var country_phone_abbv = document.getElementById("flag1_value_" + idx).value;
    var first_name = document.getElementById("edit_tech_first_name_" + idx).value;
    var last_name = document.getElementById("edit_tech_last_name_" + idx).value;
    var email = document.getElementById("edit_tech_email_" + idx).value;
    close_admin_popup('edit_technician_' + idx);

    $.ajax({ type: 'GET',
	    url: "/admin_panel/admin/update_technician/?tech_id=" + technician.id + "&number=" + number + '&country_phone_abbv='+ country_phone_abbv  + "&first_name=" + first_name + "&last_name=" + last_name + "&email=" + email,       
  	    error: function() {
              alert('Admin with email ' + email + ' already exists');
          }});
  }

  // Refresh table & graphing data

  
  function loadSystemMonitorData(url){ 
    no_refresh_flag = document.getElementById("health_list_refresh_flag").HTML
    if (no_refresh_flag == "true") {   
    }
    else{
      var search_string = document.getElementById('endpoint_search').innerHTML;
      var filter_channel = document.getElementById('filter_channel').innerHTML;
      var filter_customer = document.getElementById('filter_customer').innerHTML;
      var ss,fc,fcu = '';
      var filter=false;
      if (search_string.length > 0) { ss=search_string; filter=true;} 
      if (filter_channel.length > 0) { fc=filter_channel; filter=true;} 
      if (filter_customer.length > 0) { fcu=filter_customer; filter=true;}

      if (filter) { 
        var url_string = "/" + url + "?ss=" + ss + "&fc=" + fc + "&fcu=" + fcu;  
      }
      else {
        var url_string = "/" + url + window.location.search
      }
      $.get(url_string)
    }
  };


  function loadSystemGraphData(url){  
    camera_good_height = document.getElementById("camera_good_bar_id").style.height
    //usb0_height = document.getElementById("usb0_bar_id").style.height	        
    //usb1_height = document.getElementById("usb1_bar_id").style.height	        
    //polling_height = document.getElementById("polling_bar_id").style.height	  
    polling_height = 0
    version_height = document.getElementById("version_bar_id").style.height 	        
    online_height = document.getElementById("online_bar_id").style.height
    var url_string = "/" + url + "?version_height=" + version_height.substring(0,version_height.length-1) + /*"&usb1_height=" + usb1_height.substring(0,usb1_height.length-1) + "&usb0_height=" + usb0_height.substring(0,usb0_height.length-1) +*/ "&camera_good_height=" + camera_good_height.substring(0,camera_good_height.length-1) + "&online_height=" + online_height.substring(0,online_height.length-1)  ;  
    $.get(url_string)
  };

  function loadClients(admin_id) {
    var client_search_string = document.getElementById('search_client').value;
    var url_string = "/fetch_accts_for_clients?clients_search_string=".concat(client_search_string) + "&admin_id="+admin_id
    $.get(url_string)
    };

 function loadCgas() {
    var cgas_search_string = document.getElementById('search_cgas').value;
    var url_string = '/fetch_accts_for_client_admin?cga_search_string='.concat(cgas_search_string)
    $.get(url_string)
    };

 function loadCgaGroups() {
    var cga_group_search_string = document.getElementById('search_cga_group').value;
    var url_string = '/fetch_groups_for_cga?cga_group_search_string='.concat(cga_group_search_string)
    $.get(url_string)
    };

  function loadClientList(admin_id) {
    var client_list_search_string = document.getElementById('search_client_list').value;
    var url_string = "/fetch_client_list?client_list_search_string=".concat(client_list_search_string) + "&admin_id="+admin_id	    
    $.get(url_string)
    };

  // Table Filters CGA/CUSTOMERS/GROUPS
  
  function filterCgas(is_super_admin) {
    var cgas_filter = document.getElementById('filter_cgas').value;//Admin Level CGA
    if (is_super_admin == 'true') {
      var channel_filter = document.getElementById('filter_channel_id').value;//Channel Filter CGA
    }
    var cgas_search_string = document.getElementById('search_cgas').value;//Search Bar Channels	  
    var url_string = '/fetch_filter_accts_for_client_admin?role='.concat(cgas_filter) + '&channel_id=' + channel_filter + '&cga_search_string=' + cgas_search_string; 
    $.get(url_string)
  };

  function reset_cga_filter(is_super_admin) {
    document.getElementById('filter_cgas').value = "NONE";
    document.getElementById('search_cgas').value = "";	  
    if (is_super_admin == 'true') {
      document.getElementById('filter_channel_id').value = "";
      filterCgas('true');	  	    
    }
    else {
      filterCgas('false');	  
    }
  }

  function filterCustomers(is_super_admin) {
    if (is_super_admin == 'true') {
      var channel_filter = document.getElementById('filter_channel_id').value; // Channel Filter Customers
    }
    else {
      var channel_filter = '';
    }
    //var translation_filter = document.getElementById('filter_translation').value; // Channel Filter Customers	  
    var ar_filter = document.getElementById('filter_ar').value; // Advanced Reporting Customers
    var customer_search_string = document.getElementById('search_customers').value; // Search Bar Customers
    var url_string = '/fetch_filter_accts_for_customers?advanced_reporting=' + ar_filter + '&customer_search_string=' + customer_search_string + '&channel_id=' + channel_filter; 
    $.get(url_string)
  };

  function reset_customer_filter(is_super_admin) {
    if (is_super_admin == 'true') {
      document.getElementById('filter_channel_id').value = ""
    }
    document.getElementById('filter_ar').value = ""
    document.getElementById('search_customers').value = ""
    filterCustomers()	  
  }

  function filterGroups() {
    var ar_filter = document.getElementById('filter_ar').value; // Advanced Reporting Groups  
    var group_search_string = document.getElementById('search_cgas').value; //Search Bar Groups	  
    var url_string = '/fetch_filter_accts_for_groups?advanced_reporting=' + ar_filter + '&groups_search_string=' + group_search_string; 	  
    $.get(url_string)
  }

  function reset_groups_filter() {
    document.getElementById('filter_ar').value = "";	  
    filterGroups();
  }

 function filterBuildings() {
    var buildings_search_string = document.getElementById('search_buildings').value; //Search Bar Buildings	  
    var url_string = '/fetch_filter_accts_for_buildings?buildings_search_string=' + buildings_search_string; 	  
    $.get(url_string)
  }

 function filterRooms() {
    var rooms_search_string = document.getElementById('search_rooms').value; //Search Bar Rooms	 
    var selected_building = document.getElementById('building_selected').innerHTML; // If drill down from buildings is available	 

     var url_string = '/fetch_filter_accts_for_rooms?rooms_search_string=' + rooms_search_string + "&building_selected=" + selected_building; 
    $.get(url_string)
  }


  function filterEndpoints() {
    var endpoints_search_string = document.getElementById('search_endpoints').value; //Search Bar Endpoints	 
    var selected_room = document.getElementById('room_selected').innerHTML; // If drill down from Units/Rooms is available	 
  
    var url_string = '/fetch_filter_accts_for_endpoints?endpoint_search_string=' + endpoints_search_string + "&room_selected=" + selected_room; 
    $.get(url_string)
  
  }

  // Health Flag reporting
  $(document).ready(function() {

    health_monitor_update_needed_admin = document.getElementById("health_monitor_flag_admin");
    if (health_monitor_update_needed_admin != null) {
       var health_freq = document.getElementById("health_monitor_freq").innerHTML;
       var timer = setInterval(function(){loadSystemMonitorData('fetch_data_for_system_monitor_admin');}, health_freq);
       //var timer1 = setInterval(function(){loadSystemGraphData('fetch_data_for_system_graph_admin');}, health_freq);
    }

    $("#static-ip-toggle").change(function(){
      var edit_static = document.getElementById("static_flag").innerHTML;
      var endpoint_id = document.getElementById("endpoint_id").innerHTML;
      var static_ip = document.getElementById('static_ip_div')
      
        if (edit_static.trim() == "0" || edit_static.trim() == "") {
          document.getElementById("static_flag").innerHTML = "1";
          //$.ajax("/admin_panel/client/update_static_ip_status/?endpoint_id=" + endpoint_id + "&status=" + 1);
          $('#static_ip_div').removeClass("endpoint_settings_static_ip_widget_closed");
          $('#static_ip_div').addClass("endpoint_settings_static_ip_widget_open");	  
        }
        else {
          document.getElementById("static_flag").innerHTML = "0";
          //$.ajax("/admin_panel/client/update_static_ip_status/?endpoint_id=" + endpoint_id + "&status=" + 0);      
          $('#static_ip_div').removeClass("endpoint_settings_static_ip_widget_open");
          $('#static_ip_div').addClass("endpoint_settings_static_ip_widget_closed");	
        }
      });


  /* Navigation */
     $(".has_sub > a").click(function(e){
      e.preventDefault();
      var menu_li = $(this).parent("li");
      var menu_ul = $(this).next("ul");

      if(menu_li.hasClass("open")){
        menu_ul.slideUp(350);
        menu_li.removeClass("open")
      }
      else{
        $("#nav > li > ul").slideUp(350);
        $("#nav > li").removeClass("open");
        menu_ul.slideDown(350);
        menu_li.addClass("open");
      }
    });

    // MAsks	  
    $('.static_ip_inputs').mask('099.099.099.099');
    phoneNumberMask();

  });



function updateBannerColor(idx) {
   // document.getElementById('color_div_' + idx).style.backgroundColor = "";
   // document.getElementById('color_div_' + idx).style.backgroundColor =  document.getElementById('banner_color_input_'+ idx).value;
    document.getElementById("color_banner_branding_" + idx).value = document.getElementById('banner_color_input_'+ idx).value;

}

function updateFontColor(idx) {
    //document.getElementById('color_example_label_'+idx).style.color = "";
    //document.getElementById('color_example_label_'+idx).style.color =  document.getElementById('font_color_input_'+ idx).value;
    document.getElementById("color_font_branding_" + idx).value = document.getElementById('font_color_input_'+ idx).value;
}

function getFontColor(idx) {
  var color_font = $("#color_font_branding_" +idx).val();
  document.getElementById("font_color_input_"+ idx).value = color_font; 
  //document.getElementById('color_example_label_'+idx).style.color = color_font;
}

function getBannerColor(idx) {
  var color_banner = $("#color_banner_branding_"+idx).val();
  document.getElementById("banner_color_input_"+ idx).value = color_banner; 
  //document.getElementById('color_div_'+idx).style.background = color_banner;
}


function versionFilter(url) {
    var url_string = "/" + url + "?version_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)
}

function usb0Filter(url) {
    var url_string = "/" + url + "?usb0_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)
}

function usb1Filter(url) {
    var url_string = "/" + url + "?usb1_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)
}

function cameraFilter(url) {
    var url_string = "/" + url + "?camera_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)	    
}

function cameraFilter(url) {
    var url_string = "/" + url + "?camera_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)	    
}

function pollingFilter(url) {
    var url_string = "/" + url + "?polling_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)  
}


function inACallFilter(url) {
    var url_string = "/" + url + "?in_a_call_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)
}

function configured_filter(url) {
    var url_string = "/" + url + "?configured_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)
}


function onlineFilter(url) {
    var url_string = "/" + url + "?online_filter=true";  
    $.get(url_string)
    resetRefreshFlag('true', url)
}

function resetRefreshFlag(flag, url)
{
  document.getElementById("health_list_refresh_flag").HTML = flag;  
  if (flag == "false"){
    loadSystemMonitorData(url);
    document.getElementById("search_endpoints").value = '';
  }
}

function toggleHidden(element_id) {
  var el = $(element_id);
  if (el.hasClass('hidden')) {
    el.removeClass('hidden');
  }
  else{
    el.addClass('hidden');
  }
}

function toggleAllPermission(checkbox_all) {
  if (checkbox_all.id == 'uhe_checkboxes_all') {
    checkboxes = document.getElementsByClassName('uhe_permission_selector');
  }
  if (checkbox_all.id == 'esitter_checkboxes_all') {	
    checkboxes = document.getElementsByClassName('iobserver_permission_selector');
  }
  if (checkbox_all.id == 'tech_checkboxes_all') {	
    checkboxes = document.getElementsByClassName('tech_permission_selector');
  }
	
  if (checkbox_all.checked) {
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = true;
    }
  }
  else{
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = false;
    }
  }
}

function toggleSinglePermission(checkbox) {
  if (checkbox.checked) {
    if (checkbox.id.includes("telehealth_permissions")) {
      checkbox_all = document.getElementById('uhe_checkboxes_all');
      checkboxes = document.getElementsByClassName('uhe_permission_selector');
    }
    if (checkbox.id.includes("esitter_permissions")) {
      checkbox_all = document.getElementById('esitter_checkboxes_all');
      checkboxes = document.getElementsByClassName('iobserver_permission_selector');
    }
    if (checkbox.id.includes("tech_permissions")) {	
      checkbox_all = document.getElementById('tech_checkboxes_all');
      checkboxes = document.getElementsByClassName('tech_permission_selector');
    }
	  
    select_flag = true;
    for(var i=0, n=checkboxes.length;i<n;i++) {
      if (checkboxes[i].checked == false) {
        select_flag = false;
	break; 
      }
    }
    if (select_flag) {
      checkbox_all.checked = true;
    }
    else {
      checkbox_all.checked = false;
    }
  }
  else { 
    if (checkbox.id.includes("telehealth_permissions")) {
      document.getElementById('uhe_checkboxes_all').checked = false;
    }
    if (checkbox.id.includes("esitter_permissions")) {
      document.getElementById('esitter_checkboxes_all').checked = false;
    }
    if (checkbox.id.includes("tech_permissions")) {
      document.getElementById('tech_checkboxes_all').checked = false;
    }
  }
}

function permissionInitiation(tech) {
  
  uhe_checkbox_all = document.getElementById('uhe_checkboxes_all');
  checkbox_count = document.getElementById('contextual_permission_count');
  uhe_checkboxes = document.getElementsByClassName('uhe_permission_selector');
  uhe_select_flag = true;
  let checkbox_counter = 0;

  for(var i=0; i < uhe_checkboxes.length; i++) {
    if (uhe_checkboxes[i].checked == false) {
      if (uhe_select_flag) uhe_select_flag = false;
    } else {
      checkbox_counter = checkbox_counter + 1;
    }
  }
  if (uhe_select_flag) {
    uhe_checkbox_all.checked = true;
  }
  else {
    uhe_checkbox_all.checked = false;
  }

  iobserver_checkbox_all = document.getElementById('esitter_checkboxes_all');
  iobserver_checkboxes = document.getElementsByClassName('iobserver_permission_selector');
  iobserver_select_flag = true;
  for(var j=0; j < iobserver_checkboxes.length; j++) {
    if (iobserver_checkboxes[j].checked == false) {
      if (iobserver_select_flag) iobserver_select_flag = false;      
    } else {
      checkbox_counter = checkbox_counter + 1;
    }
  }
  if (iobserver_select_flag) {
    iobserver_checkbox_all.checked = true;
  }
  else {
    iobserver_checkbox_all.checked = false;
  }

  tech_checkbox_all = document.getElementById('tech_checkboxes_all');
  tech_checkboxes = document.getElementsByClassName('tech_permission_selector');
  tech_select_flag = true;
  for(var k=0; k < tech_checkboxes.length; k++) {
    if (tech_checkboxes[k].checked == false) {
      if (tech_select_flag) tech_select_flag = false;
    } else {
      checkbox_counter = checkbox_counter + 1;
    }
  }
  if (tech_select_flag) {
    tech_checkbox_all.checked = true;
  }
  else {
    tech_checkbox_all.checked = false;
  }
  checkbox_count.value = checkbox_counter;
}



function toggleAllBulkPermission() {
  bulk_select_all_checkbox = document.getElementById('select_all_rooms');
  bulk_checkboxes = document.getElementsByClassName('bulk_selector');

  if (bulk_select_all_checkbox.checked) {
    for(var i=0, n=bulk_checkboxes.length;i<n;i++) {
      bulk_checkboxes[i].checked = true;
    }
  }
  else{
    for(var i=0, n=bulk_checkboxes.length;i<n;i++) {
      bulk_checkboxes[i].checked = false;
    }
  }
}


function dialRoomFromAdmin(machine_name) {
  var obj = new Object();
  obj.machine_name = machine_name;
  obj.admin_id = document.getElementById('current_admin_id').innerHTML;
  var jsonString = JSON.stringify(obj);
  $.ajax({
     url:"../../endpoint/get_endpoint_details",
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
       window.open(url_string, 'iObserver','width=1000');
     }
  });
}

function toggleSingleBulkPermission(checkbox) {
  bulk_select_all_checkbox = document.getElementById('select_all_rooms');
  bulk_checkboxes = document.getElementsByClassName('bulk_selector');

  if (checkbox.checked) {
	  
    select_flag = true;
    for(var i=0, n=bulk_checkboxes.length;i<n;i++) {
      if (bulk_checkboxes[i].checked == false) {
        select_flag = false;
	break; 
      }
    }
    if (select_flag) {
      bulk_select_all_checkbox.checked = true;
    }
    else {
      bulk_select_all_checkbox.checked = false;
    }
  }
  else { 
    bulk_select_all_checkbox.checked = false;
  }
}

function checkAlertURL(){
  if ($('#elert_url').val().indexOf(" ") > -1 || $('#elert_url').val().indexOf('\t') > -1 || $('#elert_url').val().indexOf('http') < 0   ) {
    $('#elert_error_div').removeClass('hidden');
  } 
  else {
    console.log('submitting form');
    document.getElementById('elert_form').submit();
  }
}

function clean_bad_characters(text) 
{
  text = text.replace(/#/g, "/*pound*/");
  text = text.replace(/%/g, "/*percent*/");
  text = text.replace(/&/g, "/*and*/");
  text = text.replace(/\+/g, "/*plus*/");
  text = text.replace(/;/g, "/*semi*/");
  return text;
}

//Pattern recoginition for static_ip
(function(g){"function"===typeof define&&define.amd?define(["jquery"],g):g(window.jQuery||window.Zepto)})(function(g){var y=function(a,f,d){var k=this,x;a=g(a);f="function"===typeof f?f(a.val(),void 0,a,d):f;k.init=function(){d=d||{};k.byPassKeys=[9,16,17,18,36,37,38,39,40,91];k.translation={0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}};k.translation=g.extend({},k.translation,d.translation);k=g.extend(!0,{},k,d);a.each(function(){!1!==
d.maxlength&&a.attr("maxlength",f.length);d.placeholder&&a.attr("placeholder",d.placeholder);a.attr("autocomplete","off");c.destroyEvents();c.events();var b=c.getCaret();c.val(c.getMasked());c.setCaret(b+c.getMaskCharactersBeforeCount(b,!0))})};var c={getCaret:function(){var b;b=0;var e=a.get(0),c=document.selection,e=e.selectionStart;if(c&&!~navigator.appVersion.indexOf("MSIE 10"))b=c.createRange(),b.moveStart("character",a.is("input")?-a.val().length:-a.text().length),b=b.text.length;else if(e||
"0"===e)b=e;return b},setCaret:function(b){if(a.is(":focus")){var e;e=a.get(0);e.setSelectionRange?e.setSelectionRange(b,b):e.createTextRange&&(e=e.createTextRange(),e.collapse(!0),e.moveEnd("character",b),e.moveStart("character",b),e.select())}},events:function(){a.on("keydown.mask",function(){x=c.val()});a.on("keyup.mask",c.behaviour);a.on("paste.mask drop.mask",function(){setTimeout(function(){a.keydown().keyup()},100)});a.on("change.mask",function(){a.data("changeCalled",!0)});a.on("blur.mask",
function(b){b=g(b.target);b.prop("defaultValue")!==b.val()&&(b.prop("defaultValue",b.val()),b.data("changeCalled")||b.trigger("change"));b.data("changeCalled",!1)});a.on("focusout.mask",function(){d.clearIfNotMatch&&c.val().length<f.length&&c.val("")})},destroyEvents:function(){a.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled")},val:function(b){var e=a.is("input");return 0<arguments.length?e?a.val(b):a.text(b):e?a.val():a.text()},getMaskCharactersBeforeCount:function(b,
e){for(var a=0,c=0,d=f.length;c<d&&c<b;c++)k.translation[f.charAt(c)]||(b=e?b+1:b,a++);return a},determineCaretPos:function(b,a,d,h){return k.translation[f.charAt(Math.min(b-1,f.length-1))]?Math.min(b+d-a-h,d):c.determineCaretPos(b+1,a,d,h)},behaviour:function(b){b=b||window.event;var a=b.keyCode||b.which;if(-1===g.inArray(a,k.byPassKeys)){var d=c.getCaret(),f=c.val(),n=f.length,l=d<n,p=c.getMasked(),m=p.length,q=c.getMaskCharactersBeforeCount(m-1)-c.getMaskCharactersBeforeCount(n-1);p!==f&&c.val(p);
!l||65===a&&b.ctrlKey||(8!==a&&46!==a&&(d=c.determineCaretPos(d,n,m,q)),c.setCaret(d));return c.callbacks(b)}},getMasked:function(b){var a=[],g=c.val(),h=0,n=f.length,l=0,p=g.length,m=1,q="push",s=-1,r,u;d.reverse?(q="unshift",m=-1,r=0,h=n-1,l=p-1,u=function(){return-1<h&&-1<l}):(r=n-1,u=function(){return h<n&&l<p});for(;u();){var v=f.charAt(h),w=g.charAt(l),t=k.translation[v];if(t)w.match(t.pattern)?(a[q](w),t.recursive&&(-1===s?s=h:h===r&&(h=s-m),r===s&&(h-=m)),h+=m):t.optional&&(h+=m,l-=m),l+=
m;else{if(!b)a[q](v);w===v&&(l+=m);h+=m}}b=f.charAt(r);n!==p+1||k.translation[b]||a.push(b);return a.join("")},callbacks:function(b){var e=c.val(),g=c.val()!==x;if(!0===g&&"function"===typeof d.onChange)d.onChange(e,b,a,d);if(!0===g&&"function"===typeof d.onKeyPress)d.onKeyPress(e,b,a,d);if("function"===typeof d.onComplete&&e.length===f.length)d.onComplete(e,b,a,d)}};k.remove=function(){var a=c.getCaret(),d=c.getMaskCharactersBeforeCount(a);c.destroyEvents();c.val(k.getCleanVal()).removeAttr("maxlength");
c.setCaret(a-d)};k.getCleanVal=function(){return c.getMasked(!0)};k.init()};g.fn.mask=function(a,f){this.unmask();return this.each(function(){g(this).data("mask",new y(this,a,f))})};g.fn.unmask=function(){return this.each(function(){try{g(this).data("mask").remove()}catch(a){}})};g.fn.cleanVal=function(){return g(this).data("mask").getCleanVal()};g("*[data-mask]").each(function(){var a=g(this),f={};"true"===a.attr("data-mask-reverse")&&(f.reverse=!0);"false"===a.attr("data-mask-maxlength")&&(f.maxlength=
!1);"true"===a.attr("data-mask-clearifnotmatch")&&(f.clearIfNotMatch=!0);a.mask(a.attr("data-mask"),f)})});

