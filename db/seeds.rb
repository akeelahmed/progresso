ActiveRecord::Base.transaction do
  u = User.new
  u.provider = "github"
  u.uid = 896684
  u.name = "Dylan Patrick Clark"
  u.email = "dylanpatrickclark@gmail.com"
  u.username = "dylnclrk"
  u.gravatar = "e27bbd3cb993b3189075ac43ebdbc4ef"
  u.session_token = "PavOwUOE_YZsXvvRNCD7Ah3agJ8"
  u.save
    
  b1 = Board.create(owner_id: u.id, name: "first board")
  b2 = Board.create(owner_id: u.id, name: "second board")
  
  l1 = List.create(name: "first list", board_id: b1.id, cardinality: 0)
  l2 = List.create(name: "second list", board_id: b1.id, cardinality: 1)
  l3 = List.create(name: "third list", board_id: b1.id, cardinality: 2)
  l4 = List.create(name: "alpha list", board_id: b2.id, cardinality: 0)
  [l1, l2, l3, l4].each do |list|
    10.times do |i|
      Card.create(
        completed: (i%2 == 0),
        body: "this is some task",
        list_id: list.id,
        cardinality: i
      )
    end
  end
end