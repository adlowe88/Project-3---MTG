class Game < ApplicationRecord
  has_many :users
  has_many :cards

  def add_player( player )
    Message.create! content: "#{ player.username }: has joined the game"
  end
end
