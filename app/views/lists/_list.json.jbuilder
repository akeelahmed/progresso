json.(list, :name, :cardinality)
json.cards list.cards do |card|
  json.(card, :body, :list_id, :cardinality, :completed?)
end
