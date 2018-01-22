App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->

  disconnected: ->

  received: ->

  speak: ( message ) ->
    @perform 'speak', message: message
