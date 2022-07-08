App.endpoint = App.cable.subscriptions.create { channel: "EndpointChannel", machine_name: "unspecified" },
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log("connected to the endpoint tunnel manager");

  disconnected: ->
    # Called when the subscription has been terminated by the server
    console.log("disconnected from the endpoint tunnel manager");

  received: (data) ->
    # Called when there's incoming data on the endpoint websocket for this channel
    console.log("command received from the endpoint API: " + JSON.stringify(data));

  respond: (response) ->
    @perform 'endpoint_response', response: response
