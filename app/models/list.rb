class List < ActiveRecord::Base
  attr_accessible :board_id, :cardinality, :name, :cards_attributes

  belongs_to :board
  has_many :cards
  accepts_nested_attributes_for :cards
end
