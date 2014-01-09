class Board < ActiveRecord::Base
  attr_accessible :name, :owner_id, :ordered_list_ids

  validates :name, :owner_id, presence: true

  belongs_to :owner,
             foreign_key: :owner_id,
             class_name: 'User',
             inverse_of: :boards

  has_many :lists

  def set_cardinalities(ordered_ids)
    values = []
    ordered_ids.each_with_index do |unsafe_id, cardinality|
      safe_id = unsafe_id.to_i # To prevent SQL injection.
      values << "(#{safe_id}, #{cardinality})"
    end

    value_string = values.join(', ')
    board_id = self.id

    Board.connection.execute(<<-SQL)
      UPDATE
        lists AS l
      SET
        cardinality = c.cardinality
          FROM
            (values #{ value_string }) as c (id, cardinality)
      WHERE
        c.id = l.id
      AND
        l.board_id = #{ board_id }
SQL
  end









end
