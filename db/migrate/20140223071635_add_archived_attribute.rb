class AddArchivedAttribute < ActiveRecord::Migration
  def change
    add_column :boards, :archived, :boolean, default: false
    add_column :lists, :archived, :boolean, default: false
    add_column :cards, :archived, :boolean, default: false
  end
end
