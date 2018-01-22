App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->

  disconnected: ->

  received: ->

  speak: ( message ) ->
    @perform 'speak', message: message

$( document ).on "click", "[data-behavior~=room_speaker]", ( event ) ->
  if event.target.id is "join"
    App.room.speak { "join": "join" }

    event.preventDefault()
