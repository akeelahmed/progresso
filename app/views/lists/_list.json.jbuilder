json.(list, :name, :cardinality, :id)
json.cards list.cards do |card|
  json.partial! 'cards/card', card: card
end
