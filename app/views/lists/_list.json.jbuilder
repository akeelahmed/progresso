json.(list, :name, :cardinality, :id)
json.cards list.cards do |card|
  json.(card, :body, :list_id, :cardinality, :completed)
end
