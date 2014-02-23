class List < ActiveRecord::Base
  attr_accessible :board_id, :cardinality, :name, :ordered_card_ids, :archived

  validates :board_id, presence: true

  before_create :ensure_cardinality

  belongs_to :board
  has_many :cards

  def ensure_cardinality
    max_cardinality = board.lists.pluck(:cardinality).max || 0
    self.cardinality = max_cardinality + 1
  end

  def ordered_card_ids=(ids)
    set_cardinalities(ids) if ids
  end

  def set_cardinalities(ordered_ids)
    # TODO: refactor this method.
    values = []
    ordered_ids.each_with_index do |unsafe_id, cardinality|
      safe_id = unsafe_id.to_i # To prevent SQL injection.
      values << "(#{safe_id}, #{cardinality})"
    end

    value_string = values.join(', ')
    list_id = self.id

    # TODO: Write explanation.
    List.connection.execute(<<-SQL)
      UPDATE
        cards AS l
      SET
        cardinality = c.cardinality
          FROM
            (values #{ value_string }) as c (id, cardinality)
      WHERE
        c.id = l.id
      AND
        l.list_id = #{ list_id }
SQL
  end
end
