json.array! @boards do |board|
  json.(board, :name, :owner_id)
  json.lists board.lists do |list|
      json.(list, :name, :board_id, :cardinality)
      json.cards list.cards do |card|
          json.(card, :completed, :body, :list_id, :cardinality)
      end
  end
end
