class List < ActiveRecord::Base
  attr_accessible :board_id, :cardinality, :name

  belongs_to :board
  has_many :cards
end
