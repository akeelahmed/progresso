class Board < ActiveRecord::Base
  attr_accessible :name, :owner_id, :lists_attributes

  validates :name, :owner_id, presence: true

  belongs_to :owner,
             foreign_key: :owner_id,
             class_name: 'User',
             inverse_of: :boards

  has_many :lists
  accepts_nested_attributes_for :lists
end
