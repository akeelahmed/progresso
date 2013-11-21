class CreateBoardsListsCards < ActiveRecord::Migration
  def create
    create_table :boards do |t|
      t.string :name, null: false, default: ''
      t.integer :owner_id

      t.timestamps
    end
    
    create_table :lists do |t|
      t.string :name, null: false, default: ''
      t.integer :board_id
      t.integer :cardinality, null: false, default: 0

      t.timestamps
    end
    
    create_table :cards do |t|
      t.boolean :is_completed, null: false, default: false
      t.text :body, null: false, default: ''
      t.integer :list_id
      t.integer :cardinality, null: false, default: 0

      t.timestamps
    end
    
    add_index :boards, :owner_id
    add_index :lists, :board_id 
    add_index :cards, :list_id
  end
end
