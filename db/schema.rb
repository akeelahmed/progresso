# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131121222222) do

  create_table "boards", :force => true do |t|
    t.string   "name",       :default => "", :null => false
    t.integer  "owner_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  add_index "boards", ["owner_id"], :name => "index_boards_on_owner_id"

  create_table "cards", :force => true do |t|
    t.boolean  "completed",   :default => false, :null => false
    t.text     "body",        :default => "",    :null => false
    t.integer  "list_id"
    t.integer  "cardinality", :default => 0,     :null => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "cards", ["list_id"], :name => "index_cards_on_list_id"

  create_table "lists", :force => true do |t|
    t.string   "name",        :default => "", :null => false
    t.integer  "board_id"
    t.integer  "cardinality", :default => 0,  :null => false
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  add_index "lists", ["board_id"], :name => "index_lists_on_board_id"

  create_table "users", :force => true do |t|
    t.string   "provider",      :null => false
    t.integer  "uid",           :null => false
    t.string   "name"
    t.string   "email"
    t.string   "username"
    t.string   "gravatar"
    t.string   "session_token", :null => false
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "users", ["provider", "uid"], :name => "index_users_on_provider_and_uid", :unique => true
  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true

end
