class Board < ActiveRecord::Base
  attr_accessible :name, :owner_id

  belongs_to :owner, foreign_key: :owner_id, class_name: "User"
  has_many :lists
end
