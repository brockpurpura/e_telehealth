function layerx(){
 
  var x_username = document.getElementById('x_name').innerHTML; 
  var x_id = "dashboard_id=" + document.getElementById('x_id').innerHTML; 
  var x_address = document.getElementById('report_url').innerHTML; 
  
  $.ajax({
    type: "POST", 
    url: x_address, 
    data: {
      "X-Remote-User": x_username,
      "X-Lxt-Query": x_id 
    },
    success: function(data){
      console.log(data);
        $("#layer_x_iframe").attr('src',"data:text/html;charset=utf-8," + escape(data))
    },
    error: function(data){
       console.log('ERROR LayerX');
       console.log(data);
       console.log(data.responseText);
        $("#layer_x_iframe").attr('src',"data:text/html;charset=utf-8," + escape(data.responseText));
        var _theframe = document.getElementById("layer_x_iframe");
        _theframe.contentWindow.location.href = _theframe.src;
    }
  });
}
