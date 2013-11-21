class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider, null: false
      t.integer :uid, null: false
      t.string :name
      t.string :email
      t.string :username
      t.string :gravatar
      t.string :session_token, null: false

      t.timestamps
    end

    add_index :users, [:provider, :uid], unique: true
    add_index :users, :session_token, unique: true
  end
end
