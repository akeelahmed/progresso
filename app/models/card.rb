class Card < ActiveRecord::Base
  attr_accessible :body, :cardinality, :completed, :list_id
  validates :cardinality, uniqueness: { scope: :list_id }
  belongs_to :list
end
