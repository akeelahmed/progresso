json.(board, :name, :owner_id, :id)
json.lists board.lists do |list|
  json.(list, :name, :board_id, :cardinality, :id)
  json.cards list.cards do |card|
      json.(card, :completed, :body, :list_id, :cardinality, :id)
  end
end
