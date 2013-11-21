class Card < ActiveRecord::Base
  attr_accessible :body, :cardinality, :is_completed, :list_id

  belongs_to :list
end
