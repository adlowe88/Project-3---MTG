class Game < ApplicationRecord
  has_many :users
  has_many :cards
end
