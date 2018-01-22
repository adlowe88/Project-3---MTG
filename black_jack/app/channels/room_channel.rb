class RoomChannel < ApplicationCable::Channel

  def subscribed
    stream_from "room_channel"
  end

  def speak(data)
    client_action = data[ "message" ]
    @game = Game.find_by( started: false ) || Game.find( @current_user.game.id )
    @current_user.user_action( client_action[ "user_action" ] ) if client_action[ "user_action" ]
  end


end
