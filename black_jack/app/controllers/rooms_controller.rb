class RoomsController < ApplicationController
  def show
    if @current_user
      @messages = Message.all.reverse
      @game = join_or_create_game
      @game_cards = Card.where(id: @game.game_cards)
      @cards = @current_user.cards
    end
  end

  def join_or_create_game
    Game.last && !Game.last.started ? Game.last : Game.create
  end
end
