jQuery.fn.exists = function(){ return this.length > 0; }

function checkLocations() {
  $.ajax({
     url:"/home/get_locations",
     dataType: "JSON",
     success: function(data) {
       locationSelect = document.getElementById("locationSelect");
       locationSelect.options.length = 0;
       if (data.locations.length > 1) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Required *';
         locationSelect.appendChild(option);
       }
       if (data.locations) {
         for (var i=0; i != data.locations.length; ++i) {
           var locInfo = data.locations[i];
           var option = document.createElement('option');
           option.value = locInfo.id;
           option.text = locInfo.name;
           locationSelect.appendChild(option);
         }
       }
       checkBuildings();
     }
   });
}

function checkBuildings() {
  var e=  document.getElementById("locationSelect");
  var loc_id = e.options[e.selectedIndex].value;
  $.ajax({
     url:"/home/get_buildings?loc_id=" + loc_id,
     dataType: "JSON",
     success: function(data) {
       buildingSelect = document.getElementById("buildingSelect");
       buildingSelect.options.length = 0;
       if (data.buildings.length > 1) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Required *';
         buildingSelect.appendChild(option);
       }
       if (data.buildings.length == 0) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Required *';
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
       checkRooms();
     }
   });
}

function checkRooms() {
  var e=  document.getElementById("buildingSelect");
  var loc_id = e.options[e.selectedIndex].value;
  $.ajax({
     url:"/home/get_rooms?loc_id=" + loc_id,
     dataType: "JSON",
     success: function(data) {
       roomSelect = document.getElementById("roomSelect");
       roomSelect.options.length = 0;
       if (data.rooms.length > 1) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Required *';
         roomSelect.appendChild(option);
       }
       if (data.rooms.length == 0) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Required *';
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
       checkEndpoints();
     }
   });
}


function checkEndpoints() {
  var e=  document.getElementById("roomSelect");
  var loc_id = e.options[e.selectedIndex].value;
  $.ajax({
     url:"/home/get_endpoints?loc_id=" + loc_id,
     dataType: "JSON",
     success: function(data) {
       endpointSelect = document.getElementById("endpointSelect");
       endpointSelect.options.length = 0;
       if (data.endpoints.length > 1) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Required *';
         endpointSelect.appendChild(option);
       }
       if (data.endpoints.length == 0) {
         var option = document.createElement('option');
         option.value = 0;
         option.text = 'Required *';
         endpointSelect.appendChild(option);
       }
       if (data.endpoints) {
         for (var i=0; i != data.endpoints.length; ++i) {
           var locInfo = data.endpoints[i];
           var option = document.createElement('option');
           option.value = locInfo.id;
           option.text = locInfo.name;
           endpointSelect.appendChild(option);
         }
       }
     }
   });
}


function checkLogin() {
  $.ajax({
     url:"/api/check_login",
     dataType: "JSON",
     success: function(data) {
       if (data.message == 'true') {
         user_signed_in(data.dr_name, data.user_id);
         loadAccount();
       } 
       else {
         //document.getElementById("e_m").innerHTML = data.message;
         //var er =  document.getElementById('error_message')
         //fadeIn(er, 'block');
       }
     }
  });
  // TEMPORARY!!!!
  // populateCallInfo();
  // showConfScreen();
}

function hideError() {
  fadeOut(document.getElementById('error_message'));
}


function user_signed_in(dr_name, user_id) {
  mediaUserId = user_id;
  //getMediaForSelf(user_id);
  document.getElementById("dr_name").innerHTML= dr_name;
  if (document.getElementById("top_dr_name")) {
    document.getElementById("top_dr_name").innerHTML= dr_name;
  }
  document.getElementById("user_id").innerHTML= user_id;
  if (document.getElementById("sign_in")) {
    document.getElementById("sign_in").classList.add('hidden');
    document.getElementById("right_of_header").classList.remove('hidden');
    document.getElementById("notif_header").classList.remove('hidden');
    document.getElementById("login_widget").classList.remove('sign_in');    
    var dp = document.getElementById("dial_patient");
    if (dp) {
      fadeIn(document.getElementById("dial_patient"));
      checkLocations();
    }
  }
}

function processLogin() {
  var jsonData = "{'user': { 'email': '" +  document.getElementById("user_email").value + "', 'password':'" + document.getElementById("user_password").value + "' } }";
  var email =  document.getElementById("user_email").value;
  var pw =  document.getElementById("user_password").value;
  var obj = new Object();
  var u_obj = new Object();
  u_obj.email = email;
  u_obj.password = pw;
  obj.user = u_obj;
  var jsonString = JSON.stringify(obj);
  $.ajax({
      url:"users/login",
     method: "POST",
     data: jsonString, 
     dataType: "JSON",
     format: 'js',
     contentType: "application/json",
     headers: {
       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
     },

     success: function(data) {
       if (data.message == 'true') {
         console.dir(data);
         defaultAudio = data.d_audio;
         defaultVideo = data.d_video;
         mediaUserId = data.user_id;
         user_signed_in(data.dr_name, data.user_id);
         load_conf_screen();
         loadAccount();
       } 
       else {
         if (data.message == undefined) {
           document.getElementById("e_m").innerHTML = 'Invalid Credentials';
           //swal({ title: "Invalid Credentials", text: "Please retry", type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false}); 
         }
         else {
           document.getElementById("e_m").innerHTML = data.message;
           //swal({ title: "Invalid Credentials", text: data.message, type: "info", showCancelButton: false, confirmButtonClass: "btn-primary", confirmButtonText: "OK", closeOnConfirm: false}); 
         }
         var er =  document.getElementById('error_message')
         fadeIn(er, 'block');
         setTimeout(function () {
           hideError();
         }, 3000);
       }
     }
  });
}

//   $("#user_login").submit();
//}

 
