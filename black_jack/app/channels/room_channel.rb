class RoomChannel < ApplicationCable::Channel

  def subscribed
    stream_from "room_channel"
  end

  def speak(data)
    client_action = data[ "message" ]
    @game = Game.find_by( started: false ) || Game.find( current_user.game.id ) 
  end


end
